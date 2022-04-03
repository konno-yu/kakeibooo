import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSession } from '../reducer/authSlice';
import { supabase } from '../supabaseClient';

type Props = {
  children: React.ReactNode;
};

export const AuthListener: React.VFC<Props> = ({ children }: Props) => {
  const dispatch = useDispatch();
  const session = supabase.auth.session();

  useEffect(() => {
    if (session) {
      dispatch(setSession({ session }));
    }
  }, [dispatch, session]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
