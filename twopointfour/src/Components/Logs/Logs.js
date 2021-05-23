import CardNotFound from "../UI/CardNotFound";

const Logs = () => {
  return (
    <div>
      <CardNotFound
        title="No Workout Logs"
        description="You have not previous workout logs stored in our database. Please start a workout to see your logs here."
        button="Start a Workout"
        path="/run"
      />
    </div>
  );
};

export default Logs;
