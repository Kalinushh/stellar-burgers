import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  fetchUserOrders,
  selectUserOrders
} from '../../slices/profileOrdersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectUserOrders);
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
