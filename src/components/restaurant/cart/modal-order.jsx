import React, { useState } from "react";
import { Button } from "../../widgets/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../widgets/dialog";
import { Input } from "../../widgets/input";
import { currencyFormatted } from "../../../utils/utils";
import useCart from "../../../hooks/useCart";
import useMenu from "../../../hooks/useMenu";
import useOrder from "../../../hooks/useOrder";
import useRestaurant from "../../../hooks/useRestaurant";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useShallow } from "zustand/react/shallow";
import styles from "../../components.module.css";

function ModalOrder() {
  const [quantity, setQuantity] = useState(1);
  const [modifierValue, setModifierValue] = useState(null);

  const restaurant = useRestaurant((state) => state.restaurant);
  const menu = useMenu((state) => state.items);
  const setCartItems = useCart((state) => state.setCartItems);
  const [orderItem, clearOrderItem] = useOrder(useShallow((state) => [state.orderItem, state.clearOrderItem]));

  if (!Object.keys(restaurant).length || !Object.keys(menu).length || !Object.keys(orderItem).length) return null;

  const addCartItem = () => {
    setCartItems({
      itemID: orderItem.id,
      modifierID: modifierValue?.id,
      price: (orderItem.price + (modifierValue?.price || 0)) * quantity,
      quantity,
    });
    clearOrderItem();
    setModifierValue(null);
    setQuantity(1);
  };

  return (
    <Dialog open={!!Object.keys(orderItem).length} onOpenChange={() => clearOrderItem()}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className={`${styles.dialogContent} ${styles.dialogContentSm}`}
        style={{ backgroundColor: restaurant.webSettings.backgroundColour }}
      >
        <DialogHeader>
          {orderItem?.images && (
            <DialogTitle>
              <img
                src={orderItem.images[0].image}
                alt={orderItem.name}
                className={styles.dialogTitleImage}
              />
            </DialogTitle>
          )}

          <DialogTrigger
            className={`${styles.dialogTrigger} ${styles.dialogTriggerFocus} ${styles.dialogTriggerOpen}`}
            style={{ backgroundColor: restaurant.webSettings.backgroundColour }}
          >
            <Cross2Icon className={styles.dialogTriggerIcon} />
          </DialogTrigger>
        </DialogHeader>

        <DialogDescription className={styles.dialogDescription}>
          <div className={styles.dialogDescriptionContent}>
            <span className={styles.dialogDescriptionTitle}>{orderItem.name}</span>
            <span className={styles.dialogDescriptionText}>{orderItem.description}</span>
          </div>

          {orderItem.modifiers?.map((modifier) => (
            <div key={modifier.id}>
              <div className={styles.modifierContainer}>
                <p className={styles.modifierTitle}>{modifier.name}</p>
                <p className={styles.modifierSubtitle}>{`Select ${modifier.maxChoices} option`}</p>
              </div>

              {modifier?.items?.map((item) => {
                if (!item.available) return null;

                return (
                  <div
                    key={item.id}
                    className={styles.modifierItem}
                    onClick={() => setModifierValue(item)}
                  >
                    <div className={styles.modifierItemText}>
                      <p className={styles.modifierItemName}>{item.name}</p>
                      <p className={styles.modifierItemPrice}>{currencyFormatted(restaurant.ccy, item.price)}</p>
                    </div>

                    <Input
                      type="radio"
                      value={item.id}
                      checked={item.id === modifierValue?.id}
                      name="modifier"
                      className={styles.inputRadio}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </DialogDescription>

        <DialogFooter className={styles.dialogFooter}>
          <div className={styles.quantityControls}>
            <Button
              variant="ghost"
              size="icon"
              disabled={quantity === 1 || (orderItem.modifiers && !modifierValue)}
              className={`${styles.quantityButton} ${styles.quantityButtonMinus}`}
              style={{
                backgroundColor: restaurant.webSettings.navBackgroundColour,
                borderColor: restaurant.webSettings.primaryColour,
              }}
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            >
              -
            </Button>

            <span className={styles.quantityText}>{quantity}</span>

            <Button
              variant="ghost"
              size="icon"
              disabled={orderItem.modifiers && !modifierValue}
              className={`${styles.quantityButton} ${styles.quantityButtonPlus}`}
              style={{
                backgroundColor: restaurant.webSettings.navBackgroundColour,
                borderColor: restaurant.webSettings.primaryColour,
              }}
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </Button>
          </div>

          <Button
            disabled={orderItem.modifiers && !modifierValue}
            className={styles.addToOrderButton}
            style={{ backgroundColor: restaurant.webSettings.primaryColour }}
            onClick={addCartItem}
          >
            Add to Order {currencyFormatted(restaurant.ccy, (orderItem.price + (modifierValue?.price || 0)) * quantity)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ModalOrder };