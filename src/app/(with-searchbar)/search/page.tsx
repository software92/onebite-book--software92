import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import { Metadata } from 'next';
import { Suspense } from 'react';

// export const dynamic = 'error';

async function SearchResult({ q }: { q: string }) {
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

type Props = {
  searchParams: {
    q?: string;
  };
};

// 동적인 값으로 메타데이터 설정(검색과 같은 페이지)
export function generateMetadata({ searchParams }: Props): Metadata {
  // const { q } = await searchParams;

  return {
    title: `${searchParams.q}: onebite books`,
    description: `${searchParams.q}의 검색 결과입니다`,
    openGraph: {
      title: `${searchParams.q}: onebite books`,
      description: `${searchParams.q}의 검색 결과입니다`,
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
