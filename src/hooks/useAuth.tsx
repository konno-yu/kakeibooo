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

  const signOut = useCallback(async () => {
    await dispatch(signOut());
  }, [dispatch]);

  return { signIn };
};
