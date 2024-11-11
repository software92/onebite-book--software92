import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({
  children,
  sidebar,
  feed,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  feed: ReactNode;
}) {
  return (
    <div>
      <div>
        <Link href='/parallel'>parallel</Link>
        &nbsp;
        <Link href='/parallel/settings'>parallel/settings</Link>
      </div>
      <br />
      {children}
      {sidebar}
      {feed}
    </div>
  );
}
