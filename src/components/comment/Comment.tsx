'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { Send, Trash2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useComments } from '@/hooks/useComments';
import { useAuth } from '@/hooks/useAuth';
import { UserAvatar } from '@/components/reuseable/UserAvatar';

interface CommentProps {
  postId: string;
}

type SortOrder = 'latest' | 'oldest';

export default function Comment({ postId }: CommentProps) {
  const { user, isAuthenticated } = useAuth();
  const { comments, isLoading, addComment, deleteComment, isAddingComment } = useComments(postId);
  const [newComment, setNewComment] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');

  // Sort comments based on selected order
  const sortedComments = React.useMemo(() => {
    if (!comments || comments.length === 0) return [];
    
    const sorted = [...comments].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
    });
    
    return sorted;
  }, [comments, sortOrder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addComment(newComment);
    setNewComment('');
  };

  const handleDelete = (commentId: string) => {
    if (confirm('Delete this comment?')) {
      deleteComment(commentId);
    }
  };

  return (
    <section className="mt-16 border-t pt-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
        </div>
        
        {/* Sort Dropdown */}
        {comments.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 hidden sm:inline">Sort by:</span>
            <Select value={sortOrder} onValueChange={(value: SortOrder) => setSortOrder(value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Add Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div className="flex items-start gap-3">
            <UserAvatar 
              fullName={user?.user_metadata?.full_name} 
              avatarUrl={user?.user_metadata?.avatar_url} 
              size="sm" 
            />
            <div className="flex-1">
              <Textarea 
                placeholder="Write a comment..." 
                value={newComment} 
                onChange={e => setNewComment(e.target.value)} 
                className="min-h-[100px] resize-none" 
              />
              <div className="flex justify-end mt-2">
                <Button 
                  type="submit" 
                  disabled={!newComment.trim() || isAddingComment} 
                  size="sm" 
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isAddingComment ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">Please sign in to leave a comment</p>
        </div>
      )}

      {/* Comments List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse flex gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedComments.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedComments.map(comment => (
            <div key={comment.id} className="flex gap-3">
              <UserAvatar 
                fullName={comment.full_name} 
                avatarUrl={comment.avatar_url} 
                size="sm" 
              />
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {comment.full_name || 'Anonymous'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {format(new Date(comment.created_at), 'MMM d, yyyy • h:mm a')}
                      </span>
                    </div>
                    {user?.id === comment.user_id && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(comment.id)} 
                        className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}