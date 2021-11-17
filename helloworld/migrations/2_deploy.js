const example = artifacts.require("Storage");

module.exports = function(deployer) {
  deployer.deploy(example);
};