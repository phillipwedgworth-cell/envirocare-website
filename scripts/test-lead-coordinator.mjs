// scripts/test-lead-coordinator.mjs — `npm run test:leads`
// Locks the Lead Coordinator's fixed rules: Sameday parsing, inquiry kind,
// callback deadlines (incl. DST and weekends), status requirements and flags.
// Fixtures are synthetic (555 numbers) but copy the exact layout of a live
// Sameday notification as read from Gmail on 2026-10-05.
import assert from 'node:assert/strict';
import {
  parseSamedayEmail, isSamedayCallEmail, classifyInquiry, callbackDue, isStaffed,
  validateStatusChange, flagsFor, responseMinutes, digitsOnly, alertsFor, autoOutcome,
} from '../lib/leads/core.ts';
import { ownerFor } from '../data/lead-owners.ts';

let n = 0;
const ok = (cond, msg) => { assert.ok(cond, msg); n++; };
const eq = (a, b, msg) => { assert.equal(a, b, msg); n++; };

// ── parsing ───────────────────────────────────────────────────────────────
const CALLBACK = `Sameday update\n\nYour Sameday agent took a message for you.\n\nCALLER Jane Testcase CALLER ID (205) 555-0101 CONTACT PHONE NUMBER (205) 555-0102 CALL TIME Oct 3, 11:33 AM REQUESTED CALLBACK TIME during business hours CALLBACK REASON Needs help making a payment on their EnviroCare account NEW OR EXISTING CUSTOMER Existing Customer STATUS callBack SUMMARY Jane called after hours. - She wants to pay her bill - The office team will call back. ADDRESS should not be read as a field here.\n\nView Message in Sameday https://app.sameday.ai/envirocare/conversations?id=abc123DEF456\n\nNever Miss a New Customer.`;
const c = parseSamedayEmail(CALLBACK);
eq(c.callerName, 'Jane Testcase', 'CALLER must not swallow CALLER ID');
eq(c.phone, '2055550102', 'contact number wins over caller id, digits only');
eq(c.callTimeText, 'Oct 3, 11:33 AM');
eq(c.customerType, 'existing');
eq(c.samedayStatus, 'callBack');
eq(c.conversationId, 'abc123DEF456');
ok(c.summary.includes('ADDRESS should not be read'), 'uppercase words inside SUMMARY stay in the summary');
eq(c.address, '', 'no ADDRESS field before SUMMARY');

const LEAD = `Your Sameday agent took a message for you. CALLER Sam Example CUSTOMER NAME Sam Example CALLER ID (256) 555-0199 CONTACT PHONE NUMBER (256) 555-0199 EMAIL sam@example.com ADDRESS 100 Test St, Madison, AL 35758 CALL TIME Oct 4, 6:36 AM NEW OR EXISTING CUSTOMER New Customer STATUS lead SUMMARY Sam has termite swarmers near a window and wants an inspection. View Message in Sameday https://app.sameday.ai/envirocare/conversations?id=zzz999`;
const d = parseSamedayEmail(LEAD);
eq(d.zip, '35758');
eq(d.email, 'sam@example.com');
eq(d.address, '100 Test St, Madison, AL 35758');
eq(d.customerType, 'new');
// Caller-ID-only call (layout of the live Oct 1 "LEAD - (205) …" email): the
// phone must come from CALLER ID, and nothing may land in callerName.
const BRIEF = `Your Sameday agent took a message for you. CALLER ID (205) 555-0177 CALL TIME Oct 1, 6:36 AM NEW OR EXISTING CUSTOMER New Customer STATUS lead SUMMARY The call was too brief to determine the purpose. View Message in Sameday https://app.sameday.ai/envirocare/conversations?id=brief01`;
const b = parseSamedayEmail(BRIEF);
eq(b.phone, '2055550177', 'phone from CALLER ID when no contact number');
eq(b.callerName, '', 'CALLER ID must not be read as CALLER');
eq(classifyInquiry({ customerType: b.customerType, reason: '', summary: b.summary }), 'other');
ok(isSamedayCallEmail('EnviroCare  LEAD - Sam', LEAD));
ok(!isSamedayCallEmail('Report Notifications', 'Report for October 04, 2026 Inbound Calls 4'), 'daily report is not a call');
eq(digitsOnly('+1 (205) 555-0100'), '2055550100');

// Outbound campaign layout (Sep 21 2026 cross-sell run): different opener,
// COMPANY NAME and CAMPAIGN labels, a QUOTE field.
const OUT = `Your Sameday agent reached out to a customer for you. COMPANY NAME EnviroCare CUSTOMER NAME Pat Sample CALLER ID (205) 555-0133 CALL TIME Sep 21, 10:50 AM CAMPAIGN New Termite Customer Cross-Sell Program (Other 246 Contacts) QUOTE $75 to start, then $35 a month NEW OR EXISTING CUSTOMER Existing Customer STATUS callBack SUMMARY Emily from EnviroCare called Pat to offer pest control. - Pat declined the offer - No further action was taken View Message in Sameday https://app.sameday.ai/envirocare/conversations?id=out777`;
const o = parseSamedayEmail(OUT);
ok(isSamedayCallEmail('EnviroCare  CALLBACK - Pat', OUT), 'outbound campaign result is a call');
eq(o.direction, 'outbound');
eq(o.customerName, 'Pat Sample', 'CUSTOMER NAME must not absorb CALLER ID or COMPANY NAME');
eq(o.campaign, 'New Termite Customer Cross-Sell Program (Other 246 Contacts)', 'CAMPAIGN is its own field');
eq(o.quote, '$75 to start, then $35 a month');
eq(o.phone, '2055550133');
eq(autoOutcome(o)?.status, 'lost', 'declined + no further action on a campaign call closes as lost');
eq(autoOutcome({ direction: 'inbound', summary: o.summary }), null, 'inbound calls are never auto-closed');
eq(autoOutcome({ direction: 'outbound', summary: 'The call was too brief to determine the purpose or next steps.' })?.status, 'lost', 'hang-up on a campaign call closes');
eq(autoOutcome({ direction: 'inbound', summary: 'The call was too brief to determine the purpose or next steps.' }), null, 'a hang-up on an INBOUND call stays open — they called us');
eq(autoOutcome({ direction: 'outbound', summary: 'Pat wants to go over the bimonthly program and get scheduled' }), null, 'interested campaign contact stays open');
ok(alertsFor(o).some((a) => a.startsWith('price stated')), 'a stated price is surfaced for checking');
ok(alertsFor({ summary: 'The customer asked to be taken off the calling list', callbackReason: '', samedayStatus: 'callBack', quote: '' }).some((a) => a.startsWith('do-not-contact')));
ok(alertsFor({ summary: 'requested that EnviroCare stop sending him marketing calls', callbackReason: '', samedayStatus: 'support', quote: '' }).some((a) => a.startsWith('do-not-contact')));
ok(!alertsFor({ summary: 'Pat declined the offer - No further action was taken', callbackReason: '', samedayStatus: 'callBack', quote: '' }).length, 'a plain decline is not a do-not-contact request');
ok(alertsFor({ summary: 'called to cancel their service', callbackReason: '', samedayStatus: 'callBack', quote: '' }).some((a) => a.startsWith('cancellation')));
ok(!alertsFor({ summary: 'called to cancel his 9 AM termite inspection appointment', callbackReason: '', samedayStatus: 'callBack', quote: '' }).length, 'cancelling one appointment is not cancelling service');

// ── kind ──────────────────────────────────────────────────────────────────
eq(classifyInquiry({ customerType: c.customerType, reason: c.callbackReason, summary: c.summary }), 'billing');
eq(classifyInquiry({ customerType: 'new', reason: '', summary: d.summary }), 'sales');
eq(classifyInquiry({ customerType: 'existing', reason: 'still seeing ants after the technician came', summary: '' }), 'service');
eq(classifyInquiry({ customerType: 'unknown', reason: '', summary: 'The call was too brief to determine the purpose.' }), 'other');
eq(classifyInquiry({ customerType: 'new', reason: 'hiring process', summary: 'called to follow up on a job application' }), 'other', 'job applicants are not sales');
eq(ownerFor('huntsville', 'billing').owner, 'Billing queue', 'billing goes to billing whatever the office');
ok(ownerFor(undefined, 'sales').owner.includes('unrouted'), 'no office → main office triage, never unowned');

// ── deadlines (America/Chicago, M–F 8–5) ─────────────────────────────────
const at = (iso) => new Date(iso);
// Tue Oct 6 2026 10:00 CDT = 15:00Z → staffed → +5 min
ok(isStaffed(at('2026-10-06T15:00:00Z')));
eq(callbackDue(at('2026-10-06T15:00:00Z')).toISOString(), '2026-10-06T15:05:00.000Z');
// Fri Oct 9 18:00 CDT (23:00Z) → Mon Oct 12 8:00 CDT + 60 = 9:00 CDT = 14:00Z
eq(callbackDue(at('2026-10-09T23:00:00Z')).toISOString(), '2026-10-12T14:00:00.000Z');
// Sat Oct 10 noon → same Monday 9:00 CDT
eq(callbackDue(at('2026-10-10T17:00:00Z')).toISOString(), '2026-10-12T14:00:00.000Z');
// Tue 6:30 AM CDT (11:30Z) → same day 9:00 CDT
eq(callbackDue(at('2026-10-06T11:30:00Z')).toISOString(), '2026-10-06T14:00:00.000Z');
// DST ends Sun Nov 1 2026. Sat Oct 31 → Mon Nov 2 9:00 CST = 15:00Z
eq(callbackDue(at('2026-10-31T15:00:00Z')).toISOString(), '2026-11-02T15:00:00.000Z');
// 4:58 PM CDT is still staffed; 5:00 PM is not
ok(isStaffed(at('2026-10-06T21:58:00Z')));
ok(!isStaffed(at('2026-10-06T22:00:00Z')));

// ── status rules ─────────────────────────────────────────────────────────
ok(validateStatusChange('sales', 'new', { status: 'booked', actor: 'Rachel' })?.includes('Fieldster'), 'booked needs a Fieldster number');
eq(validateStatusChange('sales', 'contacted', { status: 'booked', actor: 'Rachel', fieldsterRef: '48211' }), null);
ok(validateStatusChange('sales', 'new', { status: 'lost', actor: 'Rachel' }), 'lost needs a reason');
ok(validateStatusChange('sales', 'new', { status: 'resolved', actor: 'Rachel' }), 'sales cannot end resolved');
eq(validateStatusChange('billing', 'new', { status: 'resolved', actor: 'Rachel' }), null);
ok(validateStatusChange('sales', 'new', { status: 'contacted', actor: '' }), 'who made the change is required');
ok(validateStatusChange('sales', 'booked', { status: 'contacted', actor: 'Rachel' }), 'booked cannot be reopened');
eq(validateStatusChange('sales', 'booked', { status: 'lost', actor: 'Rachel', reason: 'other' }), null, 'cancelled booking → lost is allowed');

// ── flags ────────────────────────────────────────────────────────────────
const now = at('2026-10-07T15:00:00Z');
const base = { id: 'x', created_at: '2026-10-06T15:00:00Z', owner: 'Huntsville office queue' };
ok(flagsFor({ ...base, status: 'new', callback_due: '2026-10-06T15:05:00Z' }, now).includes('callback overdue'));
ok(!flagsFor({ ...base, status: 'contacted', callback_due: '2026-10-06T15:05:00Z', status_updated_at: '2026-10-07T14:00:00Z' }, now).length);
ok(flagsFor({ ...base, status: 'contacted', status_updated_at: '2026-10-04T14:00:00Z' }, now).includes('no outcome 48h after contact'));
ok(flagsFor({ ...base, status: 'booked', fieldster_ref: '1', status_updated_at: '2026-10-05T14:00:00Z' }, now).includes('booking not verified in Fieldster'));
ok(flagsFor({ ...base, owner: null, status: 'new' }, now).includes('no owner'));
eq(responseMinutes({ ...base, first_contact_at: '2026-10-06T15:04:00Z' }), 4);
eq(responseMinutes({ ...base }), null, 'no recorded contact is not a fast response');

console.log(`✓ lead coordinator: ${n} checks — Sameday parse (inbound + outbound), alerts, kind, deadlines (DST/weekend), status rules, flags`);
