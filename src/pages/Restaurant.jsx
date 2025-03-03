import React, { useState } from 'react';
import { Input } from "@/components/widgets/input";
import { Cart, MenuList, ModalOrder, Sections } from "../components";
import useRestaurant from "@/hooks/useRestaurant";
import { Loading } from "../components/widgets/loading";
import { SearchIcon } from "lucide-react";
import styles from './restaurant.module.css';

function Restaurant() {
   const restaurant = useRestaurant((state) => state.restaurant);
   const [searchText, setSearchText] = useState("");

   if (!Object.keys(restaurant).length) return Loading();

   return (
      <div className={styles.container}>
         <img
            src={restaurant.webSettings.bannerImage}
            className={styles.bannerImage}
         />

         <div className={styles.bodyContainer}>
            <div className={styles.searchContainer}>
               <SearchIcon />

               <Input
                  type="search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search menu items"
                  className={styles.searchInput}
               />
            </div>

            <div className={styles.mainContent}>
               <div className={styles.menuSection}>
                  <Sections />
                  <MenuList filter={searchText} />
               </div>

               <div className={styles.cartSection}>
                  <Cart />
               </div>
            </div>
         </div>

         <ModalOrder />
      </div>
   );
}

export default Restaurant;