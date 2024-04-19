import react from "react";
import "../App.css"

function Funding() {
    return (
        <div className="proposal">
            <div className="board">
                <div className="board-header">
                    <p>Project Name</p>
                </div>
                <div className="board-body">
                    <img className="project-img" src="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop="></img>
                    <p>Website Link : </p>
                    <p>total allocation : 100ETH(10%)</p>
                    <p>participant : 10% (100/1000)</p>
                    <div className="price">
                        <input className="price-input" />
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