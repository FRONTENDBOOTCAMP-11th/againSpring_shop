import { useState } from "react";
import PropTypes from "prop-types";
import useAxiosInstance from "@hooks/useAxiosInstance";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CommentListItem = ({ comment, isAdmin, user, post }) => {
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const MySwal = withReactContent(Swal);

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const updateComment = useMutation({
    mutationFn: ({ commentId, content }) =>
      axios.patch(`/posts/${post._id}/replies/${commentId}`, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", post._id]);
      setIsEditing(false);
      MySwal.fire({
        title: "수정 완료",
        text: "댓글이 수정되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      });
    },
  });

  const deleteComment = useMutation({
    mutationFn: (comment) =>
      axios.delete(`/posts/${post._id}/replies/${comment._id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", post._id]);
      MySwal.fire({
        title: "삭제 완료",
        text: "댓글이 삭제되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      });
    },
  });

  const handleEditStart = () => {
    setIsEditing(true);
    setEditContent(comment.content);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const handleDelete = async (comment) => {
    const result = await MySwal.fire({
      title: "댓글을 삭제하시겠습니까?",
      text: "삭제된 댓글은 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      deleteComment.mutate(comment);
    }
  };

  return (
    <div className='py-8 border-b border-grey-10'>
      <div className='flex items-center'>
        <span className='text-2xl font-medium mr-3'>{comment?.user?.name}</span>
        <span className='text-2xl font-normal'>{comment.createdAt}</span>
      </div>
      {isEditing ? (
        <div className='mt-4 p-6'>
          <textarea
            className='w-full min-h-[80px] resize-y border border-grey-30 p-2 rounded text-2xl'
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div className='flex gap-2 mt-2 justify-end'>
            <button
              type='button'
              className='rounded-lg px-6 py-2 bg-secondary-20 text-white text-2xl cursor-pointer'
              onClick={() =>
                updateComment.mutate({
                  commentId: comment._id,
                  content: editContent,
                })
              }
            >
              수정완료
            </button>
            <button
              type='button'
              className='rounded-lg bg-grey-20 text-white px-6 py-2 text-2xl'
              onClick={handleEditCancel}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className='text-xl text-grey-80 mt-4 pl-3'>{comment.content}</p>
          {(isAdmin || user?._id === comment?.user?._id) && (
            <div className='flex mt-4'>
              <button onClick={() => handleEditStart(comment)}>수정</button>
              <button onClick={() => handleDelete(comment)}>삭제</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentListItem;

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    content: PropTypes.string.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
    }),
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
  }),
  post: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};
