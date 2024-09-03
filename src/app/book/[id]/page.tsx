import { BookData } from '@/types';
import style from './page.module.css';
import { notFound } from 'next/navigation';

// export const dynamicParams = false;
export const generateStaticParams = () => {
  return [{ id: '1' }, { id: '2' }];
};

export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`
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
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
