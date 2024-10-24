'use client';

import style from './review-editor.module.css';
import createReviewAction from '@/actions/create-review.action';
import { useActionState, useEffect } from 'react';

export default function ReviewEditor({ bookId }: { bookId: string }) {
  // useActionState(actionFunction, [init value])
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  // 서버 액션 에러 핸들링
  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form
        action={formAction}
        className={style.form_container}
      >
        <input
          name='bookId'
          value={bookId}
          hidden
        />
        <textarea
          required
          disabled={isPending}
          name='content'
          placeholder='리뷰 내용'
        />
        <div className={style.submit_container}>
          <input
            required
            disabled={isPending}
            name='author'
            placeholder='작성자'
          />
          <button
            disabled={isPending}
            type='submit'
          >
            {isPending ? '...' : '작성하기'}
          </button>
        </div>
      </form>
    </section>
  );
}
