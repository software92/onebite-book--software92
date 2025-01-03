import { ReviewData } from '@/types';
import style from './review-item.module.css';
import ReviewItemDeleteButton from './review-item-delete-btn';

export default async function ReviewItem({
  id,
  createdAt,
  content,
  author,
  bookId,
}: ReviewData) {
  return (
    <div className={style.container}>
      <div className={style.author}>{author}</div>
      <div className={style.content}>{content}</div>
      <div className={style.bottom_container}>
        <div className={style.date}>{new Date(createdAt).toLocaleString()}</div>
        {/* client component */}
        <ReviewItemDeleteButton
          reviewId={id}
          bookId={bookId}
        />
      </div>
    </div>
  );
}
