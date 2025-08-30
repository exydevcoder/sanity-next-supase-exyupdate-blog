import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SingleBlogPage from '@/components/sections/single-blog-page/SingleBlogPage';
import { getPostBySlug } from '@/lib/queries/posts/getPostBySlug';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      ...(post.featuredImage && {
        images: [
          {
            url: post.featuredImage.url,
            alt: post.featuredImage.alt || post.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      ...(post.featuredImage && {
        images: [post.featuredImage.url],
      }),
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <SingleBlogPage post={post} />;
}