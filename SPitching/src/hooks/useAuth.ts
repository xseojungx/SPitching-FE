import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { login, logout } from '@/redux/slices/auth.slice';
import { getSessionStatus, getUserId } from '@/services/auth.api';
import { useEffect } from 'react';

export const useAuth = () => {
  const dispatch = useDispatch();

  const {
    data: sessionStatus,
    isLoading: sessionLoading,
    isError: sessionError,
  } = useQuery({
    queryKey: ['sessionStatus'],
    queryFn: getSessionStatus,
    retry: false,
    staleTime: Infinity,
    select: (response) => response.data,
  });

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ['userId'],
    queryFn: getUserId,
    enabled: !!(sessionStatus?.authenticated && sessionStatus?.active),
    retry: false,
    staleTime: Infinity,
    select: (res) => res.data,
  });

  useEffect(() => {
    if (sessionStatus?.authenticated && sessionStatus?.active) {
      dispatch(login(null));
    }
  }, [sessionStatus, dispatch]);

  useEffect(() => {
    if (user?.userId) {
      dispatch(login(user.userId));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (sessionStatus && (!sessionStatus.authenticated || !sessionStatus.active)) {
      dispatch(logout());
    }
  }, [sessionStatus, dispatch]);

  return { isLoading: sessionLoading || userLoading, isError: sessionError || userError };
};
