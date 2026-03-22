import { Cat } from '../../models/dtos/cat';

export interface CatState {
  cats: Cat[];
  loading: boolean;
  error: string | null;
}

export const initialCatState: CatState = {
  cats: [],
  loading: false,
  error: null
};