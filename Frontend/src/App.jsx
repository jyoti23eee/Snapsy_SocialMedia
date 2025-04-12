import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import LivePage from './pages/LivePage';
import Login from './pages/Login';
import Reel from './pages/Reel';
//import ReelsAnalytics from './pages/ReelsAnalytics';
import Register from './pages/Register';
import SettingPage from './pages/SettingPage';
import EditProfile from './pages/EditProfile';
import UserAccount from './pages/UserAccount';
import VirtualTryOn from './pages/VirtualTryOn';
import Story from './pages/Story';
const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/LivePage' element={<LivePage/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/SettingPage' element={<SettingPage/>}/>
        <Route path='/EditProfile' element={<EditProfile/>}/>
        <Route path='/Reel' element={<Reel/>}/>
        <Route path='/UserAccount' element={<UserAccount/>}/>
        <Route path='/VirtualTryOn' element={<VirtualTryOn/>}/>
        <Route path='/Story' element={<Story/>}/>
      </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;