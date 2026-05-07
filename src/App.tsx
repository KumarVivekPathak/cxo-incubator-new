import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import NavBar from './components/NavBar';
import ScorecardPage from './pages/scorecard/ScorecardPage';
import Assessment from './pages/assessment/Assessment';
import ResultPage from './pages/result/ResultPage';


export default function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/scorecard' element={<ScorecardPage />} />
        <Route path='/assessment' element={<Assessment />} />
        <Route path='/result' element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}
