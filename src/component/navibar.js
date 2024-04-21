import react from "react";
import "../Navbar.css";
import "../App.css";
import MetaMask from "../MetaMask";
import { Outlet, Link } from "react-router-dom";


function Navibar(props) {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <img className="logo-img" src="https://github.com/M3M3DAO/nft-images/raw/main/logo.png" alt="Logo" />
                    </li>
                    <li className="Name">
                        MEMEDAO
                    </li>
                    <li>
                        <Link to="/mint">Mint</Link>
                    </li>
                    <li>
                        <Link to="/proposal">Proposal</Link>
                    </li>
                    <li>
                        <Link to="/funding">Funding</Link>
                    </li>
                    <li>
                        <MetaMask />
                    </li>
                </ul>
            </nav>

            <Outlet />

        </div>
    );
}

export default Navibar;