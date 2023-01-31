const contractArtifact = require("../../../../contracts/Predictor.json"); //produced by Truffle compile
const Contract = require('web3-eth-contract');

export default async function handler(req, res) {
    try {
        Contract.setProvider(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);
        const MyContract = new Contract(contractArtifact.abi, process.env.PREDICTOR_CONTRACT_ADDRESS, {});
        const { contestId } = req.query;
        const prediction = await MyContract.methods.getBets(contestId)
            .call({
                from: req.cookies.uunn,
                gas: 30000000,
                gasPrice: '2000000000'
            });
        let result = {contest_id: contestId};
        prediction.map(element => {
            if (!result[element[2]]) {
                result[element[2]] = 0;
            }
            result[element[2]] += +element[1];
        });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(251).json({error: err, message: "Unable to place the prediction" })
    }
}
