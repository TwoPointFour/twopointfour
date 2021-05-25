import { useRef, useState } from "react";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import InputNoValidation from "../UI/Input/InputNoValidation";
import CommentItem from "./CommentItem";
import styles from "./Comments.module.css";

const Comments = (props) => {
  const commentsRef = useRef();
  const commentList = Object.values(props.commentData).map((ele) => {
    return <CommentItem commentData={ele} />;
  });

  return (
    <div className={styles.comments}>
      <div className={styles["comment__input"]}>
        <Avatar
          url="https://static.scientificamerican.com/blogs/cache/file/7069F0BB-A9AB-4932-84F508BBC0136458_source.jpg?w=590&h=800&F754D658-CE37-41EE-BE2C0EFC7134D582"
          size="small"
        ></Avatar>
        <InputNoValidation
          ref={commentsRef}
          floatText="Write a comment..."
          name="comment"
          type="text"
        ></InputNoValidation>
        <Button className={styles["comment__send"]} color="yellow-fill" length="small">
          Send
        </Button>
      </div>
      {commentList}
    </div>
  );
};

export default Comments;
