import React, { useRef } from "react";
import s from './index.module.scss';

export default function Predict({data, callback}) {
    let predicted_option = null;
    const ref1 = useRef();
    const ref2 = useRef();
    const onClick = (option, value) => {
        callback(option, value);
    }
    return (
        <div className={s.predictAction}>
            <div><input type="number" defaultValue={0} ref={ref1} style={{width: '30px'}} /><button data-team={data[8]} onClick={() => { onClick(data[8], ref1.current.value); }}>BET</button></div>
            <div><input type="number" defaultValue={0} ref={ref2} style={{width: '30px'}} /><button data-team={data[9]} onClick={() => { onClick(data[9], ref2.current.value); }}>BET</button></div>
        </div>
    );
}

