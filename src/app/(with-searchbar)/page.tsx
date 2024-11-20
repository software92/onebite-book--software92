import BookItem from '@/components/book-item';
import style from './page.module.css';
import { BookData } from '@/types';
// import { Suspense } from 'react';
// import BookListSkelton from '@/components/skelton/book-list-skelton';
import { Metadata } from 'next';

// export const dynamic = 'force-dynamic';

const AllBooks = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_SERVER_URL + `/book`,
    // { cache: 'no-store' }
    { cache: 'force-cache' }
  );
  if (!response.ok) return <div>오류가 나타났습니다...</div>;
  const allBooks: BookData[] = await response.json();

  return allBooks.map(book => (
    <BookItem
      key={book.id}
      {...book}
    />
  ));
};
const RecoBooks = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_SERVER_URL + `/book/random`,
    // { cache: 'force-cache' }
    { next: { revalidate: 3 } }
  );
  if (!response.ok) return <div>오류가 나타났습니다...</div>;
  const recoBooks: BookData[] = await response.json();

  return recoBooks.map(book => (
    <BookItem
      key={book.id}
      {...book}
    />
  ));
};

// 해당 페이지의 메타 데이터로 설정된다
export const metadata: Metadata = {
  title: 'onebite books',
  description: 'onebite books의 등록된 도서를 만나보세요',
  openGraph: {
    title: 'onebite books',
    description: 'onebite books의 등록된 도서를 만나보세요',
    // 이미지 파일을 입력할 경우 /public 디렉터리에서 찾는다
    images: ['/thumbnail.png'],
  },
};
// 코드 가독성을 위해 fetching data에 따라 컴포넌트 분리
export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>등록된 모든 도서</h3>
        {/* <Suspense fallback={<BookListSkelton cnt={3} />}> */}
        <RecoBooks />
        {/* </Suspense> */}
      </section>
      <section>
        <h3>지금 추천하는 도서</h3>
        {/* <Suspense fallback={<BookListSkelton cnt={10} />}> */}
        <AllBooks />
        {/* </Suspense> */}
      </section>
    </div>
  );
}
