// @/types/category.ts

export interface Category {
  _id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  alt?: string;
  description?: string;
}

export interface CategoryWithParent extends Category {
  parent?: {
    _id: string;
    title: string;
    slug: string;
  };
}

export interface CategoryWithSubcategories extends Category {
  subcategories: Category[];
  subcategoryCount?: number;
}

export interface CategoryWithParentAndSubcategories extends CategoryWithParent {
  subcategories: Category[];
}

// Response types
export type GetAllCategoriesResponse = CategoryWithParentAndSubcategories[];
export type GetTopLevelCategoriesResponse = CategoryWithSubcategories[];
export type GetCategoryBySlugResponse = CategoryWithParentAndSubcategories | null;
export type GetCategoryWithSubcategoriesResponse = CategoryWithSubcategories | null;

// Breadcrumb type
export interface CategoryBreadcrumb {
  _id: string;
  title: string;
  slug: string;
  parent?: {
    _id: string;
    title: string;
    slug: string;
    parent?: {
      _id: string;
      title: string;
      slug: string;
    };
  };
}