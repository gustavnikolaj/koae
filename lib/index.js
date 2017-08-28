const Koae = require("./Koae");

function createKoaeApplication(...args) {
  return new Koae(...args);
}

createKoaeApplication.Koae = Koae;

module.exports = createKoaeApplication;
