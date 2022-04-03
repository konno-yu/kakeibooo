import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch();

  const signIn = useCallback(
    async (email: string, password: string) => {
      await dispatch(signIn(email, password));
    },
    [dispatch]
  );

  return { signIn };
};
