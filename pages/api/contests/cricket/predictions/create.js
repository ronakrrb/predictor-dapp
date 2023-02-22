const Contract = require('web3-eth-contract');
const Accounts = require('web3-eth-accounts');
const Eth = require('web3-eth');
const contractArtifact = require("../../../../contracts/Predictor.json"); //produced by Remix IDE

export default async function handler(req, res) {
    try {
        Contract.setProvider(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);
        const MyContract = new Contract(contractArtifact.abi, process.env.PREDICTOR_CONTRACT_ADDRESS, { from: req.cookies.uunn });
        // const accounts = new Accounts(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);
        // const eth = new Eth(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);
        const placePredictionABI = await MyContract.methods.bet(req.body.contest_id, req.body.option_id).encodeABI();
        // // const trx = {
        // //     from: req.cookies.uunn,
        // //     value: MyContract.extend.utils.toWei(req.body.value),
        // //     gas: 55000,
        // //     // gasPrice: 2000000000,
        // //     data: placePredictionABI
        // // };
        // // var signedTX = await accounts.signTransaction(trx, process.env.OWNER_WALLET_PRIVATE_KEY)
        // // const prediction = await eth.sendSignedTransaction(signedTX.rawTransaction);
        // console.log(accounts.wallet)
        // const prediction = null;
        // console.log('prediction-----> ', prediction);
        // res.status(200).json({ prediction: prediction });
        res.status(200).json({ placePredictionABI: placePredictionABI, betValue: MyContract.extend.utils.toWei(req.body.value) });
    } catch (err) {
        console.log(err);
        res.status(251).json({ error: err, message: "Unable to place the prediction" })
    }
}
