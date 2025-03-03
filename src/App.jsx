import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';

function App() {

   return (
      <Routes>
         <Route path="/" >
            <Route
               index
               element={
                  <Suspense fallback={<Loading />}>
                  </Suspense>
               }
            />
            <Route path="*" />
         </Route>
      </Routes>
   );
}

export default App;