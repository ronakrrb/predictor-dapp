const Contract = require('web3-eth-contract');
const Accounts = require('web3-eth-accounts');
const Eth = require('web3-eth');
const contractArtifact = require("../../../contracts/Predictor.json"); //produced by Truffle compile

export default async function handler(req, res) {
    try {
        Contract.setProvider(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);
        const MyContract = new Contract(contractArtifact.abi, process.env.PREDICTOR_CONTRACT_ADDRESS, {});
        const accounts = new Accounts(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);
        const eth = new Eth(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);
        const match_id = req.body.match_id,
            sport_id = req.body.sport_id,
            teamA_name = req.body.teamA_name,
            teamA_id = req.body.teamA_id,
            teamB_name = req.body.teamB_name,
            teamB_id = req.body.teamB_id;
        const createMatchABI = await MyContract.methods.createMatch(match_id, sport_id, teamA_name, teamA_id, teamB_name, teamB_id).encodeABI();
        const trx = {
            from: req.cookies.uunn,
            gasLimit: 55000,
            // gasPrice: 2000000000,
            // chainId: 202212,
            data: createMatchABI
        };
        var signedTX = await accounts.signTransaction(trx, process.env.OWNER_WALLET_PRIVATE_KEY)
        const cm = await eth.sendSignedTransaction(signedTX.rawTransaction);
        res.status(200).json({ cm: cm });
    } catch (err) {
        console.log(err);
        res.status(251).json({ error: err, message: "Unable to create match" })
    }
}
