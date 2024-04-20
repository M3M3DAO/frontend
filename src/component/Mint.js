import React, { useState } from "react";
import { ethers } from 'ethers';
import './Mint.css';
import MetaMask from '../MetaMask';

function Mint() {
    const mintPrice = "0.001";
    const [mintAmount, setMintAmount] = useState(1);
    const [defaultAccount, setDefaultAccount] = useState(null);

    const provider = new ethers.JsonRpcProvider(
        "https://arbitrum-sepolia.blockpi.network/v1/rpc/public"
    );
    const contractAddress = "0x10cDed9E35b83fb47d9091005079F5f03408Bdc9"; // 컨트랙트 주소 추가
    const contractABI = [{
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },]; // ABI 추가

    const handleMintAmountChange = (event) => {
        const value = event.target.value;
        const intValue = parseInt(value, 10);
        if (value === '' || (intValue.toString() === value && !value.includes('e'))) {
            setMintAmount(value);
        }
    };

    const handleMint = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        if (!signer) {
            console.error("Connect your wallet first");
            return;
        }

        console.log(`Minting ${mintAmount} NFT(s) at ${mintPrice} ETH each.`);
        try {
            const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
            
            // alert("Mint 트랜잭션 발생");
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
                    <p>Contract: 0x10cDed9E...3408Bdc9</p>
                    <div className="nft-price">
                        <input
                            className="mint-input"
                            type="number"
                            value={mintAmount}
                            onChange={handleMintAmountChange}
                            min="1"
                        />
                        <p className="nft-text">NFT</p>
                    </div>
                    <button className="mint-button" onClick={handleMint}>
                        Mint NFT
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Mint;
