import React, { useState } from "react";
import { ethers } from 'ethers';
import './Mint.css';
import MetaMask from '../MetaMask';

function Mint() {
    const mintPrice = "0.01";
    const [mintAmount, setMintAmount] = useState(1);
    const [defaultAccount, setDefaultAccount] = useState(null);

    const handleMintAmountChange = (event) => {
        const value = event.target.value;
        const intValue = parseInt(value, 10);
        if (value === '' || (intValue.toString() === value && !value.includes('e'))) {
            setMintAmount(value);
        }
    };

    const handleMint = async () => {
        if (!defaultAccount) {
            console.error("Connect your wallet first");
            return;
        }

        console.log(`Minting ${mintAmount} NFT(s) at ${mintPrice} ETH each.`);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner(defaultAccount);
            const contractAddress = ""; // 컨트랙트 주소 추가
            const contractABI = ""; // ABI 추가
            const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

            alert("Mint 트랜잭션 발생");
            const transaction = await nftContract.mint(mintAmount, {
                value: ethers.parseEther((mintPrice * mintAmount).toString())
            });
            await transaction.wait();
            console.log("NFT minting success");
        } catch (error) {
            console.error("NFT minting fail: ", error);
        }
    };

    return (
        <div className="mint-container">
            <div className="mint-body">
                <div className="mint-body1">
                    <img className="logo-background-img" src="/images/logo-background.png" alt="Logo" />
                </div>
                <div className="mint-body2">
                    <div className="mint-header">
                        <p>NFT MINT</p>
                    </div>
                    <p>Join at {mintPrice} ETH per NFT</p>
                    <p>Period: -</p>
                    <p>Contract: 0x12341234...12341234</p>
                    <div className="price">
                        <input
                            className="mint-input"
                            type="number"
                            value={mintAmount}
                            onChange={handleMintAmountChange}
                            min="1"
                        />
                        <p className="nft-text">NFT</p>
                    </div>
                    <button className="mint-button" onClick={handleMint} disabled={!defaultAccount}>
                        Mint NFT
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Mint;
