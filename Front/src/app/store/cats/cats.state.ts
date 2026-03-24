import { CatImage } from '../../models/dtos/catImage';

export interface CatState {
  catImages: CatImage[];
  loading: boolean;
  error: string | null;
}

export const initialCatState: CatState = {
  catImages: [],
  loading: false,
  error: null
};
