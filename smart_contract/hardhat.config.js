require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/frABEsum4ZIVR9cRvjcv8lWyt42NTnOy',
      //Accounts : Private key of metamask wallet ~j
      accounts: ['0d94b9a7480b5be37f69d10e524df074adfd635c7c6954f3b4bae67fb308eceb'],
    },
  },
};