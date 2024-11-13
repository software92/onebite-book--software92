import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Metadata } from 'next';
import { Suspense } from 'react';

// export const dynamic = 'error';

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_SERVER_URL + `/book/search?q=${q}`,
    { cache: 'force-cache' }
  );

  if (!response.ok) return <div>찾을 수 없습니다...</div>;

  const searchBooks: BookData[] = await response.json();

  return (
    <div>
      {searchBooks.map(book => (
        <BookItem
          key={book.id}
          {...book}
        />
      ))}
    </div>
  );
}

// 동적인 값으로 메타데이터 설정(검색과 같은 페이지)
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;

  return {
    title: `${q}: onebite books`,
    description: `${q}의 검색 결과입니다`,
    openGraph: {
      title: `${q}: onebite books`,
      description: `${q}의 검색 결과입니다`,
      images: ['/thumbnail.png'],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;

  return (
    <Suspense
      key={q || ''}
      fallback={<div>Loading...</div>}
    >
      <SearchResult q={q || ''} />
    </Suspense>
  );
}
