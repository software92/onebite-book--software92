import { BookData, ReviewData } from '@/types';
import style from './page.module.css';
import { notFound } from 'next/navigation';
import ReviewItem from '@/components/review-item';
import ReviewEditor from '@/components/reveiw-editor';
import Image from 'next/image';

// export const dynamicParams = false;
export const generateStaticParams = () => {
  return [{ id: '1' }, { id: '2' }];
};

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>찾을 수 없는 책입니다..</div>;
  }
  const data: BookData = await response.json();

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    data;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        {/* <img src={coverImgUrl} /> */}
        <Image
          src={coverImgUrl}
          width={240}
          height={300}
          alt={`도서 ${title}의 표지 이미지`}
        />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_SERVER_URL + `/review/book/${bookId}`,
    // 태그를 사용해 캐시 초기화 및 재검증
    { next: { tags: [`review-${bookId}`] } }
  );

  // 에러 핸들링(error.tsx)으로 에러 처리하기 때문에 해당 조건문에서는 에러만 던져줌
  if (!response.ok) {
    throw new Error(`Review fetch failed: ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map(review => (
        <ReviewItem
          key={`review-item-${review.id}`}
          {...review}
        />
      ))}
    </section>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <BookDetail bookId={params.id} />
      <ReviewEditor bookId={params.id} />
      <ReviewList bookId={params.id} />
    </div>
  );
}
