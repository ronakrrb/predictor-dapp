import React, {useEffect, useState} from "react";
import Home from "../index";
import Web3Connect from '../../public/Web3Connect';
import CricketCard from '../components/cards/cricket';

export default function Matches() {
    const [matches, setMatches] = useState(new Array(0));

    useEffect(() => {
        let wallet = Web3Connect();
        wallet.init();
        console.log(wallet);

        fetch('/api/getAllMatches')
            .then(response => response.json())
            .then(data => {
                setMatches(data.matches);
                console.log(data.matches);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <Home>
            {matches.map((d, i) => (
                <CricketCard data={d} key={`cricket-card${i}`} />
            ))}
        </Home>
    );
}
