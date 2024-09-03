import { ReactNode, Suspense } from 'react';
import Searchbar from '../../components/searchbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* <div>{new Date().toLocaleString()}</div> */}
      {/* 사전 렌더링하지 않고 클라이언트에서만 렌더링 */}
      {/* suspense: 사전 렌더링에서 배제, fallback UI 대체. children 컴포넌트의 비동기 작업을(querstring...) 완료하기 전까지(클라이언트에서 렌더링) */}
      <Suspense fallback={<div>loading....</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
