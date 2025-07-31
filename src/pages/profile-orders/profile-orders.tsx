import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  fetchUserOrders,
  selectUserOrders
} from '../../slices/profileOrdersSlice';
import { fetchIngredients } from '../../slices/ingredientsSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectUserOrders);
  useEffect(() => {
    dispatch(fetchUserOrders());
    dispatch(fetchIngredients());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
