import { CategoryId } from "./Category";

export type ProductType = 'candle' | 'diffuser' | 'sachet';

export interface IProduct {
  id: string;
  name: string;
  categoryId: CategoryId;
  count: number;
  price: number;
}

export type ProductWithoutId = Omit<IProduct, "id">;

export type ProductId = Pick<IProduct, "id">;

export type PartialProductWithoutId = Partial<ProductWithoutId>;
