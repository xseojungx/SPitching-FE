import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '@/redux/store';

type Props = { children: React.ReactNode };

const PrivateRoute = ({ children }: Props) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <Navigate
        to='/login'
        replace
      />
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
