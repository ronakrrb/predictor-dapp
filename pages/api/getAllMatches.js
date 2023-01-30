const contractArtifact = require("../contracts/Predictor.json"); //produced by Truffle compile
const Contract = require('web3-eth-contract');

export default async function handler(req, res) {
    try {
        Contract.setProvider(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);
        const MyContract = new Contract(contractArtifact.abi, process.env.PREDICTOR_CONTRACT_ADDRESS, {});
        const matches = await MyContract.methods.getAllMatches().call();
        res.status(200).json({ matches: matches});
    } catch (err) {
        console.log(err);
        res.status(251).json({error: err, message: "Unable to fetch matches" })
    }
}
