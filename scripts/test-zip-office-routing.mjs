import assert from "node:assert/strict";
import { isInServiceArea, officeForZip } from "../data/zip-to-office.ts";

for (const zip of ["35205", "35244", "35173", "35094", "35068", "35071", "35111"]) {
  const office = officeForZip(zip);
  assert.equal(office.id, "birmingham-downtown", `${zip} must route to Birmingham`);
  assert.equal(office.phone, "2059912882", `${zip} must use Birmingham's direct line`);
  assert.match(office.address, /2120 16th Ave S, Ste 302/);
}

for (const zip of ["35007", "35043", "35242", "35124"]) {
  const office = officeForZip(zip);
  assert.equal(office.id, "birmingham", `${zip} must route to Alabaster`);
  assert.equal(office.phone, "2059406360", `${zip} must use the Alabaster/main line`);
  assert.match(office.address, /2025 Butler Rd/);
}

assert.equal(isInServiceArea("35205"), true);
assert.equal(isInServiceArea("99999"), false);
console.log("✓ ZIP routing: Jefferson/St. Clair → Birmingham; Shelby → Alabaster");
