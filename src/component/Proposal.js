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
        alert("추가되었습니다")
        setShowComponent(true); //버튼 클릭 시 상태 변경하는 함수
    };

    if (!showComponent) { // + 버튼을 누르면 추가하는 창 생성됨
        return (
            <div className="add-board">
                <div className="board">
                    <p>Project Name:</p>
                    <input value={inputValue} onChange={handleInputChange} />
                    <p>Website Link : </p>
                    <input className="Link_input" />
                    <p>Logo link : </p>
                    <p>x link :</p>
                    <p>Discord link :</p>
                    <p>Comment:</p>
                    <p>Total supply:</p>
                    <p>Total allocation:</p>
                    <button onClick={SubmitButtonClick}>(filecoin logo) submit</button>
                </div>
                <div className="IPFS-board">
                    <h1>IPFS Link</h1>
                </div>
            </div >
        )
    };


    return (
        <div className="proposal">
            <div className="board">
                <div className="board-header">
                    <h1>{inputValue}</h1>
                </div>
                <div className="board-body">
                    <img className="project-img" src="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop="></img>
                    <p>Website Link : </p>
                    <p>comment : </p>
                    <p>total allocation : 100ETH(10%)</p>
                    <div className="price">
                        <input className="price-input" />
                        <p>NFT</p>
                    </div>
                    <div className="board-footer">
                        <button>fire logo</button>
                    </div>
                    <div className="board-add">
                    </div>

                </div>
            </div>
            <div className="board">
                <button className='add-content' onClick={AddButtonClick}>
                    +
                </button>
            </div>

        </div>

    );
}

export default Proposal;