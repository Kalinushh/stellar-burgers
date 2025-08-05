import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import { userSelectors } from '../../slices/userSlice';

type Props = {
  children: ReactNode;
  anonymous?: boolean;
};

const ProtectedRoute: FC<Props> = ({ children, anonymous = false }) => {
  const isLoggedIn = useSelector(userSelectors.selectIsAuthenticated);
  const isAuthChecked = useSelector(userSelectors.selectIsAuthChecked);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (!isAuthChecked) return null;

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
