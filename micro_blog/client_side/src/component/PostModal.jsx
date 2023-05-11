import { useRef, useState } from "react";
import useSendPost from "../hooks/useSendPost";
import StyledPostModal, {
  PostModalForm,
  PostModalHeader,
} from "../styled/PostModal.styled";

const PostModal = ({ setModal }) => {
  const [value, setValue] = useState({ post: "" });
  const backgroundRef = useRef();
  const { mutate: sendPost } = useSendPost();

  return (
    <StyledPostModal
      ref={backgroundRef}
      onClick={(e) => {
        if (e.target === backgroundRef.current) setModal(false);
      }}
    >
      <PostModalForm
        onSubmit={(e) => {
          e.preventDefault();
          const postText = value.post;
          if (postText.length > 0) {
            // send post to api
            sendPost({ post: postText });
          }
          setValue({ post: "" });
          setModal(false);
        }}
      >
        <PostModalHeader>
          <h1>New Post</h1>
        </PostModalHeader>
        <textarea
          name="post"
          value={value.post}
          onChange={(e) => setValue({ [e.target.name]: e.target.value })}
          maxLength="255"
        />
        <sub>Characters Left: {255 - value.post.length}</sub>
        <button type="submit">
          <p>Submit New Post</p>
        </button>
      </PostModalForm>
    </StyledPostModal>
  );
};

export default PostModal;
