import { useSelector } from 'react-redux';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

type Props = { children: React.ReactNode };

const PrivateRoute = ({ children }: Props) => {
  const { isLoading } = useAuth();

  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn); // 필요 시 타입 지정
  console.log('isLoggedIn', isLoggedIn);
  if (isLoading) return <p>로딩중</p>;

  if (!isLoggedIn) {
    alert('로그인을 다시 해주세요!');

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
