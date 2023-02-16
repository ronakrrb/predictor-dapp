const Contract = require('web3-eth-contract');
const Accounts = require('web3-eth-accounts');
const Eth = require('web3-eth');
const Tx = require('@ethereumjs/tx').Transaction;
const contractArtifact = require("../../../contracts/Predictor.json"); //produced by Truffle compile

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
        const accounts = new Accounts(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);
        const pk = Buffer.from(process.env.ADMIN_WALLET_PRIVATE_KEY, 'hex');
        console.log("PK-->  ", pk);

        // const trx = await accounts.signTransaction({
        //     from: req.cookies.uunn,
        //     gas: 30000000,
        //     gasPrice: '2000000000',
        //     // chainId: 202212,
        // }, 'b9680578e8c8a0939ab194f6176fa4ba10e67bcbc1813567dcebecdbea7c921d');
        // console.log("TRX--->  ",req.cookies.uunn, trx);

        const eth = new Eth(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);
        const createMatchABI = await MyContract.methods.createMatch(match_id, sport_id, teamA_name, teamA_id, teamB_name, teamB_id).encodeABI();
        // const accounts1 = await eth.requestAccounts();
        const trx = {
            from: req.cookies.uunn,
            gas: 30000000,
            gasPrice: 2000000000,
            // chainId: 202212,
            data: createMatchABI
        };
        var signedTX = await accounts.signTransaction(trx, process.env.ADMIN_WALLET_PRIVATE_KEY)
        // var tx = new Tx(trx, {'chainId': 202212, 'chain': 'https://x1-devnet.xen.network'});
        // var signedTx = tx.sign(pk);
        // var serializedTx = signedTx.serialize();
        // console.log("TRX--->  ",req.cookies.uunn, trx);
        // console.log(signedTx.isSigned())
        // console.log(signedTx.validate())
        // console.log(signedTx.verifySignature())
        // console.log(signedTx.errorStr())
        // console.log(signedTx);
        // const method = eth.sendSignedTransaction.method;
        // let payload = method.toPayload([signedTX.rawTransaction])

        // method.requestManager.send(payload, (result) => {
        //   console.log(payload, result)
        // })

        const cm = await eth.sendSignedTransaction(signedTX.rawTransaction);


        // const cm = await MyContract.methods.createMatch(match_id, sport_id, teamA_name, teamA_id, teamB_name, teamB_id).send(trx);
        // const cm = null;

        res.status(200).json({ cm: cm});
    } catch (err) {
        console.log(err);
        res.status(251).json({error: err, message: "Unable to create match" })
    }
}
