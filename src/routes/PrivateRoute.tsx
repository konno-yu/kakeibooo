import { RouteProps, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store';

export const PrivateRoute = ({ children }: RouteProps) => {
  const session = useAppSelector((state) => state.auth.session);
  if (session === null) {
    return <Navigate to="/signin" />;
  }
  return children as JSX.Element;
};
