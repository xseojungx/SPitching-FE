// src/routes/PublicOnlyRoute.tsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const PublicOnlyRoute = ({ children }: { children: React.JSX.Element }) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

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
