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
                    <li className="Name">
                        MEMEDAO
                    </li>
                    <li>
                        <Link to="/">Proposal</Link>
                    </li>
                    <li>
                        <Link to="/funding">Funding</Link>
                    </li>
                    <li>
                        <Link to="/mint">Mint</Link>
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