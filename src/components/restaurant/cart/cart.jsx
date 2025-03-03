import React, { useRef } from "react";
import useCart from "../../../hooks/useCart";
import useMenu from "../../../hooks/useMenu";
import { currencyFormatted } from "../../../utils/utils";
import useRestaurant from "../../../hooks/useRestaurant";
import { Button } from "../../widgets/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useShallow } from "zustand/react/shallow";
import { Loading } from "../../widgets/loading";
import styles from "../../components.module.css";

function Cart() {
  const cartRef = useRef(null);
  const restaurant = useRestaurant((state) => state.restaurant);
  const [cartItems, subtractItem, addItem] = useCart(
    useShallow((state) => [state.cartItems, state.subtractItem, state.addItem])
  );
  const getSectionItem = useMenu((state) => state.getSectionItem);

  if (!Object.keys(restaurant).length) return Loading();

  return (
    <div>
      <div className={styles.cartContainer}>
        <Button
          onClick={() => cartRef.current.classList.toggle(styles.cartContentVisible)}
          className={styles.cartButton}
          style={{ backgroundColor: restaurant.webSettings.primaryColour }}
        >
          Your basket • {cartItems.length} item
        </Button>
      </div>

      <div ref={cartRef} className={styles.cartContent}>
        <div className={styles.cartHeader}>
          <h1 className={styles.cartTitle}>Carrinho</h1>
          <Button
            variant="ghost"
            onClick={() => cartRef.current.classList.toggle(styles.cartContentVisible)}
            className={styles.cartCloseButton}
          >
            <Cross2Icon
              className={styles.cartCloseIcon}
              style={{ color: restaurant.webSettings.primaryColour }}
            />
          </Button>
        </div>

        {cartItems.length ? (
          <div className={styles.cartItemsContainer}>
            <div
              className={styles.cartItems}
              style={{ backgroundColor: restaurant.webSettings.backgroundColour }}
            >
              {cartItems.map((item, index) => {
                const sectionItem = getSectionItem(item.itemID);
                let modifierApplied = null;

                if (item.modifierID) {
                  sectionItem.modifiers.forEach((modifier) => {
                    const modifierItem = modifier.items.find(
                      (modifierItem) => modifierItem.id === item.modifierID
                    );

                    if (modifierItem) {
                      modifierApplied = modifierItem;
                      return;
                    }
                  });
                }

                return (
                  <div key={`${index}_${sectionItem.id}`} className={styles.cartItem}>
                    <div>
                      <p className={styles.cartItemName}>{sectionItem.name}</p>
                      {modifierApplied && (
                        <p className={styles.cartItemModifier}>{modifierApplied.name}</p>
                      )}
                      <div className={styles.cartItemControls}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`${styles.cartItemButton} ${styles.cartItemButtonMinus}`}
                          style={{
                            backgroundColor: restaurant.webSettings.navBackgroundColour,
                            borderColor: restaurant.webSettings.primaryColour,
                          }}
                          onClick={() => {
                            subtractItem({
                              ...item,
                              price: modifierApplied?.price || sectionItem.price,
                            });
                          }}
                        >
                          -
                        </Button>
                        <span className={styles.cartItemQuantity}>{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`${styles.cartItemButton} ${styles.cartItemButtonPlus}`}
                          style={{
                            backgroundColor: restaurant.webSettings.navBackgroundColour,
                            borderColor: restaurant.webSettings.primaryColour,
                          }}
                          onClick={() => {
                            addItem({
                              ...item,
                              price: modifierApplied?.price || sectionItem.price,
                            });
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <p className={styles.cartItemPrice}>
                      {currencyFormatted(restaurant.ccy, item.price)}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className={styles.cartTotalContainer}>
              <p className={styles.cartTotalLabel}>Total:</p>
              <p className={styles.cartTotalValue}>
                {currencyFormatted(
                  restaurant.ccy,
                  cartItems.reduce((acc, item) => acc + item.price, 0)
                )}
              </p>
            </div>
          </div>
        ) : (
          <p
            className={styles.cartEmptyMessage}
            style={{ backgroundColor: restaurant.webSettings.backgroundColour }}
          >
            Seu carrinho está vazio
          </p>
        )}

        <div className={styles.cartCheckoutButtonContainer}>
          <Button
            onClick={() => cartRef.current.classList.toggle(styles.cartContentVisible)}
            className={styles.cartCheckoutButton}
            style={{ backgroundColor: restaurant.webSettings.primaryColour }}
          >
            Checkout now
          </Button>
        </div>
      </div>
    </div>
  );
}

export { Cart };