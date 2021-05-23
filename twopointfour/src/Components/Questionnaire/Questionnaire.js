import { useDispatch } from "react-redux";
import { sendQuestionnaire, updateDatabase } from "../../store/mainSlice";
import { primary, pyramid, secondary } from "../Helper/Workouts";
import useInput from "../Hooks/use-input";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input/Input";
import InputGroup from "../UI/Input/InputGroup";
import InputGroupMulti from "../UI/Input/InputGroupMulti";
import Radio from "../UI/Input/Radio";
import styles from "./Questionnaire.module.css";

function textValidator(value) {
  return value.trim() != "";
}

function numberValidator(value) {
  let tester = /^\d+$/;
  return tester.test(value);
}

function kilometreValidator(value) {
  let tester = /^\d+\.?\d*$/;
  return tester.test(value);
}
function timeValidator(value) {
  let tester = /^\d{1,2}:\d{2}$/;
  return tester.test(value);
}

const Questionnaire = () => {
  const dispatch = useDispatch();
  const {
    setInputValue: setRegularValue,
    setInputTouched: setRegularTouched,
    inputValue: regularValue,
    inputTouched: regularTouched,
    inputValidity: regularValidity,
    inputValid: regularValid,
  } = useInput(textValidator);
  const {
    setInputValue: setFrequencyValue,
    setInputTouched: setFrequencyTouched,
    inputValue: frequencyValue,
    inputTouched: frequencyTouched,
    inputValidity: frequencyValidity,
    inputValid: frequencyValid,
  } = useInput(numberValidator);
  const {
    setInputValue: setDistanceValue,
    setInputTouched: setDistanceTouched,
    inputValue: distanceValue,
    inputTouched: distanceTouched,
    inputValidity: distanceValidity,
    inputValid: distanceValid,
  } = useInput(kilometreValidator);
  const {
    setInputValue: setExperienceValue,
    setInputTouched: setExperienceTouched,
    inputValue: experienceValue,
    inputTouched: experienceTouched,
    inputValidity: experienceValidity,
    inputValid: experienceValid,
  } = useInput(numberValidator);
  const {
    setInputValue: setLatestValue,
    setInputTouched: setLatestTouched,
    inputValue: latestValue,
    inputTouched: latestTouched,
    inputValidity: latestValidity,
    inputValid: latestValid,
  } = useInput(timeValidator);
  const {
    setInputValue: setTargetValue,
    setInputTouched: setTargetTouched,
    inputValue: targetValue,
    inputTouched: targetTouched,
    inputValidity: targetValidity,
    inputValid: targetValid,
  } = useInput(timeValidator);
  const {
    setInputValue: setDurationValue,
    setInputTouched: setDurationTouched,
    inputValue: durationValue,
    inputTouched: durationTouched,
    inputValidity: durationValidity,
    inputValid: durationValid,
  } = useInput(numberValidator);

  const {
    setInputValue: setWorkoutFrequencyValue,
    setInputTouched: setWorkoutFrequencyTouched,
    inputValue: workoutFrequencyValue,
    inputTouched: workoutFrequencyTouched,
    inputValidity: workoutFrequencyValidity,
    inputValid: workoutFrequencyValid,
  } = useInput(numberValidator);

  const formValid =
    regularValidity &&
    frequencyValidity &&
    distanceValidity &&
    experienceValidity &&
    latestValidity &&
    targetValidity &&
    workoutFrequencyValidity &&
    durationValidity;

  function formSubmitHandler(event) {
    event.preventDefault();
    setRegularTouched(true);
    setFrequencyTouched(true);
    setDistanceTouched(true);
    setExperienceTouched(true);
    setLatestTouched(true);
    setTargetTouched(true);
    setDurationTouched(true);
    setWorkoutFrequencyTouched(true);
    if (formValid) {
      const formData = {
        regular: regularValue,
        frequency: frequencyValue,
        distance: distanceValue,
        experience: experienceValue,
        latest: latestValue,
        target: targetValue,
        duration: durationValue,
        workoutFrequency: workoutFrequencyValue,
      };
      dispatch(sendQuestionnaire(formData));
      // dispatch(updateDatabase(0, "users/yihein/workouts/count"));
    }
  }

  return (
    <div className={styles.questionnaire}>
      <h2 className={styles.header}>Questionnaire</h2>
      <form onSubmit={formSubmitHandler} className={styles.form}>
        <Card color="white">
          <Radio
            options={{ yes: "Yes", no: "No" }}
            onChangeHandler={setRegularValue}
            onTouchHandler={setRegularTouched}
            valid={regularValid}
            title="Do you run regularly?"
            name="regular"
          ></Radio>
        </Card>
        <Card color="white">
          <InputGroup
            title="For the past month, how many times do you run per week?"
            floatText="runs/week"
            name="frequency"
            onChangeHandler={setFrequencyValue}
            onTouchHandler={setFrequencyTouched}
            value={frequencyValue}
            valid={frequencyValid}
            touched={frequencyTouched}
            pattern="^\d+$"
          ></InputGroup>
        </Card>
        <Card color="white">
          <InputGroup
            title="How far do you run each training on average? "
            floatText="kilometres"
            name="distance"
            onChangeHandler={setDistanceValue}
            onTouchHandler={setDistanceTouched}
            value={distanceValue}
            valid={distanceValid}
            touched={distanceTouched}
            pattern="^\d+\.?\d*$"
          ></InputGroup>
        </Card>
        <Card color="white">
          <InputGroup
            title="How many months have you been training regularly for?"
            floatText="months"
            name="experience"
            onChangeHandler={setExperienceValue}
            onTouchHandler={setExperienceTouched}
            value={experienceValue}
            valid={experienceValid}
            touched={experienceTouched}
            pattern="^\d+$"
          ></InputGroup>
        </Card>
        <Card color="white">
          <InputGroup
            title="What is your latest 2.4km timing?"
            floatText="mm:ss"
            name="latest"
            onChangeHandler={setLatestValue}
            onTouchHandler={setLatestTouched}
            value={latestValue}
            valid={latestValid}
            touched={latestTouched}
            pattern="^\d{1,2}:\d{2}$"
          ></InputGroup>
        </Card>
        <Card color="white">
          <InputGroup
            title="What is your target 2.4km timing?"
            floatText="mm:ss"
            name="target"
            onChangeHandler={setTargetValue}
            onTouchHandler={setTargetTouched}
            value={targetValue}
            valid={targetValid}
            touched={targetTouched}
            pattern="^\d{1,2}:\d{2}$"
          ></InputGroup>
        </Card>
        <Card color="white">
          <InputGroup
            title="How many weeks do you have to achieve your target?"
            floatText="weeks"
            name="duration"
            onChangeHandler={setDurationValue}
            onTouchHandler={setDurationTouched}
            value={durationValue}
            valid={durationValid}
            touched={durationTouched}
            pattern="^\d+$"
          ></InputGroup>
        </Card>
        <Card color="white">
          <InputGroup
            title="How many workouts per week can you commit to?"
            floatText="number"
            name="workoutfrequency"
            onChangeHandler={setWorkoutFrequencyValue}
            onTouchHandler={setWorkoutFrequencyTouched}
            value={workoutFrequencyValue}
            valid={workoutFrequencyValid}
            touched={workoutFrequencyTouched}
            pattern="^\d+$"
          ></InputGroup>
        </Card>
        <Button color="yellow-fill" length="long">
          Submit Questionnaire
        </Button>
      </form>
    </div>
  );
};

export default Questionnaire;
