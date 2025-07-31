import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectBun,
  selectIngredients,
  selectOrderRequest,
  selectOrderModalData,
  orderBurger,
  constructorActions
} from '../../slices/constructorSlice';
import { userSelectors } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const bun = useSelector(selectBun);
  const ingredients = useSelector(selectIngredients);

  const constructorItems = {
    bun: bun ?? null,
    ingredients: ingredients ?? []
  };

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectOrderModalData);

  const isAuth = useSelector(userSelectors.selectIsAuthenticated);

  const onOrderClick = () => {
    console.log('[DEBUG] accessToken:', document.cookie);
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuth) {
      alert('Авторизуйтесь, чтобы оформить заказ');
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(orderBurger(ingredientIds));
  };
  const closeOrderModal = () => {
    dispatch(constructorActions.clearOrder());
  };

  // const price = 0;

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
