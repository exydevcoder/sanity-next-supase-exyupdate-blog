import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { getParentCategories } from '@/lib/queries/categories/categories';
import { MobileMenu } from './MobileMenu';
import RightNavButton from './right-button';

export default async function SiteNavbar() {
  const parentCategories = await getParentCategories();

  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6">
        {/* Mobile: Menu */}
        <div className="flex items-center lg:hidden">
          <MobileMenu parentCategories={parentCategories} />
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
          <span className="font-bold text-2xl">ExyUpdate</span>
        </Link>

        {/* Desktop: Centered Nav */}
        <div className="hidden flex-1 justify-center lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="group inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {parentCategories.map(category => (
                <NavigationMenuItem key={category._id}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/category/${category.slug}`}
                      className="group inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                    >
                      {category.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <RightNavButton />
      </div>
    </header>
  );
}
