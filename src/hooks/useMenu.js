import { create } from "zustand";

const useMenu = create((set, get) => ({
   items: {},
   sectionItems: [],
   setItems: (items) => {
      set({ items });
   },
   setSectionItems: (sectionItems) => {
      set({ sectionItems });
   },
   getSectionItem: (id) => {
      let findedSectionItem = null;
      
      get().items?.sections?.forEach?.((section) => {
         const item = section.items.find((item) => item.id === id);

         if (item) {
            findedSectionItem = item;
            return;
         }
      });

      return findedSectionItem;
   },
   clearSectionItems: () => {
      set({ sectionItems: get().items.sections.map((section) => section.name) });
   }
}));

export default useMenu;