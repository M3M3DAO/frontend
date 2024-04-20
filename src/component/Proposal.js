import react, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import "../App.css";

function Proposal({ type }) {
    const [showComponent, setShowComponent] = useState(false); //추가 누를 때 컨포넌트 생성 삭제
    const [inputValue, setInputValue] = useState('') //input value불러올 때
    const [boards, setBoards] = useState([]); // 프로젝트 보드들을 저장할 배열
    const [metadata, setMetadata] = useState([]);

    const contractAddress = "0x733B3C180eb4357d46E21521009cA718BC82020e"; // 컨트랙트 주소 추가
    const contractABI = [{
        "inputs": [
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
                    }
                ],
                "internalType": "struct M3M3Voting.MetaData",
                "name": "_metadata",
                "type": "tuple"
            }
        ],
        "name": "submit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "votingAmount",
                "type": "uint256"
            }
        ],
        "name": "lfg",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMetadataAll",
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
                    }
                ],
                "internalType": "struct M3M3Voting.MetaData[]",
                "name": "metadatas",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },]; // ABI 추가

    const handleInputChange = (event) => {
        // event.target.value를 사용하여 입력값을 가져오고 상태를 업데이트합니다.
        setInputValue(event.target.value);
    };
    const AddButtonClick = () => {
        setShowComponent(false); //버튼 클릭 시 상태 변경하는 함수
    };

    const SubmitButtonClick = () => {
        setShowComponent(true); //버튼 클릭 시 상태 변경하는 함수
    };

    const SubmitButton = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        if (!signer) {
            console.error("Connect your wallet first");
            return;
        }

        console.log(`Submit project.`);
        try {
            const votingContract = new ethers.Contract(contractAddress, contractABI, signer);

            const name = document.querySelector('.input-container input[name="name"]').value;
            const website = document.querySelector('.input-container input[name="website"]').value;
            const logo = document.querySelector('.input-container input[name="logo"]').value;
            const supply = document.querySelector('.input-container input[name="supply"]').value;
            const allocation = document.querySelector('.input-container input[name="allocation"]').value;
            console.log(`params: ${name} ${website} ${logo} ${supply} ${allocation}`);

            const transaction = await votingContract.submit({
                name,
                logo,
                website,
                like: 0,
                supply,
                allocation,
            });
            await transaction.wait();
            console.log("Voting submit success");
        } catch (error) {
            console.error("Voting submit fail: ", error);
        }
    };

    const SubmitLFG = async (index) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        if (!signer) {
            console.error("Connect your wallet first");
            return;
        }

        console.log(`Submit project.`);
        try {
            const votingContract = new ethers.Contract(contractAddress, contractABI, signer);

            const price = document.querySelector(`.price input[name="${index}"]`).value;
            console.log(`params: ${index} ${price}`);

            const transaction = await votingContract.lfg(index, price);
            await transaction.wait();
            console.log("Voting lfg success");

            await fetchMetadata();
        } catch (error) {
            console.error("Voting lfg fail: ", error);
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
            const metadataArray = await votingContract.getMetadataAll();
            setMetadata(metadataArray);
        } catch (error) {
            console.error('Failed to load metadata:', error);
        }
    };
    
    useEffect(() => {
        fetchMetadata();
    }, []);

    // if (!showComponent) { // + 버튼을 누르면 추가하는 창 생성됨
    //     return (
    //         <div className="add-board">
    //             <div className="board">
    //                 <p>Project Name : </p>
    //                 <input value={inputValue} onChange={handleInputChange} />
    //                 <p>Website Link : </p>
    //                 <input className="Link_input" />
    //                 <p>Logo link : </p>
    //                 <p>x link  : </p>
    //                 <p>Discord link  : </p>
    //                 <p>Comment : </p>
    //                 <p>Total supply : </p>
    //                 <p>Total allocation : </p>
    //                 <button onClick={SubmitButtonClick}>(filecoin logo) submit</button>
    //             </div>
    //             <div className="IPFS-board">
    //                 <h1>IPFS Link</h1>
    //             </div>
    //         </div >
    //     )
    // };


    return (
        <div className="proposal">
            {metadata.map((data, index) => (
                <div className="board">
                    <div key={index} className="metadata-entry">
                        <div className="board-header">
                            <p>{data.name}</p>
                        </div>
                        <div className="board-body">
                            <img className="project-img" src={data.logo}></img>
                            <p>Website Link : {data.website}</p>
                            <p>Allocation : {data.allocation.toString()} ETH({data.allocation.toString() / data.supply.toString() * 100}%)</p>
                            <p>Like : {data.like.toString()}</p>
                            <div className="price">
                                <input name={index} className="price-input" min="1" />
                                <p>NFT</p>
                            </div>
                            <div className="board-footer">
                                <button onClick={() => SubmitLFG(index)}>LFG</button>
                            </div>
                            <div className="board-add">
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div>
                {!showComponent ? (
                    <div className="board">
                        <button className="add-content" onClick={SubmitButtonClick}>
                            +
                        </button>
                    </div>
                ) : (
                    <div className="add-board">
                        <div className="board">
                            <div className="input-container">
                                <p>Name : </p>
                                <input name="name" className="Link_input" value={inputValue} onChange={handleInputChange} />
                            </div>
                            <div className="input-container">
                                <p>Website : </p>
                                <input name="website" className="Link_input" />
                            </div>
                            <div className="input-container">
                                <p>Logo : </p>
                                <input name="logo" className="Link_input" />
                            </div>
                            <div className="input-container">
                                <p>X : </p>
                                <input className="Link_input" />
                            </div>
                            <div className="input-container">
                                <p>Discord : </p>
                                <input className="Link_input" />
                            </div>
                            <div className="input-container">
                                <p>Comment : </p>
                                <input className="Link_input" />
                            </div>
                            <div className="input-container">
                                <p>Supply : </p>
                                <input name="supply" className="Link_input" />
                            </div>
                            <div className="input-container">
                                <p>Allocation : </p>
                                <input name="allocation" className="Link_input" />
                            </div>
                            <button className="submit-button" onClick={SubmitButton}>submit</button>
                        </div>
                    </div>
                )}
            </div>

        </div>

    );
}

export default Proposal;