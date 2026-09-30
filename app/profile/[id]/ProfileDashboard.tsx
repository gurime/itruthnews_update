'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bookmark, MessageSquare, Save, Star, Trash2, UserRound } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { createClient } from '../../utils/supabase/client';

interface ProfileRecord {
  full_name: string | null;
  email: string | null;
  role: string;
  subscription_status: string;
}

interface BookmarkRecord {
  id: string;
  article_slug: string;
  article_title: string;
  article_url: string;
  article_excerpt: string | null;
  created_at: string;
}

interface CommentRecord {
  id: string;
  user_id: string;
  article_slug: string;
  article_title: string;
  content: string;
  created_at: string;
}

type ProfileTab = 'account' | 'saved' | 'comments';

export default function ProfileDashboard({ profileId }: { profileId: string }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileRecord | null>(null);
  const [fullName, setFullName] = useState('');
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);
  const [comments, setComments] = useState<CommentRecord[]>([]);
  const [activeTab, setActiveTab] = useState<ProfileTab>('account');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [bookmarkError, setBookmarkError] = useState('');
  const [commentError, setCommentError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    const load = async () => {
      try {
        const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();
        if (!mounted) return;
        if (authError || !currentUser) {
          router.replace('/login?tab=signin');
          return;
        }

        setUser(currentUser);
        if (currentUser.id !== profileId) {
          setLoadError('This profile is only available to its owner.');
          return;
        }

        const [profileResult, bookmarksResult, commentsResult] = await Promise.all([
          supabase
            .from('profiles')
            .select('full_name, email, role, subscription_status')
            .eq('id', currentUser.id)
            .maybeSingle(),
          supabase
            .from('bookmarks')
            .select('id, article_slug, article_title, article_url, article_excerpt, created_at')
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false }),
          supabase
            .from('comments')
            .select('id, user_id, article_slug, article_title, content, created_at')
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false }),
        ]);

        if (!mounted) return;

        if (profileResult.error || !profileResult.data) {
          setLoadError('Could not load your profile. Check that the profiles migration has been applied.');
        } else {
          setProfile(profileResult.data);
          setFullName(profileResult.data.full_name ?? '');
        }

        if (bookmarksResult.error) {
          setBookmarkError('Saved stories are not set up yet. Apply the bookmarks and comments migration in Supabase.');
        } else {
          setBookmarks(bookmarksResult.data ?? []);
        }

        if (commentsResult.error) {
          setCommentError('Comment history is not set up yet. Apply the bookmarks and comments migration in Supabase.');
        } else {
          setComments(commentsResult.data ?? []);
        }
      } catch {
        if (mounted) setLoadError('Could not connect to your account. Please try again.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    void load();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/login?tab=signin');
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [profileId, router]);

  const saveProfile = async () => {
    if (!user) return;
    setIsSaving(true);
    setMessage('');
    const supabase = createClient();
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName.trim() })
      .eq('id', user.id);

    setMessage(error ? 'Could not save your name. Please try again.' : 'Profile updated.');
    if (!error && profile) setProfile({ ...profile, full_name: fullName.trim() });
    setIsSaving(false);
  };

  const removeBookmark = async (bookmarkId: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('bookmarks').delete().eq('id', bookmarkId);
    if (error) {
      setMessage('Could not remove the saved story. Please try again.');
    } else {
      setBookmarks((current) => current.filter((bookmark) => bookmark.id !== bookmarkId));
    }
  };

  const removeComment = async (commentId: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('comments').delete().eq('id', commentId);
    if (error) {
      setMessage('Could not remove your comment. Please try again.');
    } else {
      setComments((current) => current.filter((comment) => comment.id !== commentId));
    }
  };

  const subscriptionStatus = profile?.subscription_status || 'free';
  const isPremium = subscriptionStatus !== 'free';
  const subscriptionLabel = isPremium ? 'iTruth Premium' : 'iTruth Free';

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex-1 bg-[#f6f5f0] px-5 py-10 text-[#182d35] sm:px-8 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <header className="flex flex-wrap items-end justify-between gap-5 border-b border-[#d7d7cf] pb-7">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#b24936]">Reader account</p>
              <h1 className="mt-2 font-serif text-3xl sm:text-4xl">Your reading desk</h1>
              <p className="mt-2 text-sm text-[#596a6d]">Your account, saved stories, and discussion history.</p>
            </div>
            {profile && (
              <div className="inline-flex items-center gap-2 border border-[#c9ceca] bg-white px-4 py-2 text-sm font-semibold">
                {isPremium ? <Star aria-hidden="true" className="text-[#b24936]" size={16} /> : <UserRound aria-hidden="true" size={16} />}
                {subscriptionLabel}
              </div>
            )}
          </header>

          {isLoading ? (
            <p className="py-12 text-sm text-[#596a6d]">Loading your account…</p>
          ) : loadError ? (
            <p className="mt-8 border-l-2 border-[#b24936] bg-white px-4 py-3 text-sm" role="alert">{loadError}</p>
          ) : (
            <>
              <nav aria-label="Profile sections" className="flex gap-1 overflow-x-auto border-b border-[#d7d7cf] pt-6">
                {([
                  ['account', 'Account', UserRound],
                  ['saved', 'Saved stories', Bookmark],
                  ['comments', 'Comments', MessageSquare],
                ] as const).map(([tab, label, Icon]) => (
                  <button
                    aria-current={activeTab === tab ? 'page' : undefined}
                    className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${activeTab === tab ? 'border-[#b24936] text-[#943b2c]' : 'border-transparent text-[#596a6d] hover:text-[#182d35]'}`}
                    key={tab}
                    onClick={() => { setActiveTab(tab); setMessage(''); }}
                    type="button"
                  >
                    <Icon aria-hidden="true" size={16} />
                    {label}
                  </button>
                ))}
              </nav>

              {message && <p aria-live="polite" className="mt-5 text-sm text-[#596a6d]" role="status">{message}</p>}

              {activeTab === 'account' && (
                <section aria-labelledby="account-heading" className="max-w-2xl py-8">
                  <h2 className="font-serif text-2xl" id="account-heading">Account details</h2>
                  <div className="mt-6 space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-semibold" htmlFor="profile-name">Full name</label>
                      <input
                        autoComplete="name"
                        className="w-full border border-[#c9ceca] bg-white px-3 py-3 text-sm outline-none focus:border-[#b24936] focus:ring-2 focus:ring-[#b24936]/20"
                        id="profile-name"
                        maxLength={120}
                        onChange={(event) => setFullName(event.target.value)}
                        value={fullName}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold" htmlFor="profile-email">Email address</label>
                      <input
                        className="w-full border border-[#d7d7cf] bg-[#eeede7] px-3 py-3 text-sm text-[#596a6d]"
                        id="profile-email"
                        readOnly
                        value={profile?.email || user?.email || ''}
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[#d7d7cf] py-5">
                      <div>
                        <p className="text-sm font-semibold">Membership</p>
                        <p className="mt-1 text-sm text-[#596a6d]">{subscriptionLabel} · {subscriptionStatus.replaceAll('_', ' ')}</p>
                      </div>
                      <Link className="text-sm font-semibold text-[#943b2c] underline" href="/membership">Membership details</Link>
                    </div>
                    <button
                      className="inline-flex items-center gap-2 bg-[#b24936] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#943b2c] disabled:opacity-60"
                      disabled={isSaving}
                      onClick={() => void saveProfile()}
                      type="button"
                    >
                      <Save aria-hidden="true" size={16} />
                      {isSaving ? 'Saving…' : 'Save changes'}
                    </button>
                    {profile?.role === 'admin' && <Link className="ml-4 text-sm font-semibold text-[#943b2c] underline" href="/admin">Admin tools</Link>}
                  </div>
                </section>
              )}

              {activeTab === 'saved' && (
                <section aria-labelledby="saved-heading" className="py-8">
                  <h2 className="font-serif text-2xl" id="saved-heading">Saved stories</h2>
                  {bookmarkError ? (
                    <p className="mt-5 border-l-2 border-[#b24936] bg-white px-4 py-3 text-sm" role="alert">{bookmarkError}</p>
                  ) : bookmarks.length ? (
                    <ul className="mt-5 divide-y divide-[#d7d7cf] border-y border-[#d7d7cf]">
                      {bookmarks.map((bookmark) => (
                        <li className="flex items-start justify-between gap-4 py-5" key={bookmark.id}>
                          <div className="min-w-0">
                            <Link className="font-serif text-lg leading-snug hover:text-[#943b2c]" href={bookmark.article_url}>{bookmark.article_title}</Link>
                            {bookmark.article_excerpt && <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#596a6d]">{bookmark.article_excerpt}</p>}
                            <p className="mt-2 text-xs text-[#596a6d]">Saved {new Date(bookmark.created_at).toLocaleDateString()}</p>
                          </div>
                          <button
                            aria-label={`Remove ${bookmark.article_title} from saved stories`}
                            className="shrink-0 p-2 text-[#596a6d] transition hover:text-[#943b2c]"
                            onClick={() => void removeBookmark(bookmark.id)}
                            type="button"
                          >
                            <Trash2 aria-hidden="true" size={17} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-5 text-sm text-[#596a6d]">Stories you save from an article will appear here.</p>
                  )}
                </section>
              )}

              {activeTab === 'comments' && (
                <section aria-labelledby="comments-heading" className="py-8">
                  <h2 className="font-serif text-2xl" id="comments-heading">Your comments</h2>
                  {commentError ? (
                    <p className="mt-5 border-l-2 border-[#b24936] bg-white px-4 py-3 text-sm" role="alert">{commentError}</p>
                  ) : comments.length ? (
                    <ul className="mt-5 divide-y divide-[#d7d7cf] border-y border-[#d7d7cf]">
                      {comments.map((comment) => (
                        <li className="py-5" key={comment.id}>
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0">
                              <Link className="font-serif text-lg hover:text-[#943b2c]" href={`/articles/${comment.article_slug}`}>{comment.article_title}</Link>
                              <p className="mt-1 text-xs text-[#596a6d]">Posted {new Date(comment.created_at).toLocaleDateString()}</p>
                            </div>
                            <button
                              aria-label="Delete your comment"
                              className="shrink-0 p-2 text-[#596a6d] transition hover:text-[#943b2c]"
                              onClick={() => void removeComment(comment.id)}
                              type="button"
                            >
                              <Trash2 aria-hidden="true" size={17} />
                            </button>
                          </div>
                          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#283c42]">{comment.content}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-5 text-sm text-[#596a6d]">Comments you post on stories will appear here.</p>
                  )}
                </section>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}