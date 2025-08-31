'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { LogIn, Menu } from 'lucide-react';
import type { GetTopLevelCategoriesResponse } from '@/types/category';
import { useDialog } from '@/store/dialogs-store';
import { useAuth } from '@/hooks/useAuth';

interface MobileMenuProps {
  parentCategories?: GetTopLevelCategoriesResponse;
}

export function MobileMenu({ parentCategories = [] }: MobileMenuProps) {
  const { onOpen } = useDialog();
  const { isAuthenticated } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open navigation menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="px-4 py-4">
          <SheetTitle className="font-bold text-2xl">ExyUpdate</SheetTitle>
        </SheetHeader>

        <Separator />
        <nav className="grid gap-1 p-2">
          <Link href="/" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
            Home
          </Link>

          {parentCategories.map(category => (
            <Link
              key={category._id}
              href={`/category/${category.slug}`}
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
            >
              {category.title}
            </Link>
          ))}
        </nav>
        {!isAuthenticated && (
          <>
            <Separator />
            <div className="p-2">
              {/* toggle auth modal */}
              <Button className="w-full gap-2" onClick={() => onOpen('auth')}>
                <LogIn className="h-4 w-4" />
                {'Sign in'}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
