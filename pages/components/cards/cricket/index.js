import React from "react";
import s from './index.module.scss';

export default function CricketCard({data}) {
    React.useEffect(() => {
        console.log(data);
        console.log((parseInt(data[2], 10)/ (parseInt(data[2], 10) + parseInt(data[3], 10)) * 100));
    }, []);
    return (
        <div className={s.card}>
            <div className={s.teams}>
                <div>{data[6]}</div>
                <div>{data[7]}</div>
            </div>
            <div className={s.predictorBar}>
                <div>{Math.round((parseInt(data[2], 10)/ ((parseInt(data[2], 10) + parseInt(data[3], 10)) || 1) * 100), 2)}</div>
                <div>{Math.round((parseInt(data[3], 10)/ ((parseInt(data[2], 10) + parseInt(data[3], 10)) || 1) * 100), 2)}</div>
            </div>
            <div className={s.predictAction}>
                <div><button data-team={data[8]}>BET</button></div>
                <div><button data-team={data[9]}>BET</button></div>
            </div>
        </div>
    );
}
