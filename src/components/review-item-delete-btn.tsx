'use client';
import { deleteReviewAction } from '@/actions/delete-review.action';
import { useActionState, useEffect, useRef } from 'react';

export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
    >
      <input
        name='reviewId'
        value={reviewId}
        hidden
      />
      <input
        name='bookId'
        value={bookId}
        hidden
      />
      {/* submit(): 유효성검사 이벤트ㅡ핸들러를 무시하고 강제 제출
                  requestSubmit(): 사용자가 버튼을 클릭한것처럼 동작(안전)
                   */}
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
}
