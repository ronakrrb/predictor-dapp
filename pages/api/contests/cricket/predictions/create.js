const contractArtifact = require("../../../../contracts/Predictor.json"); //produced by Truffle compile
const Contract = require('web3-eth-contract');

export default async function handler(req, res) {
    try {
        Contract.setProvider(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);
        const MyContract = new Contract(contractArtifact.abi, process.env.PREDICTOR_CONTRACT_ADDRESS, {});
        const prediction = await MyContract.methods.bet(req.body.contest_id, req.body.option_id)
            .send({
                from: req.cookies.uunn,
                value: MyContract.extend.utils.toWei(req.body.value),
                gas: 30000000,
                gasPrice: '2000000000'
            });
        res.status(200).json({ prediction: prediction });
    } catch (err) {
        console.log(err);
        res.status(251).json({error: err, message: "Unable to place the prediction" })
    }
}
