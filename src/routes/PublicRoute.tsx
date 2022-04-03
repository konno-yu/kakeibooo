import { RouteProps, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store';

export const PublicRoute = ({ children }: RouteProps) => {
  const session = useAppSelector((state) => state.auth.session);
  if (session !== null) {
    return <Navigate to="/householdbook" />;
  }
  return children as JSX.Element;
};
