// src/hooks/useAuth.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSessionStatus, getUserId, postLogout } from '@/services/auth.api';
import { useDispatch } from 'react-redux';
import { login, logout as logoutAction } from '@/redux/slices/auth.slice';
import { useNavigate } from 'react-router-dom';
// src/hooks/useAuth.ts
import { useEffect } from 'react';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 세션 상태 조회
  const {
    data: sessionStatus,
    isLoading: sessionLoading,
    isError: sessionError,
    refetch: refetchSession,
  } = useQuery({
    queryKey: ['sessionStatus'],
    queryFn: getSessionStatus,
    retry: false,
    staleTime: Infinity,
    select: (response) => response.data,
  });

  // 유저 ID 조회 (세션 상태가 인증되었을 때만 실행)
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

  // 유저 정보가 성공적으로 로드되면 Redux에 로그인 처리
  useEffect(() => {
    if (user?.userId) {
      dispatch(login(user.userId));
    }
  }, [user, dispatch]);

  // 세션 비정상일 경우 강제 로그아웃
  useEffect(() => {
    if (sessionStatus && (!sessionStatus.authenticated || !sessionStatus.active)) {
      dispatch(logoutAction());
      navigate('/login');
    }
  }, [sessionStatus, dispatch, navigate]);

  return {
    isLoading: sessionLoading || userLoading,
    isError: sessionError || userError,
    refetchSession,
  };
};
