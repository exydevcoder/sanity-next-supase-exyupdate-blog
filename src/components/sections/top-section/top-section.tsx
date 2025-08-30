'use client';

import { usePostsByCategory } from '@/lib/queries/posts/getPostsByCategory';
import { PostCarousel } from '../../reuseable/post-carousel';
import ComponentTitle from '../../reuseable/component-title';
import SidebarContent from './SidebarContent';

export default function TopSection() {
  const { data: newsData, isLoading: newsLoading, error: newsError } = usePostsByCategory('news', 3);
  const { data: sportsData, isLoading: sportsLoading, error: sportsError } = usePostsByCategory('sports', 3);
  const { data: entertainmentData, isLoading: entertainmentLoading, error: entertainmentError } = usePostsByCategory('entertainment', 3);
  const { data: gossipsData, isLoading: gossipsLoading, error: gossipsError } = usePostsByCategory('gossips', 3);

  return (
    <section aria-labelledby="hot-articles-heading" className="container">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Latest news update Section */}
          <div className="space-y-4">
            <ComponentTitle title="Latest news update" />
            <div className="relative">
              <PostCarousel category="news" loading={newsLoading} error={!!newsError} posts={newsData?.posts} />
            </div>
          </div>

          {/* Latest sport news Section */}
          <div className="space-y-4">
            <ComponentTitle title="Latest sport news" />

            <div className="relative">
              <PostCarousel category="sports" loading={sportsLoading} error={!!sportsError} posts={sportsData?.posts} />
            </div>
          </div>

          {/* Entertainment Section */}
          <div className="space-y-4">
            <ComponentTitle title="Latest entertainment news" />

            <div className="relative">
              <PostCarousel category="entertainment" loading={entertainmentLoading} error={!!entertainmentError} posts={entertainmentData?.posts} />
            </div>
          </div>

          {/* Gossips Section */}
          <div className="space-y-4">
            <ComponentTitle title="Latest gossips update" />
            <div className="relative">
              <PostCarousel category="entertainment" loading={gossipsLoading} error={!!gossipsError} posts={gossipsData?.posts} />
            </div>
          </div>
        </div>

        <SidebarContent />
      </div>
    </section>
  );
}
