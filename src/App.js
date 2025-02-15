import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter, Route, Routes, link} from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import BookingScreen from './Screens/BookingScreen';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import Header from './Components/header';

function App() {
  return (
    <div className="App">
      <div>
      <Header/>
     <BrowserRouter>
     <Routes>

     <Route path='/home' exact Component={HomeScreen}/>
     <Route path='/book/:roomid' exact Component={BookingScreen}></Route>
     <Route path='/register' exact Component={RegisterScreen}></Route>
     <Route path='/login' exact Component={LoginScreen}></Route>

     </Routes>
     </BrowserRouter>


      </div>
     
    </div>
  );
}

export default App;
