import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store';

export const RootRoute = () => {
  const session = useAppSelector((state) => state.auth.session);
  if (session === null) {
    return <Navigate to="signin" />;
  }
  return <Navigate to="home" />;
};
