import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { fetchFeed } from '../../slices/feedSlice';
import { fetchUserOrders } from '../../slices/profileOrdersSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const isProfile = location.pathname.startsWith('/profile/orders');

  const orders = useSelector((state) =>
    isProfile ? state.profileOrders.orders : state.feed.orders
  );

  useEffect(() => {
    if (!orders.length) {
      if (isProfile) {
        dispatch(fetchUserOrders());
      } else {
        dispatch(fetchFeed());
      }
    }
  }, [dispatch, isProfile, orders.length]);

  // const orders = useSelector((state) => state.feed.orders);
  const ingredients = useSelector((state) => state.ingredients.items);


  const orderData = orders.find((item) => item.number === Number(number));

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
