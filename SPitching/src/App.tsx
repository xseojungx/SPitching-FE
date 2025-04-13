import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
import Landing from './pages/landing/Landing'; // 새로운 시작 페이지
import Dashboard from './pages/dashboard/Dashboard';
import FeedbackSummary from './pages/feedback/FeedbackSummary';
import LoginPage from './pages/auth/LoginPage';
import PracticePage from './pages/practice/\bPracticePage';

import PrivateRoute from '@/routes/PrivateRoute';
import PublicOnlyRoute from '@/routes/PublicOnlyRoute';
function App() {
  // useEffect(() => {
  //   fetch('', {
  //     method: 'GET',
  //     credentials: 'include', // 세션 쿠키 보내기
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('로그인된 사용자', data);
  //     })
  //     .catch(() => {
  //       console.log('로그인 안됨');
  //     });
  // }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={<Landing />}
          />
          <Route
            path='/login'
            element={
              // <PublicOnlyRoute>
              <LoginPage />
              // </PublicOnlyRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              // <PrivateRoute>
              <Dashboard />
              // </PrivateRoute>
            }
          />
          <Route
            path='/feedback/summary'
            element={
              // <PrivateRoute>
              <FeedbackSummary />
              // </PrivateRoute>
            }
          />{' '}
          <Route
            path='/practice'
            element={<PracticePage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
