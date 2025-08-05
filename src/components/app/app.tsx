import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate
} from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';

import styles from './app.module.css';
import '../../index.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { userActions, userSelectors, checkAuth } from '../../slices/userSlice';
import { fetchIngredients } from '../../slices/ingredientsSlice';

import { ReactNode } from 'react';
import ProtectedRoute from '../protected-route/protected-route';



const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const accessToken = localStorage.getItem('accessToken');
  //   const userData = localStorage.getItem('user');
  //
  //   if (accessToken && userData) {
  //     try {
  //       dispatch(userActions.setUser(JSON.parse(userData)));
  //     } catch {
  //       dispatch(userActions.setAuthChecked(true));
  //     }
  //   } else {
  //     dispatch(userActions.setAuthChecked(true));
  //   }
  // }, []);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const backgroundLocation = location.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />

      {}
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        {}
        <Route
          path='/login'
          element={
            <ProtectedRoute anonymous>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute anonymous>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute anonymous>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute anonymous>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        {}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        {}
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        {}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Заказ' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title='Ваш заказ'
                  onClose={() => navigate('/profile/orders')}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
