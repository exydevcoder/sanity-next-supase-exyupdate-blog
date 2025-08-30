'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export type BlogCardProps = {
  title?: string;
  href?: string;
  imageUrl?: string;
  category?: string;
  categorySlug?: string;
  date?: string;
  readingTime?: string;
  excerpt?: string;
  authorName?: string;
  imageClassName?: string;
};

export function BlogCard({
  title = 'Understanding Server Components in Next.js',
  href = '/posts/understanding-server-components',
  imageUrl = '/featured-blog-cover.png',
  category = '',
  categorySlug = '',
  date = 'Aug 1, 2025',
  readingTime = '6 min read',
  excerpt = 'A practical overview of Server Components, how they work, and when to use them.',
  authorName = '',
  imageClassName = 'h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]'
}: BlogCardProps) {
  const router = useRouter();

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    router.push(`/categories/${categorySlug}`);
  };

  return (
    <Card className="group overflow-hidden border bg-background p-0 pb-6">
      <Link href={href} className="block focus:outline-none">
        <div className="relative">
          {/* Use an img to avoid Image config; fully responsive */}
          <Image src={imageUrl} alt={title} width={400} height={192} className={`${imageClassName}`} priority={false} />
        </div>
      </Link>

      <CardContent className="p-4 space-y-3 py-0">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <Link href={`/category/${categorySlug}`}>
            <Badge variant="secondary" onClick={handleCategoryClick}>
              {category}
            </Badge>
          </Link>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {date}
          </span>
        </div>
        <Link href={href} className="block focus:outline-none space-y-3">
          <h3 className="line-clamp-2 text-base font-semibold leading-snug">{title}</h3>
          {excerpt ? <p className="line-clamp-2 text-sm text-muted-foreground">{excerpt}</p> : null}
          <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
            {authorName && (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {authorName}
                </span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-foreground">
                Read <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {readingTime}
              </span>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
