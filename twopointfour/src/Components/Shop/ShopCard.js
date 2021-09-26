import styles from "./ShopCard.module.css";
const ShopCard = (props) => {
  return <div className={`${styles["card"]} ${props.className}`}>{props.children}</div>;
};

export default ShopCard;
