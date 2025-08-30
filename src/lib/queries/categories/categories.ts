import { client } from "@/lib/sanityClient";
import type { 
  GetAllCategoriesResponse, 
  GetCategoryBySlugResponse, 
  GetTopLevelCategoriesResponse,
  GetCategoryWithSubcategoriesResponse 
} from "@/types/category";

// Get only parent categories (top-level categories without parent)
export async function getParentCategories(): Promise<GetTopLevelCategoriesResponse> {
  return client.fetch(
    `*[_type == "category" && !defined(parent)] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      "alt": image.alt,
      // Count of subcategories for display purposes
      "subcategoryCount": count(*[_type == "category" && references(^._id)])
    }`,
    {},
    { next: { tags: ['categories'], revalidate: 3600 } }
  );
}

// Get a specific parent category with its subcategories (for navigation to parent page)
export async function getParentCategoryWithSubcategories(slug: string): Promise<GetCategoryWithSubcategoriesResponse> {
  return client.fetch(
    `*[_type == "category" && slug.current == $slug && !defined(parent)][0] {
      _id,
      title,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      "alt": image.alt,
      description,
      // Get all direct subcategories
      "subcategories": *[_type == "category" && parent._ref == ^._id] | order(title asc) {
        _id,
        title,
        "slug": slug.current,
        "imageUrl": image.asset->url,
        "alt": image.alt,
        description
      }
    }`,
    { slug },
    { next: { tags: ['categories'], revalidate: 3600 } }
  );
}

// Get subcategories for a specific parent category
export async function getSubcategoriesByParent(parentSlug: string): Promise<GetAllCategoriesResponse> {
  return client.fetch(
    `*[_type == "category" && parent->slug.current == $parentSlug] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      "alt": image.alt,
      description,
      parent->{
        title,
        "slug": slug.current
      }
    }`,
    { parentSlug },
    { next: { tags: ['categories'], revalidate: 3600 } }
  );
}

// Get any category by slug (parent or subcategory)
export async function getCategoryBySlug(slug: string): Promise<GetCategoryBySlugResponse> {
  return client.fetch(
    `*[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      "alt": image.alt,
      description,
      parent->{
        _id,
        title,
        "slug": slug.current
      },
      // If this is a parent category, get its subcategories
      "subcategories": *[_type == "category" && parent._ref == ^._id] | order(title asc) {
        _id,
        title,
        "slug": slug.current,
        "imageUrl": image.asset->url,
        "alt": image.alt
      }
    }`,
    { slug },
    { next: { tags: ['categories'], revalidate: 3600 } }
  );
}

// Optional: Get all categories with hierarchy info (for breadcrumbs, etc.)
export async function getAllCategories(): Promise<GetAllCategoriesResponse> {
  return client.fetch(
    `*[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      "alt": image.alt,
      parent->{
        _id,
        title,
        "slug": slug.current
      },
      "subcategories": *[_type == "category" && parent._ref == ^._id] {
        _id,
        title,
        "slug": slug.current,
        "imageUrl": image.asset->url,
        "alt": image.alt
      }
    }`,
    {},
    { next: { tags: ['categories'], revalidate: 3600 } }
  );
}

// Get breadcrumb trail for a category
export async function getCategoryBreadcrumb(slug: string) {
  return client.fetch(
    `*[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      parent->{
        _id,
        title,
        "slug": slug.current,
        parent->{
          _id,
          title,
          "slug": slug.current
        }
      }
    }`,
    { slug },
    { next: { tags: ['categories'], revalidate: 3600 } }
  );
}