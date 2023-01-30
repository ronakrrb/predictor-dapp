import Web3 from 'web3';

export default function Web3Connect() {
    return {
        init: async function() {
            return await this.initWeb3();
        },
        web3Provider: null,
        initWeb3: async function() {
            if (document.cookie.search('uunn') === -1) {
                if (window.ethereum) {
                    this.web3Provider = window.ethereum;
                    try {
                        // Request account access
                        await window.ethereum.enable();
                    } catch (error) {
                        // User denied account access...
                        alert("Please connect wallet to continue. Reload the page.")
                        return;
                    }
                }
                // Legacy dapp browsers...
                else if (window.web3) {
                    this.web3Provider = window.web3.currentProvider;
                }
                // If no injected web3 instance is detected, fall back to Ganache
                else {
                    this.web3Provider = new Web3.providers.HttpProvider(this.web3ProviderURL);
                }
                const web3 = new Web3(Web3.givenProvider || process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);
                web3.eth.getAccounts().then(data => {
                    document.cookie = `uunn=${data[0]}; expires=${new Date(new Date().getTime()+604800000)}; path=/`;
                });
                return data[0];
            } else {

            }
        }
    }
}