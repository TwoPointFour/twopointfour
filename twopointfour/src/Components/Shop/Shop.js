import styles from "./Shop.module.css";
import ShopItem from "./ShopItem";
const Shop = () => {
  return (
    <div className={styles.shop}>
      <ShopItem />
    </div>
  );
};

export default Shop;
