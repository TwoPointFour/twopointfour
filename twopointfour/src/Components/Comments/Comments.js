import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendCommunityComment, sendPrivateComment } from "../../store/mainSlice";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import InputNoValidation from "../UI/Input/InputNoValidation";
import CommentItem from "./CommentItem";
import styles from "./Comments.module.css";

const Comments = (props) => {
  const commentsRef = useRef();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.userProfile);
  const communityWorkouts = useSelector((state) => state.community.workouts);
  const communityPresent =
    communityWorkouts &&
    Object.keys(communityWorkouts).length !== 0 &&
    communityWorkouts.constructor === Object;
  // commentsRef.current.inputData.value
  const commentList =
    props.commentData &&
    Object.entries(props.commentData)
      .sort((a, b) => a[1].time - b[1].time)
      .map((ele) => {
        return (
          <CommentItem
            commentID={ele[0]}
            workoutID={props.workoutID}
            workoutUser={props.workoutUser}
            commentData={ele[1]}
          />
        );
      });

  function onSendClick(event) {
    event.preventDefault();
    const commentData = {
      time: Date.now(),
      text: commentsRef.current.inputData.value,
      userProfile,
    };
    communityPresent && dispatch(sendCommunityComment(commentData, props.workoutID));
    commentsRef.current.inputData.value = "";
    commentsRef.current.inputData.blur();
  }

  return (
    <div className={styles.comments}>
      <div className={styles["comment__input"]}>
        <Avatar url={userProfile.dp} size="small"></Avatar>
        <form onSubmit={onSendClick} className={styles.form}>
          <InputNoValidation
            ref={commentsRef}
            floatText="Write a comment..."
            name="comment"
            type="text"
          ></InputNoValidation>
          <Button
            // onClickHandler={onSendClick}
            className={styles["comment__send"]}
            color="yellow-fill"
            length="small"
          >
            Send
          </Button>
        </form>
      </div>
      <div className={styles["comment__list"]}>{commentList}</div>
    </div>
  );
};

export default Comments;
