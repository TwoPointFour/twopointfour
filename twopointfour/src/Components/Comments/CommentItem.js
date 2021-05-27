import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/mainSlice";
import { msToMinS, msToTime } from "../Helper/Complementary";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import Chip from "../UI/Chip";
import styles from "./CommentItem.module.css";

const CommentItem = (props) => {
  const dispatch = useDispatch();
  const {
    time,
    text,
    userProfile: { uid, displayName, badges, dp },
  } = props.commentData;
  const badgesList = badges?.map((ele) => {
    return (
      <Chip color="green" size="small">
        {ele}
      </Chip>
    );
  });

  const userID = useSelector((state) => state.user.userProfile.uid);
  const havePermission = userID === props.workoutUser || userID === uid;

  function onCommentDelete() {
    dispatch(deleteComment(props.workoutID, props.commentID));
  }

  return (
    <div className={styles["comment__item"]}>
      <Avatar url={dp} size="small"></Avatar>
      <div className={styles["comment__text"]}>
        <div className={styles["comment__header"]}>
          <span className={styles["comment__name"]}>{displayName}</span>
          <Chip color="gray" size="small">
            {msToTime(time)}
          </Chip>
          <div className={styles.badges}>{badgesList}</div>
        </div>
        <p className={styles.p}>{text}</p>
      </div>
      {havePermission && (
        <Button
          onClickHandler={onCommentDelete}
          variation="circle-small"
          color="gray-fill"
          className={styles["comment__delete"]}
        >
          <svg
            className={styles["delete-icon"]}
            enable-background="new 0 0 512 512"
            height="512"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="m424 64h-88v-16c0-26.51-21.49-48-48-48h-64c-26.51 0-48 21.49-48 48v16h-88c-22.091 0-40 17.909-40 40v32c0 8.837 7.163 16 16 16h384c8.837 0 16-7.163 16-16v-32c0-22.091-17.909-40-40-40zm-216-16c0-8.82 7.18-16 16-16h64c8.82 0 16 7.18 16 16v16h-96z" />
              <path d="m78.364 184c-2.855 0-5.13 2.386-4.994 5.238l13.2 277.042c1.22 25.64 22.28 45.72 47.94 45.72h242.98c25.66 0 46.72-20.08 47.94-45.72l13.2-277.042c.136-2.852-2.139-5.238-4.994-5.238zm241.636 40c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16z" />
            </g>
          </svg>
        </Button>
      )}
    </div>
  );
};

export default CommentItem;
