// import { RouteProps, Navigate } from 'react-router-dom';
// import { useAppSelector } from '../store';

import { RouteProps } from 'react-router-dom';

export const PublicRoute = ({ children }: RouteProps) =>
  // const session = useAppSelector((state) => state.auth.session);
  // if (session !== null) {
  //   return <Navigate to="/householdbook" />;
  // }
  children as JSX.Element;
