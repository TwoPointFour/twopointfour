import { msToMinS, msToTime } from "../Helper/Complementary";
import Avatar from "../UI/Avatar";
import Chip from "../UI/Chip";
import styles from "./CommentItem.module.css";

const CommentItem = (props) => {
  const {
    time,
    text,
    userProfile: { displayName, badges, dp },
  } = props.commentData;
  const badgesList = badges.map((ele) => {
    return (
      <Chip color="green" size="small">
        {ele}
      </Chip>
    );
  });

  console.log(time);

  return (
    <div className={styles["comment__item"]}>
      <Avatar url={dp} size="small"></Avatar>
      <div className={styles["comment__text"]}>
        <div className={styles["comment__header"]}>
          <span className={styles["comment__name"]}>{displayName}</span>
          <Chip color="gray" size="small">
            {msToTime(time)} hrs
          </Chip>
          <div className={styles.badges}>{badgesList}</div>
        </div>
        <p className={styles.p}>{text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
