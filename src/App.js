import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuestionPage } from './components/question';
import Leaderboard from './components/Leaderboard'; // adjust path if needed
import LandingPage from './components/LandingPage'; // adjust path if needed
import LoginPage from './components/login/LoginPage';
import SignupPage from './components/login/SignupPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home route */}
          <Route path="/" element={<QuestionPage />} />

          {/* Leaderboard route */}
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
