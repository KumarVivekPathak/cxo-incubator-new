import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import NavBar from './components/NavBar';
import ScorecardPage from './pages/scorecard/ScorecardPage';
import Assessment from './pages/assessment/Assessment';


export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/scorecard' element={<ScorecardPage />} />
        <Route path='/assessment' element={<Assessment />} />
      </Routes>
    </BrowserRouter>
  );
}
