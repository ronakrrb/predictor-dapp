import React from "react";
import Home from "./index";
import Web3Connect from '../public/Web3Connect';

export default function Matches() {
    React.useEffect(() => {
        let wallet = Web3Connect();
        wallet.init();
        console.log(wallet);

        console.log(process.env.WEB3_PROVIDER_URL);
        fetch('/api/initializeContract')
            .then(response => { return response.json(); })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    return (
        <Home>
            <p>Test</p>
        </Home>
    );
}
