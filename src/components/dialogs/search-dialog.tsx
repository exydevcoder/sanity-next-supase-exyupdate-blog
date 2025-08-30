'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Clock, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useDialog } from '@/store/dialogs-store';
import { useDebounce } from '@/hooks/useDebounce';
import { client } from '@/lib/sanityClient';
import { Button } from '@/components/ui/button';

const inputClass =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ' +
  'ring-offset-background placeholder:text-muted-foreground ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' +
  'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

interface SearchResult {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  featuredImage?: {
    url: string;
    alt?: string;
  };
  author: {
    name: string;
    slug: string;
  };
  categories: Array<{
    title: string;
    slug: string;
  }>;
}

export function SearchDialog() {
  const { isOpen, type, onClose } = useDialog();
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  // Load recent searches from localStorage
  React.useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save recent searches to localStorage
  const saveToRecentSearches = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    const updatedSearches = [
      searchTerm,
      ...recentSearches.filter(item => item !== searchTerm)
    ].slice(0, 5); // Keep only 5 most recent searches
    
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  // Search function
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // Use a simpler query approach to avoid TypeScript issues
      const data = await client.fetch(`
        *[_type == "post" && defined(publishedAt) && 
          (title match $searchQuery || excerpt match $searchQuery || 
           body[].children[].text match $searchQuery)] | order(publishedAt desc) [0...10] {
          _id,
          title,
          "slug": slug.current,
          publishedAt,
          excerpt,
          "featuredImage": {
            "url": featuredImage.asset->url,
            "alt": featuredImage.alt
          },
          author->{
            name,
            "slug": slug.current
          },
          categories[]->{
            title,
            "slug": slug.current
          }
        }
      `, { searchQuery: `${searchQuery}*` });
      
      setResults(data || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  // Debounced search effect
  React.useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveToRecentSearches(query.trim());
      performSearch(query.trim());
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    setResults([]);
  };

  const handleRecentSearchClick = (searchTerm: string) => {
    setQuery(searchTerm);
    saveToRecentSearches(searchTerm);
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  if (type !== 'search') return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 sm:max-w-2xl">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <DialogDescription>{'Search posts, topics, and tags.'}</DialogDescription>
        </DialogHeader>

        <div className="px-4 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              placeholder="Search articles, topics, tags..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className={`pl-9 pr-10 ${inputClass}`}
              aria-label="Search query"
            />
            {query && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>

        <ScrollArea className="max-h-[400px] px-4 pb-4">
          {isLoading && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Search Results</h3>
              {results.map((post) => (
                <Link
                  key={post._id}
                  href={`/posts/${post.slug}`}
                  onClick={onClose}
                  className="block rounded-lg border p-3 transition-colors hover:bg-accent"
                >
                  <h4 className="font-medium">{post.title}</h4>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.author.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isLoading && query && results.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No results found for "{query}"
            </div>
          )}

          {!isLoading && !query && recentSearches.length > 0 && (
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Recent searches</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearRecentSearches}
                  className="h-6 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              </div>
              <div className="grid gap-2">
                {recentSearches.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(item)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-accent"
                  >
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{item}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isLoading && !query && recentSearches.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              Start typing to search for articles...
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}