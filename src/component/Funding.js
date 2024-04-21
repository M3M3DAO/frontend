import react, { useState, useEffect } from "react";
import { ethers } from 'ethers';
// import "../App.css"
import "./Funding.css"

function Funding() {
    const [metadata, setMetadata] = useState(
        { allocation: 0, supply: 0, participant: 0 },
    );

    const nftContractAddress = "0x714eD56B2dA2f6CF4A583507bF3CF15313989E1B"; // 컨트랙트 주소 추가
    const nftContractABI = [{
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },]; // ABI 추가

    const contractAddress = "0xd0cF7C434bbA6Ae95e9580ea0dC3020255D2fBa1"; // 컨트랙트 주소 추가
    const contractABI = [{
        "inputs": [
            {
                "internalType": "uint256",
                "name": "buyAmount",
                "type": "uint256"
            }
        ],
        "name": "buy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getHighestMetadata",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "logo",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "website",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "like",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "supply",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "allocation",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "participant",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct M3M3Voting.MetaData",
                "name": "metadata",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },]; // ABI 추가

    const BuyButton = async (index) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        if (!signer) {
            console.error("Connect your wallet first");
            return;
        }

        console.log(`Submit project.`);
        try {
            const votingContract = new ethers.Contract(contractAddress, contractABI, signer);
            const nftContract = new ethers.Contract(nftContractAddress, nftContractABI, signer);

            const price = document.querySelector(`.price input[name="price"]`).value;
            console.log(`params: ${price}`);

            const isApprovedForAll = await nftContract.isApprovedForAll(signer.address, contractAddress);
            console.log(`isApprovedForAll: ${isApprovedForAll}`);
            if (!isApprovedForAll) {
                const transaction = await nftContract.setApprovalForAll(contractAddress, true);
                await transaction.wait();
                console.log("NFT approve success");
            }

            const transaction = await votingContract.buy(price);
            await transaction.wait();
            console.log("Voting buy success");

            await fetchMetadata();
        } catch (error) {
            console.error("Voting buy fail: ", error);
        }
    };

    const fetchMetadata = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        if (!signer) {
            console.error("Connect your wallet first");
            return;
        }

        const votingContract = new ethers.Contract(contractAddress, contractABI, signer);

        try {
            const metadata = await votingContract.getHighestMetadata();
            setMetadata(metadata);
        } catch (error) {
            console.error('Failed to load metadata:', error);
        }
    };

    useEffect(() => {
        fetchMetadata();
    }, []);

    return (
        <div className="funding">
            <div className="funding-board">
                <div className="funding-board-header">
                    <p>{metadata.name}</p>
                </div>
                <div className="board-body">
                    <img className="project-img" src={metadata.logo}></img>
                    <p>Website Link : {metadata.website}</p>
                    <p>Allocation : {metadata.allocation.toString()} ETH({metadata.allocation.toString() / metadata.supply.toString() * 100}%)</p>
                    <p>Participant : {metadata.participant.toString() / (metadata.allocation.toString() * 100)}%({metadata.participant.toString()}/{metadata.allocation.toString() * 100})</p>
                    <div className="price">
                        <input name="price" className="price-input" min="1" />
                        <p>NFT</p>
                    </div>
                    <div className="board-footer">
                        <button onClick={BuyButton}>Burn NFT & Claim</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Funding;