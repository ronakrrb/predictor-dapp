const contractArtifact = require("../contracts/Predictor.json"); //produced by Truffle compile
const Contract = require('web3-eth-contract');

export default function handler(req, res) {
    try {
        Contract.setProvider(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);
        const MyContract = new Contract(contractArtifact.abi, process.env.PREDICTOR_CONTRACT_ADDRESS);
        res.status(200).json({ MyContract: MyContract });
    } catch (err) {
        console.log(err);
        res.status(251).json({error: err, message: "Unable to read contract file" })
    }
}
