import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './pages/landing/Landing'; // 새로운 시작 페이지
import Dashboard from './pages/dashboard/Dashboard';
import FeedbackSummary from './pages/feedback/FeedbackSummary';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={<Landing />}
          />
          <Route
            path='/dashboard'
            element={<Dashboard />}
          />
          <Route
            path='/feedback/summary'
            element={<FeedbackSummary />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
