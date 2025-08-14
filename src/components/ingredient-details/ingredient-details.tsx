import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredient = useSelector((state) =>
    state.ingredients.items.find((item) => item._id === id)
  );

  return ingredient ? (
    <IngredientDetailsUI ingredientData={ingredient} />
  ) : (
    <Preloader />
  );
};
