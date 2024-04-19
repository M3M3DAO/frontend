import logo from './logo.svg';
import './App.css';
import Navibar from './component/navibar';
import Proposal from './component/Proposal';
import Funding from './component/Funding';
import Mint from './component/Mint';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Navibar />}>
            <Route path="/" element={<Mint />} />
            <Route path="mint" element={<Mint />} />
            <Route path="proposal" element={<Proposal />} />
            <Route path="funding" element={<Funding />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
