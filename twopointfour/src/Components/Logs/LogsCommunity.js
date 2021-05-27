import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCommunityWorkouts } from "../../store/mainSlice";
import CardNotFound from "../UI/Card/CardNotFound";
import LogItem from "./LogItem";
import styles from "./LogsCommunity.module.css";

const LogsCommunity = () => {
  const dispatch = useDispatch();
  const communityWorkouts = useSelector((state) => state.community.workouts);
  const communityPresent =
    communityWorkouts &&
    Object.keys(communityWorkouts).length !== 0 &&
    communityWorkouts.constructor === Object;
  console.log(communityPresent);

  useEffect(() => {
    if (communityPresent) return;
    dispatch(initializeCommunityWorkouts());
  }, []);

  const communityWorkoutList =
    communityPresent &&
    Object.entries(communityWorkouts).map((ele) => {
      return <LogItem noShare={true} workoutData={[ele[0], ele[1]]} />;
    });

  return (
    <div className={styles.logs}>
      {!communityPresent && (
        <CardNotFound
          title="No Workout Logs"
          description="There are no workouts shared to the community. Click on the share toggle on one of your workouts to share!"
          button="Share a workout"
          path="/logs/mylogs"
        />
      )}
      {communityPresent && communityWorkoutList}
    </div>
  );
};

export default LogsCommunity;
