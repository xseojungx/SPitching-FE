import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기

  const { isLoading } = useAuth();

  const isAuthChecked = useSelector((state: RootState) => state.auth.isAuthChecked);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/login') {
      return; // '/'나 '/login'에서는 타이머 설정 안 함
    }
    const timer = setTimeout(() => {
      if (!isAuthChecked) {
        alert('인증 시간이 초과되었습니다. 다시 로그인해주세요.');
        navigate('/login', { replace: true });
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isAuthChecked, navigate]);

  if (isLoading) return <p>앱 로딩중...</p>;

  return (
    <>
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
    </>
  );
}

const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
