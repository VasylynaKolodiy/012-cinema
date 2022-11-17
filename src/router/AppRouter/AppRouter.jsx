import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes} from "../rotes"
import Header from "../../components/Header/Header";


const AppRouter = () => {

  return (
    <div>
      <Header/>
      <Routes>
        {privateRoutes.map((route, i) =>
          <Route key={i}
                 path={route.path}
                 element={route.component}
                 exact={route.exact} />
        )}
      </Routes>
    </div>

  )
};

export default AppRouter;