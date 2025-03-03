import React from 'react';
import useMenu from "../../../hooks/useMenu";
import { useShallow } from "zustand/react/shallow";
import { Loading } from "../../widgets/loading";
import useRestaurant from "../../../hooks/useRestaurant";
import styles from "../../components.module.css";

function Sections() {
  const restaurant = useRestaurant((state) => state.restaurant);
  const [menu, sectionItems, setSectionItems, clearSectionItems] = useMenu(useShallow((state) => [
    state.items,
    state.sectionItems,
    state.setSectionItems,
    state.clearSectionItems
  ]));

  if (!Object.keys(restaurant).length || !Object.keys(menu).length) return Loading();

  return (
    <div className={styles.containerSections}>
      {menu.sections.map((section) => (
        <div
          key={section.id}
          className={styles.section}
          onClick={() => {
            if (sectionItems.length === 1 && sectionItems[0] === section.name) {
              clearSectionItems();
            } else {
              setSectionItems([section.name]);
            }
          }}
        >
          <div
            className={`${styles.sectionImageContainer} ${sectionItems.length === 1 && sectionItems[0] === section.name ? styles.sectionImageActive : ''}`}
          >
            <img
              className={styles.sectionImage}
              src={section.images[0].image}
              alt={section.name}
            />
          </div>

          <span
            className={`${styles.sectionName} ${sectionItems.length === 1 && sectionItems[0] === section.name ? styles.fontBold : styles.fontNormal}`}
          >
            {section.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export { Sections };