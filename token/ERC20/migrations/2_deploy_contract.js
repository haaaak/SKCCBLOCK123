const BPTToken = artifacts.require("BPTToken.sol");

const _name = "BPT Token";
const _symbol = "BPT";
const _decimals = 0;
const _totalSupply = 1000000000;
module.exports = function(deployer) {
  deployer.deploy(BPTToken, _name, _symbol, _decimals, _totalSupply);
};

