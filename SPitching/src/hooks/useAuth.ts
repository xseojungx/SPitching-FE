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

  // ✅ 세션 인증 상태만으로도 로그인 상태 설정
  useEffect(() => {
    if (sessionStatus?.authenticated && sessionStatus?.active) {
      dispatch(login(null)); // userId는 이후에 별도로 설정
    }
  }, [sessionStatus, dispatch]);

  // ✅ userId가 도착했을 때 userId만 업데이트
  useEffect(() => {
    if (user?.userId) {
      dispatch(login(user.userId));
    }
  }, [user, dispatch]);

  // ✅ 세션이 비정상이면 로그아웃 처리
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
