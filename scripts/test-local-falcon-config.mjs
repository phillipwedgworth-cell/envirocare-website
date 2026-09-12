import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  LOCAL_FALCON_CAMPAIGNS,
  localFalconBaseline,
  localFalconGridLabel,
} from "../agents/lib/local-falcon-campaigns.mjs";

assert.equal(LOCAL_FALCON_CAMPAIGNS.length, 4, "all four verified offices must be monitored");
assert.equal(new Set(LOCAL_FALCON_CAMPAIGNS.map((c) => c.key)).size, 4, "campaign keys must be unique");
assert.equal(new Set(LOCAL_FALCON_CAMPAIGNS.map((c) => c.placeId)).size, 4, "place IDs must be unique");
assert.ok(LOCAL_FALCON_CAMPAIGNS.some((c) => c.location === "Birmingham"), "new Birmingham office campaign is required");

const expectedBaselines = new Map([
  ["e9348fff16b95fa", "9x9-20mi"],
  ["4ee47a23fc4793e", "9x9-20mi"],
  ["a99dae3fd51a462", "7x7-10mi"],
  ["a58db3090ac9ab0", "7x7-7mi"],
]);

for (const campaign of LOCAL_FALCON_CAMPAIGNS) {
  assert.equal(localFalconBaseline(null, campaign.key), expectedBaselines.get(campaign.key));
}

assert.equal(localFalconGridLabel("7x7"), "7x7", "formatted grids must not become 7x7x7x7");
assert.equal(localFalconBaseline({ grid_size: "7x7", radius: 10 }, "a99dae3fd51a462"), "7x7-10mi");
assert.equal(localFalconBaseline({ grid_size: 5, radius_miles: 15 }, "a99dae3fd51a462"), "5x5-15mi");

for (const path of ["agents/seo-snapshot.mjs", "agents/seo-monitor.mjs", "agents/local-falcon-ingest.mjs"]) {
  const source = await readFile(path, "utf8");
  assert.match(source, /\.\/lib\/local-falcon-campaigns\.mjs/, `${path} must use the canonical campaign config`);
}

console.log("✓ Local Falcon config: 4 campaigns, unique place IDs, correct per-market baselines");
