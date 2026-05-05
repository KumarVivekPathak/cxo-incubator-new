import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import NavBar from './components/NavBar';


export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/scorecard" element={
          <AssessmentProvider>
            <ScorecardPage />
          </AssessmentProvider>
        } /> */}
      </Routes>
    </BrowserRouter>
  );
}
