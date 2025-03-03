import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger } from "../../widgets/accordion";
import { MenuItem } from "./menu-item";
import useMenu from "../../../hooks/useMenu";
import { useShallow } from "zustand/react/shallow";
import { Loading } from "../../widgets/loading";
import styles from "../../components.module.css";

function MenuList({ filter }) {
  const [menu, sectionItems, setSectionItems] = useMenu(useShallow((state) => [
    state.items,
    state.sectionItems,
    state.setSectionItems,
  ]));

  if (!Object.keys(menu).length) return Loading();

  return (
    <Accordion
      type="multiple"
      value={sectionItems}
      onValueChange={setSectionItems}
      className={styles.accordionMenuList}
    >
      {menu.sections.map((section) => (
        <AccordionItem key={section.id} value={section.name}>
          <AccordionTrigger className={styles.accordionTriggerMenuList}>
            {section.name}
          </AccordionTrigger>

          {section.items.map((item) => {
            if (!item.name.toLowerCase().includes(filter.toLowerCase())) return null;

            return (
              <MenuItem key={item.id} item={item} />
            );
          })}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export { MenuList };