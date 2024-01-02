const Contracts = artifacts.require('ChrisToken.sol');

module.exports = function (deployer) { 
  deployer.deploy(Contracts)
}