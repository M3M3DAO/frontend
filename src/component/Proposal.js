import react, { useState } from "react";
import "../App.css";

function Proposal({ type }) {
    const [showComponent, setShowComponent] = useState(false); //추가 누를 때 컨포넌트 생성 삭제
    const [inputValue, setInputValue] = useState('') //input value불러올 때
    const [boards, setBoards] = useState([]); // 프로젝트 보드들을 저장할 배열

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
            <div className="board">
                <div className="board-header">
                    <p>Project Name</p>
                </div>
                <div className="board-body">
                    <img className="project-img" src="/images/meme.jpg"></img>
                    <p>Website Link : -</p>
                    <p>comment : -</p>
                    <p>total allocation : 100ETH(10%)</p>
                    <div className="price">
                        <input className="price-input" value={1} min="1" />
                        <p>NFT</p>
                    </div>
                    <div className="board-footer">
                        <button>fire logo</button>
                    </div>
                    <div className="board-add">
                    </div>

                </div>
            </div>
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
                                <input className="Link_input" value={inputValue} onChange={handleInputChange} />
                            </div>
                            <div className="input-container">
                                <p>Website : </p>
                                <input className="Link_input" />
                            </div>
                            <div className="input-container">
                                <p>Logo : </p>
                                <input className="Link_input" />
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
                                <input className="Link_input" />
                            </div>
                            <div className="input-container">
                                <p>Allocation : </p>
                                <input className="Link_input" />
                            </div>
                            <button className="submit-button" onClick={SubmitButtonClick}>submit</button>
                        </div>
                    </div>
                )}
            </div>

        </div>

    );
}

export default Proposal;