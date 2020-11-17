const BatteryNFT = artifacts.require("./BatteryNFT.sol");

module.exports = async function(deployer) {
    const _name = "Battery Token";
    const _symbol = "BDC";
    await deployer.deploy(BatteryNFT, _name, _symbol)
    const erc721 = await BatteryNFT.deployed()
};
