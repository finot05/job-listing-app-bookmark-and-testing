'use client';

import React, { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useSession } from 'next-auth/react';
import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from '@/services/apiServices';
import { toast } from 'react-toastify';

type Props = {
  eventId: string;
  initialBookmarked: boolean;
  onToggle?: (eventId: string, isBookmarkedNow: boolean) => void;
};

const BookmarkButton = ({ eventId, initialBookmarked, onToggle }: Props) => {
  const { data: session, status } = useSession();
  const accessToken = session?.user?.accessToken;

  const isLoggedIn = status === 'authenticated' && !!accessToken;
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error('You must be logged in to bookmark.');
      return;
    }

    const prev = isBookmarked;
    const next = !prev;
    setIsBookmarked(next); // Optimistic

    try {
  if (prev) {
    await removeBookmark({ eventId }).unwrap();
    toast.success('Bookmark removed.');
  } else {
    await addBookmark({ eventId }).unwrap();
    toast.success('Bookmark added.');
  }

  if (onToggle) {
    onToggle(eventId, next);
  }
} catch (err: any) {
  let status: number | undefined = err?.status || err?.originalStatus;
  let message: string | undefined = 
    err?.data?.message ||
    err?.data?.error ||
    err?.error ||
    err?.message ||
    'Something went wrong';

  if (!status && typeof err === 'string') {
    try {
      const parsed = JSON.parse(err);
      status = parsed.status;
      message = parsed?.data?.message || parsed?.error || message;
    } catch {}
  }

  if (status === 409) {
    // Keep optimistic update as is — no revert
    toast.info(message || 'Already bookmarked.');
  } else {
    // Revert optimistic update for other errors
    setIsBookmarked(prev);

    if (status === 401) {
      toast.error('Please log in to bookmark.');
    } else {
      toast.error(message || 'Failed to update bookmark.');
    }
  }

  // Log errors except 409 (optional)
  if (status !== 409) {
    console.error('Bookmark error:', err);
    try {
      console.error('Bookmark error (stringified):', JSON.stringify(err));
    } catch {
      console.error('Bookmark error could not be stringified.');
    }
  }
}



};
  return (
    <button
  onClick={handleBookmarkClick}
  aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
  data-testid="bookmark-button"
  data-bookmarked={isBookmarked}
  className={`absolute top-4 right-4 transition z-10 p-1 ${
    isBookmarked
      ? 'text-blue-900'
      : 'text-gray-800 border-blue-900 hover:text-blue-600 hover:border-blue-600 bg-white'
  }`}
>

      {isBookmarked ? <BookmarkCheck size={22} /> : <Bookmark size={22} />}
    </button>
  );
};

export default BookmarkButton;
