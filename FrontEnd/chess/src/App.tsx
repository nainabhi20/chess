import './App.css';
import SignupForm from './Pages/Signup';
import SigninForm from './Pages/Signin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WebSocketContextProvider } from './Context/WebSocketContextProvider';
import { MatchingPage } from './Pages/Matching';
import GameList from './Pages/MyGames';
import { LiveGame } from './Pages/LiveGame';
import Navbar from './Components/Header';
import { useCookies } from 'react-cookie';
import { checkAuthentication } from './Utils';
import HomePage from './Pages/HomePage';


function App() {
  const [cookies,setCookie ,removeCookie] = useCookies();

  const handleLogout = () => {
    removeCookie('token');
  }

  return (
    <WebSocketContextProvider>
    <div className="App">
      <header className="App-header">
        <Router>
        <Navbar isAuthenticated={checkAuthentication(cookies['token'])} onLogout={handleLogout}/>
          <Routes>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<SigninForm />} />
            <Route path='/matching' element={<MatchingPage/>} />
            <Route path='/game-list' element={<GameList/>} />
            <Route path='/game/:gameId' element={<LiveGame/>}/>
            <Route path = "/" element={<HomePage/>}/>
          </Routes>
      </Router>
      </header>
    </div>
    </WebSocketContextProvider>
  );
}

export default App;
