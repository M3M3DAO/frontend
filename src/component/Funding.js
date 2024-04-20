import react from "react";
// import "../App.css"
import "./Funding.css"

function Funding() {
    return (
        <div className="funding">
            <div className="funding-board">
                <div className="funding-board-header">
                    <p>Project Name</p>
                </div>
                <div className="board-body">
                    <img className="project-img" src="/images/meme.jpg"></img>
                    <p>Website Link : -</p>
                    <p>total allocation : 100ETH(10%)</p>
                    <p>participant : 10% (100/1000)</p>
                    <div className="price">
                        <input className="price-input" value={1} min="1" />
                        <p>NFT</p>
                    </div>
                    <div className="board-footer">
                        <button>Burn NFT & Claim</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Funding;