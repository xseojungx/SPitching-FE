// src/routes/PublicOnlyRoute.tsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

const PublicOnlyRoute = ({ children }: { children: React.JSX.Element }) => {
  const { isLoading } = useAuth();
  const { isLoggedIn, isAuthChecked } = useSelector((state: RootState) => state.auth);
  const [forceRedirect, setForceRedirect] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthChecked) {
        setForceRedirect(true);
      }
    }, 10000); // 10초 (10000ms)

    return () => clearTimeout(timer);
  }, [isAuthChecked]);

  if (forceRedirect) {
    alert('인증 시간이 초과되었습니다. 다시 로그인해주세요.');
    return (
      <Navigate
        to='/login'
        replace
      />
    );
  }

  if (!isAuthChecked) {
    return <div>Loading...</div>; // 혹은 spinner
  }
  if (isLoading) return <p>로딩중...</p>;

  return isLoggedIn ? (
    <Navigate
      to='/dashboard'
      replace
    />
  ) : (
    children
  );
};

export default PublicOnlyRoute;
