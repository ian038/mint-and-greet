require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/H9AsUjxc-DPjynzVttnPJAWrp08CGiG3',
      accounts: [process.env.PRIAVTE_KEY]
    }
  }
};
