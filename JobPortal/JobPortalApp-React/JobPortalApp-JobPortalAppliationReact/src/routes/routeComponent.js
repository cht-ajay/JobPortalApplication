import routesConfig from "./route.json";
import React from "react";

export const routeComponent = routesConfig.reduce((components, route) => {
  components[route.component] = React.lazy(() =>
    import(`../components/pages/${route.component}`)
  );
  return components;
}, {});
