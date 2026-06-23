'use client';

/**
 * SeasonalPestCalendar — "What's in your yard RIGHT NOW?"
 * Shows current month's active Alabama pests with brief tactical guidance.
 * Major SEO + UX play. Auto-rotates by month.
 */

import { useEffect, useState } from 'react';

interface PestActivity {
  emoji: string;
  name: string;
  intensity: 'low' | 'medium' | 'high' | 'peak';
  note: string;
}

const PEST_CALENDAR: Record<number, PestActivity[]> = {
  // 0 = January
  0: [
    { emoji: '🐭', name: 'Indoor pests', intensity: 'high', note: 'Pests overwinter indoors — kitchens, attics, garages.' },
    { emoji: '🪳', name: 'German roaches', intensity: 'medium', note: 'Active year-round in heated homes.' },
    { emoji: '🕷️', name: 'Brown recluse', intensity: 'medium', note: 'Hidden in closets, attics, undisturbed corners.' },
  ],
  // February
  1: [
    { emoji: '🐜', name: 'Early ants', intensity: 'low', note: 'Argentine ants begin scouting on warm days.' },
    { emoji: '🪵', name: 'Termite pre-swarm', intensity: 'medium', note: 'Inspection season starts — swarm peaks March.' },
    { emoji: '🐭', name: 'Indoor pests', intensity: 'medium', note: 'Still hunkered indoors until temps rise.' },
  ],
  // March
  2: [
    { emoji: '🪵', name: 'Termites SWARMING', intensity: 'peak', note: 'Peak Alabama termite swarm season. Check window sills for wings.' },
    { emoji: '🐜', name: 'Carpenter ants', intensity: 'high', note: 'Active around damp wood, decks, eaves.' },
    { emoji: '🌻', name: 'Fire ant mounds', intensity: 'medium', note: 'New mounds appearing in lawns after warm rains.' },
  ],
  // April
  3: [
    { emoji: '🦟', name: 'Mosquitoes START', intensity: 'high', note: 'Yard barrier season begins. First treatment now.' },
    { emoji: '🪵', name: 'Termite swarms', intensity: 'high', note: 'Still peak swarm season through May.' },
    { emoji: '🐜', name: 'Argentine ants', intensity: 'high', note: 'Trails forming on kitchen counters and around foundations.' },
    { emoji: '🌻', name: 'Fire ants', intensity: 'high', note: 'Mound activity accelerating.' },
  ],
  // May
  4: [
    { emoji: '🦟', name: 'Mosquitoes', intensity: 'peak', note: 'Heavy pressure begins. 30-day yard barrier critical.' },
    { emoji: '🪳', name: 'American roaches', intensity: 'high', note: '"Water bugs" emerging from sewers and crawlspaces.' },
    { emoji: '🪵', name: 'Late termite swarms', intensity: 'medium', note: 'Final swarms of the year.' },
    { emoji: '🐝', name: 'Carpenter bees', intensity: 'high', note: 'Drilling holes in deck rails, eaves.' },
  ],
  // June
  5: [
    { emoji: '🦟', name: 'Mosquitoes', intensity: 'peak', note: 'Peak summer pressure. Standing water = breeding.' },
    { emoji: '🕷️', name: 'Wolf spiders', intensity: 'high', note: 'Active hunters around foundations and garages.' },
    { emoji: '🌻', name: 'Fire ants', intensity: 'peak', note: 'Heavy mound formation after summer rains.' },
    { emoji: '🐜', name: 'Crazy ants', intensity: 'high', note: 'Large foraging trails near foundations.' },
  ],
  // July
  6: [
    { emoji: '🦟', name: 'Mosquitoes', intensity: 'peak', note: 'Aedes (day-biters) active. Tropical depression risk.' },
    { emoji: '🪲', name: 'Beetles', intensity: 'high', note: 'June bugs, kudzu bugs, ladybugs entering homes.' },
    { emoji: '🕷️', name: 'Black widow', intensity: 'medium', note: 'Garages, sheds, woodpiles. Check before reaching in.' },
    { emoji: '🐾', name: 'Ticks', intensity: 'high', note: 'Lone Star and Dog ticks active in wooded yards.' },
  ],
  // August
  7: [
    { emoji: '🦟', name: 'Mosquitoes', intensity: 'peak', note: 'Peak West Nile/EEE risk season.' },
    { emoji: '🐝', name: 'Wasps & hornets', intensity: 'peak', note: 'Aggressive nest defense — peak danger month.' },
    { emoji: '🐜', name: 'Fire ants', intensity: 'peak', note: 'Mounds reach maximum size.' },
    { emoji: '🪳', name: 'Roaches', intensity: 'high', note: 'Heat-driven indoor migration starts.' },
  ],
  // September
  8: [
    { emoji: '🦟', name: 'Mosquitoes', intensity: 'high', note: 'Still active through October. Don\'t stop treating yet.' },
    { emoji: '🐭', name: 'Mice scouting', intensity: 'medium', note: 'Pre-winter entry begins — seal cracks now.' },
    { emoji: '🦗', name: 'Crickets', intensity: 'high', note: 'Field and camel crickets entering garages.' },
    { emoji: '🐝', name: 'Yellow jackets', intensity: 'high', note: 'Ground nests at peak aggression.' },
  ],
  // October
  9: [
    { emoji: '🐭', name: 'Mice entering homes', intensity: 'high', note: 'Pre-winter migration peaks. Seal entry points.' },
    { emoji: '🪲', name: 'Stink bugs', intensity: 'peak', note: 'Mass invasion as temps drop. Window sills, attics.' },
    { emoji: '🕷️', name: 'House spiders', intensity: 'high', note: 'Indoor populations grow as outdoor prey dies off.' },
    { emoji: '🦟', name: 'Late mosquitoes', intensity: 'medium', note: 'Final treatments of the season.' },
  ],
  // November
  10: [
    { emoji: '🐭', name: 'Rodent activity', intensity: 'peak', note: 'Peak indoor rodent season. Set traps, seal cracks.' },
    { emoji: '🪲', name: 'Overwintering beetles', intensity: 'high', note: 'Kudzu bugs, lady beetles clustering on sunny walls.' },
    { emoji: '🪳', name: 'Roaches indoors', intensity: 'high', note: 'Population shifts indoor as outdoor temps drop.' },
  ],
  // December
  11: [
    { emoji: '🐭', name: 'Indoor rodents', intensity: 'peak', note: 'Attic and crawlspace activity. Listen for night noises.' },
    { emoji: '🕷️', name: 'Brown recluse', intensity: 'medium', note: 'Hidden in undisturbed boxes, holiday decorations.' },
    { emoji: '🪳', name: 'German roaches', intensity: 'high', note: 'Warm appliances and kitchens harbor populations.' },
  ],
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function SeasonalPestCalendar() {
  const [month, setMonth] = useState<number>(new Date().getMonth());

  const activePests = PEST_CALENDAR[month] || [];

  return (
    <section className="spc-section">
      <style dangerouslySetInnerHTML={{ __html: PEST_CAL_CSS }} />
      <div className="spc-inner">
        <div className="spc-eyebrow">🌻 Alabama Pest Calendar</div>
        <h2 className="spc-title">
          What&apos;s in Your Yard <em>Right Now</em>?
        </h2>
        <p className="spc-sub">
          Alabama&apos;s pest pressure shifts month by month. Here&apos;s what our technicians are treating across Birmingham, Lake Martin and Huntsville this {MONTH_NAMES[month]}.
        </p>

        {/* Month picker */}
        <div className="spc-months">
          {MONTH_NAMES.map((m, i) => (
            <button
              key={m}
              className={`spc-month-btn ${i === month ? 'active' : ''}`}
              onClick={() => setMonth(i)}
              aria-pressed={i === month}
            >
              <span className="spc-month-short">{m.slice(0, 3)}</span>
              <span className="spc-month-full">{m}</span>
            </button>
          ))}
        </div>

        {/* Active pests grid */}
        <div className="spc-grid">
          {activePests.map((pest) => (
            <div key={pest.name} className={`spc-card spc-${pest.intensity}`}>
              <div className="spc-card-head">
                <span className="spc-emoji">{pest.emoji}</span>
                <span className={`spc-pill spc-pill-${pest.intensity}`}>
                  {pest.intensity === 'peak' ? 'PEAK' : pest.intensity.toUpperCase()}
                </span>
              </div>
              <div className="spc-name">{pest.name}</div>
              <div className="spc-note">{pest.note}</div>
            </div>
          ))}
        </div>

        <div className="spc-cta">
          <a href="tel:2059406360" className="spc-cta-btn">
            📞 Schedule Service · (205) 940-6360
          </a>
          <p className="spc-cta-note">
            Fast appointments available · Free inspection · Family-owned since 1958
          </p>
        </div>
      </div>
    </section>
  );
}

const PEST_CAL_CSS = `
.spc-section {
  padding: 80px 24px;
  background: linear-gradient(180deg, #FEFDF8 0%, #F5F1E8 100%);
  font-family: var(--font-sans);
}
.spc-inner {
  max-width: 1100px;
  margin: 0 auto;
}
.spc-eyebrow {
  font-size: 13px;
  font-weight: 600;
  color: #0E8E40;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-align: center;
  margin-bottom: 12px;
}
.spc-title {
  font-family: var(--font-serif);
  font-size: clamp(32px, 4.5vw, 48px);
  font-weight: 700;
  color: #0E1A0F;
  text-align: center;
  margin: 0 0 12px;
  line-height: 1.15;
}
.spc-title em {
  font-style: italic;
  color: #0E8E40;
}
.spc-sub {
  text-align: center;
  font-size: 17px;
  color: #5A6660;
  max-width: 720px;
  margin: 0 auto 40px;
  line-height: 1.55;
}
.spc-months {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 4px;
  background: #fff;
  padding: 6px;
  border-radius: 14px;
  border: 1px solid #E8E2D8;
  margin-bottom: 32px;
  overflow-x: auto;
}
.spc-month-btn {
  padding: 10px 6px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  color: #5A6660;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.spc-month-btn:hover {
  background: #F5F1E8;
  color: #0E1A0F;
}
.spc-month-btn.active {
  background: #0E8E40;
  color: #fff;
}
.spc-month-full { display: none; }
.spc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
}
.spc-card {
  background: #fff;
  border: 1px solid #E8E2D8;
  border-radius: 14px;
  padding: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.spc-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(14, 26, 15, 0.08);
}
.spc-peak { border-color: #DC2626; }
.spc-high { border-color: #F5A800; }
.spc-medium { border-color: #0E8E40; }
.spc-low { border-color: #94A89A; }
.spc-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.spc-emoji {
  font-size: 32px;
}
.spc-pill {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 999px;
  letter-spacing: 0.05em;
}
.spc-pill-peak { background: #FEE2E2; color: #DC2626; }
.spc-pill-high { background: #FEF3C7; color: #B07A00; }
.spc-pill-medium { background: #DCFCE7; color: #0A7935; }
.spc-pill-low { background: #F1F5F2; color: #5A6660; }
.spc-name {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 700;
  color: #0E1A0F;
  margin-bottom: 6px;
}
.spc-note {
  font-size: 14px;
  color: #5A6660;
  line-height: 1.5;
}
.spc-cta {
  text-align: center;
}
.spc-cta-btn {
  display: inline-block;
  padding: 16px 32px;
  font-size: 17px;
  font-weight: 700;
  background: #F5A800;
  color: #0E1A0F;
  text-decoration: none;
  border-radius: 999px;
  transition: transform 0.15s, box-shadow 0.15s;
}
.spc-cta-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(245, 168, 0, 0.35);
}
.spc-cta-note {
  margin-top: 12px;
  font-size: 14px;
  color: #5A6660;
}
@media (min-width: 900px) {
  .spc-month-full { display: inline; }
  .spc-month-short { display: none; }
}
@media (max-width: 640px) {
  .spc-months {
    grid-template-columns: repeat(6, 1fr);
  }
}
`;

