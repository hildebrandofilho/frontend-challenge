import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { NotFound } from "./pages/NotFound";
import { fetchMenu, fetchRestaurants } from "./api";
import useRestaurant from "./hooks/useRestaurant";
import useMenu from "./hooks/useMenu";
import { useShallow } from "zustand/react/shallow";
import { Loading } from "./components/widgets/loading";
import './App.css';

const Restaurant = lazy(() => import("./pages/Restaurant"));

function App() {
   const setRestaurant = useRestaurant((state) => state.setRestaurant);
   const [setMenuItems, clearSectionItems] = useMenu(useShallow((state) => ([state.setItems, state.clearSectionItems])));

   useEffect(() => {
      fetchRestaurants().then((res) => {
         console.log("Restaurante carregado:", res);
         setRestaurant(res);
      });
   
      fetchMenu().then((res) => {
         console.log("Menu carregado:", res);
         setMenuItems(res);
         clearSectionItems();
      });
   }, []);

   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route
               index
               element={
                  <Suspense fallback={<Loading />}>
                     <Restaurant />
                  </Suspense>
               }
            />
            <Route path="*" element={<NotFound />} />
         </Route>
      </Routes>
   );
}

export default App;