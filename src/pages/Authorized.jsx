import React from 'react';
import Authorized from '@/utils/Authorized';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';

const getRouteAuthority = (path, routeData) => {
  let authorities = undefined;
  routeData.forEach(route => {
    // match prefix
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      authorities = route.authority || authorities; // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

const AuthComponent = ({
  children,
  route = {
    routes: [],
  },
  location,
}) => {
  const { routes = [] } = route;
  return (
    <Authorized authority={getRouteAuthority(location.pathname, routes)}>
      {children}
    </Authorized>
  );
};

export default AuthComponent
