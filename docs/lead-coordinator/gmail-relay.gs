/**
 * EnviroCare Lead Coordinator — Gmail relay (Google Apps Script)
 *
 * Sends each new Sameday notification email to the website's lead queue, within
 * about a minute of arrival. Runs inside YOUR Gmail account; no new vendor, no
 * password shared with anyone.
 *
 * ONE-TIME SETUP (about 5 minutes, in the Gmail account that receives Sameday
 * emails — phillipwedgworth@gmail.com):
 *   1. Go to https://script.google.com → New project. Name it "EnviroCare lead relay".
 *   2. Delete the sample code, paste this whole file, Save.
 *   3. Project Settings (gear) → Script Properties → Add property:
 *        LEADS_INGEST_KEY = <the same value set in Vercel as LEADS_INGEST_KEY>
 *   4. Back in the editor, choose the function `setup` and click Run. Approve the
 *      Gmail + external-request permissions Google asks for.
 *   That creates a trigger that runs `relay` every minute. To stop it: run `teardown`.
 *
 * What it does each minute: finds Sameday emails from the last 2 days that do not
 * yet carry the label "ec-lead-relayed", POSTs each one, and adds the label only
 * when the website confirms it stored (or deliberately ignored) it. A failure is
 * retried on the next run. The website de-duplicates, so a retry never doubles a lead.
 */
const ENDPOINT = 'https://www.envirocarellc.com/api/leads/ingest';
const LABEL = 'ec-lead-relayed';
const QUERY = 'from:notifications@gosameday.com newer_than:2d -label:' + LABEL;

function relay() {
  const key = PropertiesService.getScriptProperties().getProperty('LEADS_INGEST_KEY');
  if (!key) throw new Error('Set the LEADS_INGEST_KEY script property first.');
  const label = GmailApp.getUserLabelByName(LABEL) || GmailApp.createLabel(LABEL);
  const threads = GmailApp.search(QUERY, 0, 50);
  threads.forEach(function (thread) {
    let allOk = true;
    thread.getMessages().forEach(function (msg) {
      if (msg.getFrom().indexOf('notifications@gosameday.com') === -1) return;
      const res = UrlFetchApp.fetch(ENDPOINT, {
        method: 'post',
        contentType: 'application/json',
        headers: { 'x-leads-key': key },
        muteHttpExceptions: true,
        payload: JSON.stringify({
          subject: msg.getSubject(),
          body: msg.getPlainBody(),
          receivedAt: msg.getDate().toISOString(),
          messageId: msg.getId(),
        }),
      });
      if (res.getResponseCode() !== 200) {
        allOk = false;
        console.warn('Lead relay failed ' + res.getResponseCode() + ': ' + res.getContentText().slice(0, 300));
      }
    });
    if (allOk) thread.addLabel(label);
  });
}

function setup() {
  teardown();
  ScriptApp.newTrigger('relay').timeBased().everyMinutes(1).create();
  relay();
}

function teardown() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'relay') ScriptApp.deleteTrigger(t);
  });
}
