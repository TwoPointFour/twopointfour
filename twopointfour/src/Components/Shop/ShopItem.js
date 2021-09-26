import Icons from "../Assets/Icons";
import ShopCard from "./ShopCard";
import styles from "./ShopItem.module.css";
import coinbag from "../Assets/coinbag.bmp";
import { addCoins } from "../../store/mainSlice";
import { useDispatch } from "react-redux";
import Button from "../UI/Button";
const ShopItem = () => {
  const dispatch = useDispatch();
  const addCoinsHandler = function () {
    console.log("button clicked!");
    dispatch(addCoins());
  };
  return (
    <ShopCard className={styles.card}>
      <div className={styles["item__title"]}>Sachet of Coins</div>
      <div className={styles["item__amount"]}>100 coins</div>
      <img className={styles["item__image"]} src={coinbag} />
      {/* <button onClick={addCoinsHandler}>$1.99</button> */}
      <Button color="yellow-fill" onClickHandler={addCoinsHandler} length="small">
        $1.99
      </Button>
    </ShopCard>
  );
};

export default ShopItem;
