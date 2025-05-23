import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
import Landing from './pages/landing/Landing'; // 새로운 시작 페이지
import Dashboard from './pages/dashboard/Dashboard';
import FeedbackSummary from './pages/feedback/FeedbackSummary';
import LoginPage from './pages/auth/LoginPage';
import PracticePage from './pages/practices/PracticePage';
import PracticeDetailsPage from './pages/prep/PracticeDetailsPage';
import PracticeScriptPage from './pages/prep/PracticeScriptPage';
import PracticeFilePage from './pages/prep/PracticeFilePage';
import GestureDetailPage from './pages/feedback/GestureDetailPage';
import EditScriptPage from './pages/prep/EditScriptPage';

import PrivateRoute from '@/routes/PrivateRoute';
import FluencyDetailPage from './pages/feedback/FluencyDetailPage';
import EyeContactDetailPage from './pages/feedback/EyeContactDetailPage';
// import PublicOnlyRoute from '@/routes/PublicOnlyRoute';
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
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path='/feedback/:practiceId/summary'
            element={
              // <PrivateRoute>
              <FeedbackSummary />
              // </PrivateRoute>
            }
          />
          <Route
            path='/feedback/:practiceId/gesture'
            element={
              // <PrivateRoute>
              <GestureDetailPage />
              // </PrivateRoute>
            }
          />
          <Route
            path='/feedback/:practiceId/fluency'
            element={<FluencyDetailPage />}
          />
          <Route
            path='/feedback/:practiceId/eyecontact'
            element={<EyeContactDetailPage />}
          />
          <Route
            path='/practice/:presentationId'
            element={<PracticePage />}
          />
          <Route
            path='/full-practice/:presentationId'
            element={<PracticePage />}
          />
          <Route
            path='/practices/new/details'
            element={<PracticeDetailsPage />}
          />
          <Route
            path='/practices/new/file'
            element={<PracticeFilePage />}
          />
          <Route
            path='/practices/new/script'
            element={<PracticeScriptPage />}
          />
          <Route
            path='/practices/script/edit'
            element={<EditScriptPage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
