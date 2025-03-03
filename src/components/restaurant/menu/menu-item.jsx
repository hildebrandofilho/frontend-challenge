import React from 'react';
import { AccordionContent } from "../../widgets/accordion";
import { Badge } from "../../widgets/badge";
import { currencyFormatted } from "../../../utils/utils";
import useCart from "../../../hooks/useCart";
import useOrder from "../../../hooks/useOrder";
import useRestaurant from "../../../hooks/useRestaurant";
import styles from "../../components.module.css";

function MenuItem({ item }) {
  const restaurant = useRestaurant((state) => state.restaurant);
  const setOrderItem = useOrder((state) => (state.setOrderItem));
  const cartItems = useCart((state) => (state.cartItems));

  const quantityInCart = cartItems.find((cartItem) => cartItem.itemID === item.id)?.quantity || 0;

  if (!Object.keys(restaurant).length) return null;

  if (!item.available) return null;

  return (
    <AccordionContent
      key={item.id}
      className={styles.accordionContentMenu}
      onClick={() => setOrderItem(item)}
    >
      <div className={styles.gap1}>
        <p className={styles.itemName}>
          {quantityInCart > 0 && (
            <Badge
              className={styles.badgeMenu}
              style={{
                backgroundColor: restaurant.webSettings.primaryColour,
              }}
            >
              {quantityInCart}
            </Badge>
          )}
          {item.name}
        </p>

        <p className={styles.itemDescription}>
          {item.description}
        </p>

        <p className={styles.itemPrice}>
          {currencyFormatted(restaurant.ccy, item.price)}
        </p>
      </div>

      {item?.images && (
        <img
          src={item.images[0].image}
          alt={item.name}
          className={styles.itemImage}
        />
      )}
    </AccordionContent>
  );
}

export { MenuItem };