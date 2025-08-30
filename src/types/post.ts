import { PortableTextBlock } from "sanity";

// Base types
export interface Author {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  bio?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface FeaturedImage {
  url: string;
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

// Post types
export interface Post {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  featuredImage?: FeaturedImage;
  author: Author;
  categories?: Category[];
  body?: PortableTextBlock[]; // Sanity block content - use proper type if needed
}

// Response types
export interface PostsResponse {
  posts: Post[];
  total: number;
  hasMore: boolean;
}

export interface PostBySlugResponse extends Post {
  body: PortableTextBlock[]; // Full body content for single post
}

// Optional: More specific types if you want to be strict
export interface PostPreview {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  featuredImage?: Pick<FeaturedImage, 'url' | 'alt'>;
  author: Pick<Author, 'name' | 'slug'>;
}

export interface PostDetail extends Post {
  body: PortableTextBlock[];
  author: Author; // Full author details
  categories: Category[]; // Full category details
}