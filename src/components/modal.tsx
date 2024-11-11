'use client';

import { ReactNode, useEffect, useRef } from 'react';
import style from './modal.module.css';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  // dialog를 단독으로 사용하면 해당 요소는 페이지 컴포넌트의 하위 요소로 렌더링
  // createPortal을 사용하면 페이지 전체를 덮는 형태로 사용 가능
  return createPortal(
    <dialog
      className={style.modal}
      ref={dialogRef}
      onClose={() => router.back()}
      onClick={e => {
        //  modal 배경 클릭 -> 뒤로가기
        if ((e.target as any).nodeName === 'DIALOG') {
          router.back();
        }
      }}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement
  );
}
