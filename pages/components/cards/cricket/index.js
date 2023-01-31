import React, { useState } from "react";
import s from './index.module.scss';
import Predict from '../../actions/predict';

export default function CricketCard({data}) {
    const denominator = (parseInt(data[2], 10) + parseInt(data[3], 10)) || 1;
    const [option1, setOption1] = useState(parseFloat(parseInt(data[2], 10)/ denominator * 100).toFixed(2));
    const [option2, setOption2] = useState(parseFloat(parseInt(data[3], 10)/ denominator * 100).toFixed(2));
    const onPredict = (option, value) => {
        fetch('/api/contests/cricket/predictions/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contest_id: data[0],
                option_id: option,
                value: value
            })
        })
            .then(response => { return response.json(); })
            .then(data => {
                console.log(data);
                if (data) {
                    getPredictions();
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    const getPredictions = () => {
        fetch(`/api/contests/cricket/predictions/${data[0]}`)
            .then(response => response.json())
            .then(_data => {
                const _denominator = ((_data[data[8]] || 0) + (_data[data[9]] || 0)) || 1;
                setOption1(parseFloat(_data[data[8]]/ _denominator * 100).toFixed(2));
                setOption2(parseFloat(_data[data[9]]/ _denominator * 100).toFixed(2));
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
