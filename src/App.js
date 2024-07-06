import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import About from './Components/About';
import Navbar from './Components/Navbar';
import Alert from './Components/Alert';
import { useState } from 'react';
import PositionWindow from './Components/PositionWindow';
import Signup from './Components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import DataState from './Context/DataState';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <div className="App">
      <DataState>
      <Router>

        <Navbar />
        <Alert alert={alert}/>
        <div className='container'>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About/>} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            <Route exact path="/positiontype" element={<PositionWindow showAlert={showAlert}/>} />

          </Routes>
        </div>
      </Router>
      </DataState>
    </div>
  );
}

export default App;
