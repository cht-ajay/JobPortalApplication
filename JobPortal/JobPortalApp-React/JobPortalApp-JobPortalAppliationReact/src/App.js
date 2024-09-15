// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/common/MyNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { routeComponent } from "./routes/routeComponent";
import { Provider } from "react-redux";
import store from "./redux/store";
import routesConfig from "./routes/route.json"; // Your routes configuration
import PrivateRoute from "./routes/privateRoute"; // The route guard component

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <MyNavbar />
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routesConfig.map(({ path, isAuthenticate, component }) => {
              const Component = routeComponent[component];
              return (
                <Route
                  key={path}
                  path={path}
                  element={<PrivateRoute element={<Component />} path={path} />}
                />
              );
            })}
          </Routes>
        </React.Suspense>
      </Router>
    </Provider>
  );
};

export default App;
