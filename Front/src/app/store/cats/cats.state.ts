import { Cat } from '../../tests/models/Cat';

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