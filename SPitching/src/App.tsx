import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Landing from './pages/landing/Landing'; // 새로운 시작 페이지
import Dashboard from './pages/dashboard/Dashboard';
import FeedbackSummary from './pages/feedback/FeedbackSummary';
import LoginPage from './pages/auth/LoginPage';
import GoogleCallbackPage from './pages/auth/GoogleCallbackPage';

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
            element={<LoginPage />}
          />
          <Route
            path='/login/oauth2/code/google'
            element={<GoogleCallbackPage />}
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
