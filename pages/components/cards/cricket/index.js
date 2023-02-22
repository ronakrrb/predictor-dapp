import React, { useState } from "react";
import s from './index.module.scss';
import Predict from '../../actions/predict';
import contractArtifact from "../../../contracts/Predictor.json"; //produced by Remix IDE

export default function CricketCard({ data }) {
    const web3 = window.PWEB3;
    const denominator = (parseInt(data[2], 10) + parseInt(data[3], 10)) || 1;
    const [option1, setOption1] = useState(parseFloat(parseInt(data[2], 10) / denominator * 100).toFixed(2));
    const [option2, setOption2] = useState(parseFloat(parseInt(data[3], 10) / denominator * 100).toFixed(2));
    const onPredict = async (option, value) => {
        const acc = await web3.eth.getAccounts();
        web3.setProvider(process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL);
        const MyContract = new web3.eth.Contract(contractArtifact.abi, process.env.NEXT_PUBLIC_PREDICTOR_CONTRACT_ADDRESS, { from: acc[0] });
        const placePredictionABI = await MyContract.methods.bet(data[0], option).encodeABI();
        const trx = {
            from: acc[0],
            to: process.env.NEXT_PUBLIC_PREDICTOR_CONTRACT_ADDRESS,
            value: MyContract.extend.utils.toWei(value),
            gas: '55000',
            data: placePredictionABI,
            chainId: '0x539'
        };
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [trx],
        });
        getPredictions();

    }
    const getPredictions = () => {
        fetch(`/api/contests/cricket/predictions/${data[0]}`)
            .then(response => response.json())
            .then(_data => {
                const _denominator = ((_data[data[8]] || 0) + (_data[data[9]] || 0)) || 1;
                setOption1(parseFloat(_data[data[8]] / _denominator * 100).toFixed(2));
                setOption2(parseFloat(_data[data[9]] / _denominator * 100).toFixed(2));
            });
    }
    return (
        <div className={s.card}>
            <div className={s.teams}>
                <div>{data[6]}</div>
                <div>{data[7]}</div>
            </div>
            <div className={s.predictorBar}>
                <div>{option1}%</div>
                <div>{option2}%</div>
            </div>
            <div className={s.predictAction}>
                <Predict data={data} callback={onPredict} />
            </div>
        </div>
    );
}
