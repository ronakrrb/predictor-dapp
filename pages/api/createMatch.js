const contractArtifact = require("../contracts/Predictor.json"); //produced by Truffle compile
const Contract = require('web3-eth-contract');

export default async function handler(req, res) {
    try {
        Contract.setProvider(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);
        const MyContract = new Contract(contractArtifact.abi, process.env.PREDICTOR_CONTRACT_ADDRESS, {});
        const match_id = req.body.match_id,
            sport_id = req.body.sport_id,
            teamA_name = req.body.teamA_name,
            teamA_id = req.body.teamA_id,
            teamB_name = req.body.teamB_name,
            teamB_id = req.body.teamB_id;
        const cm = await MyContract.methods.createMatch(match_id, sport_id, teamA_name, teamA_id, teamB_name, teamB_id)
            .send({
                from: process.env.ADMIN_WALLET_ADDRESS,
                gas: 30000000,
                gasPrice: '2000000000'
            });

        res.status(200).json({ cm: cm});
    } catch (err) {
        console.log(err);
        res.status(251).json({error: err, message: "Unable to create match" })
    }
}
