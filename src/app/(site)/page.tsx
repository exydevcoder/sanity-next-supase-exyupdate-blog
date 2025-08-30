import LatestPostsSection from '@/components/sections/latest-posts';
import TopSection from '@/components/sections/top-section/top-section';

export default async function Home() {
  return (
    <div>
      <TopSection />
      <LatestPostsSection />
    </div>
  );
}
