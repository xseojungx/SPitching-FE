//🔁 API 요청을 컴포넌트에서 쉽게 쓰게 만들어주는 Hook
//React Query를 이용해 요청 상태(isLoading, error, data) 자동 관리
//컴포넌트에서 직접 axios.get() 같은 코드 안 써도 됨

// src/hooks/useUser.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { getMyProfile, login, logout } from '../services/userApi';

export const useUserProfile = () => useQuery(['user', 'profile'], getMyProfile);

export const useLogin = () => useMutation({ mutationFn: login });

export const useLogout = () => useMutation({ mutationFn: logout });
