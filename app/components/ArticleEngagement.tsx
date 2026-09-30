'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bookmark, MessageSquare, Send, Trash2 } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '../utils/supabase/client';

interface ArticleComment {
  id: string;
  user_id: string | null;
  article_slug: string;
  content: string;
  created_at: string;
}

interface ArticleEngagementProps {
  slug: string;
  title: string;
  excerpt: string;
}

export default function ArticleEngagement({
  slug,
  title,
  excerpt,
}: ArticleEngagementProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [bookmarkId, setBookmarkId] = useState<string | null>(null);
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    const load = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!mounted) return;
      setUser(currentUser);
      if (!currentUser) setBookmarkId(null);

      const commentsRequest = currentUser
        ? supabase
            .from('comments')
            .select('id, user_id, article_slug, content, created_at')
            .eq('article_slug', slug)
            .order('created_at', { ascending: false })
        : supabase
            .from('comments')
            .select('id, article_slug, content, created_at')
            .eq('article_slug', slug)
            .order('created_at', { ascending: false });

      const bookmarkRequest = currentUser
        ? supabase
            .from('bookmarks')
            .select('id')
            .eq('user_id', currentUser.id)
            .eq('article_slug', slug)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null });

      const [commentsResult, bookmarkResult] = await Promise.all([
        commentsRequest,
        bookmarkRequest,
      ]);

      if (!mounted) return;

      if (commentsResult.error || bookmarkResult.error) {
        setMessage('Article interactions need the bookmarks and comments migration applied in Supabase.');
      } else {
        setComments(
          (commentsResult.data ?? []).map((comment) => ({
            ...comment,
            user_id: 'user_id' in comment ? comment.user_id : null,
          })),
        );
        setBookmarkId(bookmarkResult.data?.id ?? null);
        setMessage('');
      }

      setIsLoading(false);
    };

    void load();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      window.setTimeout(() => void load(), 0);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [slug]);

  const toggleBookmark = async () => {
    if (!user) {
      router.push('/login?tab=signin');
      return;
    }

    setIsSaving(true);
    setMessage('');
    const supabase = createClient();

    if (bookmarkId) {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', bookmarkId);

      if (error) {
        setMessage('Could not remove this saved story. Please try again.');
      } else {
        setBookmarkId(null);
      }
    } else {
      const { data, error } = await supabase
        .from('bookmarks')
        .insert({
          user_id: user.id,
          article_slug: slug,
          article_title: title,
          article_url: `/articles/${slug}`,
          article_excerpt: excerpt,
        })
        .select('id')
        .single();

      if (error) {
        setMessage('Could not save this story. Apply the bookmarks migration, then try again.');
      } else {
        setBookmarkId(data.id);
      }
    }

    setIsSaving(false);
  };

  const submitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !commentText.trim()) return;

    setIsSaving(true);
    setMessage('');
    const supabase = createClient();
    const { data, error } = await supabase
      .from('comments')
      .insert({
        user_id: user.id,
        article_slug: slug,
        article_title: title,
        content: commentText.trim(),
      })
      .select('id, user_id, article_slug, content, created_at')
      .single();

    if (error) {
      setMessage('Could not post your comment. Apply the comments migration, then try again.');
    } else {
      setComments((current) => [data, ...current]);
      setCommentText('');
    }
    setIsSaving(false);
  };

  const deleteComment = async (commentId: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) {
      setMessage('Could not remove your comment. Please try again.');
    } else {
      setComments((current) => current.filter((comment) => comment.id !== commentId));
    }
  };

  return (
    <section aria-labelledby="conversation-heading" className="mx-auto max-w-3xl border-t border-[#d7d7cf] py-9">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#b24936]">Reader discussion</p>
          <h2 id="conversation-heading" className="mt-2 font-serif text-2xl">Join the conversation</h2>
        </div>
        <button
          aria-pressed={Boolean(bookmarkId)}
          className="inline-flex items-center gap-2 border border-[#596a6d]/30 px-4 py-2 text-sm font-semibold transition hover:border-[#b24936] hover:text-[#943b2c] disabled:opacity-60"
          disabled={isLoading || isSaving}
          onClick={toggleBookmark}
          type="button"
        >
          <Bookmark aria-hidden="true" fill={bookmarkId ? 'currentColor' : 'none'} size={16} />
          {bookmarkId ? 'Saved' : 'Save story'}
        </button>
      </div>

      {user ? (
        <form className="mt-6" onSubmit={submitComment}>
          <label className="sr-only" htmlFor={`comment-${slug}`}>Write a comment</label>
          <textarea
            className="min-h-28 w-full resize-y border border-[#c9ceca] bg-white p-3 text-sm outline-none focus:border-[#b24936] focus:ring-2 focus:ring-[#b24936]/20"
            id={`comment-${slug}`}
            maxLength={5000}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Share a thoughtful response"
            value={commentText}
          />
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="text-xs text-[#596a6d]">Comments are public.</span>
            <button
              className="inline-flex items-center gap-2 bg-[#b24936] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#943b2c] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSaving || !commentText.trim()}
              type="submit"
            >
              <Send aria-hidden="true" size={15} />
              Post comment
            </button>
          </div>
        </form>
      ) : (
        <p className="mt-5 text-sm text-[#596a6d]">
          <Link className="font-semibold text-[#943b2c] underline" href="/login?tab=signin">Sign in</Link>
          {' '}to save stories or join the discussion.
        </p>
      )}

      {message && <p aria-live="polite" className="mt-4 text-sm text-[#943b2c]" role="status">{message}</p>}

      <div className="mt-7 space-y-5">
        {isLoading ? (
          <p className="text-sm text-[#596a6d]">Loading discussion…</p>
        ) : comments.length ? comments.map((comment) => (
          <article className="border-b border-[#d7d7cf] pb-5" key={comment.id}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#596a6d]">Reader · {new Date(comment.created_at).toLocaleDateString()}</p>
              {user && comment.user_id === user.id && (
                <button
                  aria-label="Delete your comment"
                  className="inline-flex items-center gap-1 text-xs text-[#596a6d] transition hover:text-[#943b2c]"
                  onClick={() => void deleteComment(comment.id)}
                  type="button"
                >
                  <Trash2 aria-hidden="true" size={14} />
                  Delete
                </button>
              )}
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#283c42]">{comment.content}</p>
          </article>
        )) : (
          !message && <p className="text-sm text-[#596a6d]">No comments yet.</p>
        )}
        {!isLoading && comments.length === 0 && !message && (
          <p className="sr-only"><MessageSquare aria-hidden="true" /> Be the first to comment.</p>
        )}
      </div>
    </section>
  );
}