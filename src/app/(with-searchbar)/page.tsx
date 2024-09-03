import BookItem from '@/components/book-item';
import style from './page.module.css';
import { BookData } from '@/types';

const AllBooks = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_SERVER_URL + `/book`,
    // { cache: 'no-store' }
    { cache: 'force-cache' }
  );
  if (!response.ok) return <div>오류가 나타났습니다...</div>;
  const allBooks: BookData[] = await response.json();

  return (
    <section>
      <h3>등록된 모든 도서</h3>
      {allBooks.map(book => (
        <BookItem
          key={book.id}
          {...book}
        />
      ))}
    </section>
  );
};
const RecoBooks = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_SERVER_URL + `/book/random`,
    // { cache: 'force-cache' }
    { next: { revalidate: 3 } }
  );
  if (!response.ok) return <div>오류가 나타났습니다...</div>;
  const recoBooks: BookData[] = await response.json();

  return (
    <section>
      <h3>지금 추천하는 도서</h3>
      {recoBooks.map(book => (
        <BookItem
          key={book.id}
          {...book}
        />
      ))}
    </section>
  );
};
// 코드 가독성을 위해 fetching data에 따라 컴포넌트 분리
export default function Home() {
  return (
    <div className={style.container}>
      <RecoBooks />
      <AllBooks />
    </div>
  );
}
