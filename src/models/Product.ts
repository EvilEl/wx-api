export interface IProduct {
  id: string;
  name: string;
  count: number;
  price: number;
}

export type ProductWithoutId = Omit<IProduct, "id">;

export type ProductId = Pick<IProduct, "id">;

export type PartialProductWithoutId = Partial<ProductWithoutId>;
