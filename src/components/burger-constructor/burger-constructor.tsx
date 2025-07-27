import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectBun, selectIngredients } from '../../slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const bun = useSelector(selectBun);
  const ingredients = useSelector(selectIngredients);

  const constructorItems = {
    bun: bun ?? null,
    ingredients: ingredients ?? []
    // bun: {
    //   _id: 'bun123',
    //   id: 'local-bun-id',
    //   name: 'Булка N',
    //   type: 'bun',
    //   price: 50,
    //   image: 'https://via.placeholder.com/100x40',
    //   image_mobile: 'https://via.placeholder.com/50x30',
    //   image_large: 'https://via.placeholder.com/200x100',
    //   calories: 100,
    //   carbohydrates: 10,
    //   fat: 5,
    //   proteins: 7
    // },
    // ingredients: [
    //   {
    //     _id: 'main456',
    //     id: 'local-main-id-1',
    //     name: 'Котлета говяжья',
    //     type: 'main',
    //     price: 80,
    //     image: 'https://via.placeholder.com/100x40',
    //     image_mobile: 'https://via.placeholder.com/50x30',
    //     image_large: 'https://via.placeholder.com/200x100',
    //     calories: 150,
    //     carbohydrates: 5,
    //     fat: 10,
    //     proteins: 20
    //   },
    //   {
    //     _id: 'sauce789',
    //     id: 'local-sauce-id-1',
    //     name: 'Соус острый',
    //     type: 'sauce',
    //     price: 30,
    //     image: 'https://via.placeholder.com/100x40',
    //     image_mobile: 'https://via.placeholder.com/50x30',
    //     image_large: 'https://via.placeholder.com/200x100',
    //     calories: 50,
    //     carbohydrates: 2,
    //     fat: 4,
    //     proteins: 1
    //   }
    // ]
  };

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};
  const price = 0;

  // const price = useMemo(
  //   () =>
  //     (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
  //     constructorItems.ingredients.reduce(
  //       (s: number, v: TConstructorIngredient) => s + v.price,
  //       0
  //     ),
  //   [constructorItems]
  // );

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
