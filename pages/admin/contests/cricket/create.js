import React from "react";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import Home from "../../../index";
const matchSchema = require("../../assets/forms/createMatch.json"); //produced by Truffle compile


export default function CreateMatch() {
    const createMatch = (form = {}) => {
        fetch('/api/contests/cricket/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
            .then(response => { return response.json(); })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <Home>
            <div className="form">
                <Form schema={matchSchema}
                    validator={validator}
                    onChange={console.log("changed")}
                    onSubmit={(form) => {createMatch(form.formData)}}
                    onError={console.log("errors")}
                />
            </div>
        </Home>
    );
}
