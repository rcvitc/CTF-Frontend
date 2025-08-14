import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuestionPage } from './components/question';
import Leaderboard from './components/Leaderboard'; // adjust path if needed
import LandingPage from './components/LandingPage'; // adjust path if needed

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
