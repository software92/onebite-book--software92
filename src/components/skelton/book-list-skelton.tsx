import BookItemSkelton from './book-item-skelton';

export default function BookListSkelton({ cnt }: { cnt: number }) {
  return new Array(cnt)
    .fill(0)
    .map((_, idx) => <BookItemSkelton key={`book-item-skelton-${idx}`} />);
}
