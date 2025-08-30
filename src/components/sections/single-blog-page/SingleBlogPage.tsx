'use client';

import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import React from 'react';
import { client } from '@/lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Post } from '@/types/post';
import { useRelatedPosts } from '@/lib/queries/posts/getRelatedPosts';
import ComponentTitle from '@/components/reuseable/component-title';
import SkeletonCard from '@/components/reuseable/SkeletonCard';
import { Card, CardContent } from '@/components/ui/card';
import FavoriteButton from '@/components/buttons/FavoriteButton';
import Comment from '@/components/comment/Comment';
// Create image URL builder
const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface SingleBlogPageProps {
  post: Post;
}

export default function SingleBlogPage({ post }: SingleBlogPageProps) {
  const categoryIds = post.categories?.map(cat => cat._id) || [];
  const { data: relatedPosts, isLoading, error } = useRelatedPosts(post._id, categoryIds, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Post Not Found</h1>
          <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
          <Link href="/posts" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-3">
        <ComponentTitle title="Related Post" className="!text-xl font-semibold" />
        <div className="text-sm text-red-500">Failed to load related posts</div>
      </div>
    );
  }

  const publishedDate = format(new Date(post.publishedAt), 'MMMM d, yyyy');

  return (
    <article className="min-h-screen">
      <div className="">
        {/* Header */}
        <header className="mb-8 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{post.title}</h1>

          {post.excerpt && <p className="text-xl text-gray-600 leading-relaxed">{post.excerpt}</p>}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span className="hover:text-gray-700 transition-colors">{post.author.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <time dateTime={post.publishedAt}>{publishedDate}</time>
            </div>

            {post.categories && post.categories.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category, index) => (
                    <span key={category._id}>
                      <Link href={`/category/${category.slug}`} className="hover:text-gray-700 transition-colors">
                        {category.title}
                      </Link>
                      {index < post.categories!.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* favorite button */}
            <div className="ml-auto">
              <FavoriteButton postId={post._id} />
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage?.url && (
          <div className="mb-12 rounded-2xl overflow-hidden">
            <div className="aspect-video relative">
              {/* 16:9 aspect ratio container */}
              <Image src={post.featuredImage.url} alt={post.featuredImage.alt || post.title} fill className="object-cover" priority />
            </div>
          </div>
        )}

        {/* Post Content */}
        <div className="">
          {post.body && (
            <div className="prose prose-lg max-w-none prose-gray prose-headings:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
              <PortableText
                value={post.body}
                components={{
                  types: {
                    // Handle your custom image block type
                    image: ({ value }) => {

                      if (!value.asset) {
                        return null;
                      }

                      // Use the URL builder to get the image URL
                      const imageUrl = urlFor(value.asset).width(800).height(1000).url();

                      if (!imageUrl) {
                        return null;
                      }

                      return (
                        <div className="my-8">
                          <Image src={imageUrl} alt={value.alt || ''} width={800} height={1000} className="rounded-xl shadow-md h-auto" />
                          {value.alt && <p className="text-sm text-gray-600 text-center mt-2 italic">{value.alt}</p>}
                        </div>
                      );
                    },
                    // Handle your custom blockquote type
                    blockquote: ({ value }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-6 my-8 text-lg italic text-gray-700 bg-blue-50 py-4 rounded-r-lg">
                        <p className="mb-4">"{value.quote}"</p>
                        {(value.author || value.source) && (
                          <cite className="text-sm font-medium not-italic text-gray-900">
                            {value.author && `— ${value.author}`}
                            {value.source && ` (${value.source})`}
                          </cite>
                        )}
                      </blockquote>
                    ),
                    // Handle your custom code block type
                    code: ({ value }) => (
                      <div className="my-6">
                        <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                          <code className={`language-${value.language || 'text'}`}>{value.code}</code>
                        </pre>
                        {value.language && <p className="text-xs text-gray-500 mt-2 text-right">{value.language}</p>}
                      </div>
                    )
                  },
                  block: {
                    // Handle your custom styles
                    normal: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
                    h1: ({ children }) => <h1 className="text-3xl font-bold mt-12 mb-6 text-gray-900">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">{children}</h3>,
                    small: ({ children }) => <p className="text-sm mb-4 leading-6">{children}</p>,
                    medium: ({ children }) => <p className="text-base mb-4 leading-7">{children}</p>,
                    large: ({ children }) => <p className="text-lg mb-4 leading-8">{children}</p>
                  },
                  list: {
                    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
                  },
                  listItem: ({ children }) => <li className="leading-6">{children}</li>,
                  marks: {
                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    code: ({ children }) => <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
                    link: ({ children, value }) => (
                      <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors underline">
                        {children}
                      </a>
                    ),
                    color: ({ children, value }) => <span style={{ color: value.value }}>{children}</span>,
                    highlight: ({ children, value }) => (
                      <span style={{ backgroundColor: value.value }} className="px-1 rounded">
                        {children}
                      </span>
                    )
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Related Posts Section */}
        <section className="mt-16 border-t pt-12">
          <ComponentTitle title="Related Posts" className="!text-xl font-semibold" />
          {isLoading ? (
            <div className="">
              <SkeletonCard count={3} className="grid grid-cols-3 gap-3" cols={{ default: 1 }} />
            </div>
          ) : !relatedPosts || relatedPosts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No related posts available</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Card key={relatedPost._id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-0">
                    {relatedPost.featuredImage?.url && (
                      <div className="aspect-video relative">
                        <Image src={relatedPost.featuredImage.url} alt={relatedPost.featuredImage.alt || relatedPost.title} fill className="object-cover" />
                      </div>
                    )}
                    <CardContent className="p-4 px-3">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        <Link href={`/posts/${relatedPost.slug}`} className="transition-colors">
                          {relatedPost.title}
                        </Link>
                      </h3>
                      {relatedPost.excerpt && <p className="text-gray-600 text-sm mb-4 line-clamp-3">{relatedPost.excerpt}</p>}
                      <div className="flex items-center text-xs text-gray-500">
                        <time dateTime={relatedPost.publishedAt}>{format(new Date(relatedPost.publishedAt), 'MMM d, yyyy')}</time>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </section>


        {/* comment section */}
        <Comment postId={post._id} />
      </div>
    </article>
  );
}
