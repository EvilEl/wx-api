export interface Category {
  id:string
  name: string, 
  description: string
}

export type CategoryWithoutId = Omit<Category, "id">;

export type CategoryId = Pick<Category, "id">;

export type PartialCategoryWithoutId = Partial<Category>;
