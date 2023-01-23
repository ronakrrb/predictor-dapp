const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);
const web3Provider = new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);

export { Web3, web3, web3Provider };