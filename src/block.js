const ENCRYPT = require('crypto-js/sha512');
const DATEFORMAT = require("dateformat");

class Block {
  constructor(patientName, doctorName, prescription, previousHash = "") {
    this.index = 1;
    this.timestamp = currentDate();
    this.patientName = patientName;
    this.doctorName = doctorName;
    this.prescription = prescription;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return ENCRYPT(this.index + this.timestamp + JSON.stringify([this.patientName, this.doctorName, this.prescription]) + this.previousHash + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }

}

function currentDate() {
  return DATEFORMAT(new Date(), "isoDateTime");
}


function calculateHash(index, timestamp, patientName, doctorName, prescription, previousHash, nonce) {
  return ENCRYPT(index + timestamp + JSON.stringify([patientName, doctorName, prescription]) +  previousHash + nonce).toString();
}
exports.Block = Block;

exports.productionBlock = new Block();
