import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

const MetaMask = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);

    const connectWallet = () => {
        if (window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChanged([result[0]]);
            }) 
        } else {
            setErrorMessage('Install MetaMask!')
        }
    }

    const accountChanged = (accountName) => {
        setDefaultAccount(accountName);
    }

    return(
        <div className="item">
            {!defaultAccount ? (
                errorMessage ? (
                    // TODO: Fix to make a popup with error 
                    // if metamask isn't installed
                       <h3>{errorMessage}</h3>
                ) : (
                    <button className="btn" onClick={connectWallet}>
                        Connect Wallet
                    </button>
                    )
            ) : (
                <h3>Address: {defaultAccount}</h3>
            )}
        </div>
    )
}


export default MetaMask;


