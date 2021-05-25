import { useSelector } from "react-redux";
import CardNotFound from "../UI/Card/CardNotFound";
import LogItem from "./LogItem";
import styles from "./Logs.module.css";

const Logs = () => {
  const logs = useSelector((state) => state.workout.logs);

  const testObj = {
    userProfile: {
      displayName: "Elon Musk",
      email: "chaiyihein@gmail.com",
      bio: "I like running!",
      dp: "https://techcrunch.com/wp-content/uploads/2021/01/GettyImages-1229901940.jpg?w=730&crop=1",
      badges: ["Top Runner", "5K Finisher", "IPPT Gold"],
    },
    workout: {
      date: Date.now(),
      difficultyMultiplier: 91,
      review: {
        feeling: "good",
        reflection: "This was one of the toughest training I have faced in a long time.",
      },
      parts: [
        {
          distance: 300,
          pace: 25000,
          part_ID: "1006_0",
          rest: 115,
          restMultiplier: 4.5,
          sets: 8,
          timings: [82000, 207000, 83000, 79430, 78236],
        },
      ],
      personalisedDifficultyMultiplier: 160.0173922309409,
      segment: "primary",
      type: "Distance Interval",
      workout_ID: "1006",
      feeling: "good",
    },
    comments: {
      adfalksdfh: {
        time: Date.now(),
        text: "Daddy Musk is the best!",
        userProfile: {
          displayName: "X Æ A-12",
          email: "lizzy@gmail.com",
          bio: "I am human!!! MUHAHAHA",
          badges: ["Baby Musk", "Best Name", "5m Finisher"],
          dp: "https://static.scientificamerican.com/blogs/cache/file/7069F0BB-A9AB-4932-84F508BBC0136458_source.jpg?w=590&h=800&F754D658-CE37-41EE-BE2C0EFC7134D582",
        },
      },
    },
  };

  return (
    <div className={styles.logs}>
      {!(logs.length > 0) && (
        <CardNotFound
          title="No Workout Logs"
          description="You have not previous workout logs stored in our database. Please start a workout to see your logs here."
          button="Start a Workout"
          path="/run"
        />
      )}
      <LogItem workoutData={testObj} />
      <LogItem workoutData={testObj} />
      <LogItem workoutData={testObj} />
      <LogItem workoutData={testObj} />
    </div>
  );
};

export default Logs;
