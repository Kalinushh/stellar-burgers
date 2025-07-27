import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectIngredients,
  fetchIngredients
} from '../../slices/ingredientsSlice';

import { TTabMode, TIngredient } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

export const BurgerIngredients: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);
  /** TODO: взять переменные из стора */

  // const buns: TIngredient[] = [
  //   {
  //     _id: 'bun1',
  //     name: 'Булка N',
  //     type: 'bun',
  //     price: 50,
  //     image: 'https://via.placeholder.com/100x40',
  //     image_mobile: '',
  //     image_large: '',
  //     calories: 100,
  //     carbohydrates: 20,
  //     fat: 5,
  //     proteins: 10
  //   }
  // ];
  //
  // const mains: TIngredient[] = [
  //   {
  //     _id: 'main1',
  //     name: 'Котлета говяжья',
  //     type: 'main',
  //     price: 80,
  //     image: 'https://via.placeholder.com/100x40',
  //     image_mobile: '',
  //     image_large: '',
  //     calories: 200,
  //     carbohydrates: 0,
  //     fat: 15,
  //     proteins: 25
  //   }
  // ];
  //
  // const sauces: TIngredient[] = [
  //   {
  //     _id: 'sauce1',
  //     name: 'Соус острый',
  //     type: 'sauce',
  //     price: 30,
  //     image: 'https://via.placeholder.com/100x40',
  //     image_mobile: '',
  //     image_large: '',
  //     calories: 60,
  //     carbohydrates: 10,
  //     fat: 2,
  //     proteins: 1
  //   }
  // ];

  const ingredients = useSelector(selectIngredients);

  const buns = ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // return null;

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
