import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Sidebar from "./Sidebar";
import StickyBox2 from "./StickyBox2";
import Header from "./Header";

function NavLink({ children, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });
  return (
    <Link
      to={to}
      style={{
        color: match ? "red" : "blue",
        borderBottom: `2px solid ${match ? "red" : "transparent"}`
      }}
    >
      {children}
    </Link>
  );
}
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <div className="container">
            <h1>
              <span>Wil React Sticky </span>
            </h1>
            <div>Sticky Component For Header, Sidebar ...</div>
            <nav className="nav">
              <NavLink to="/" activeOnlyWhenExact>
                Sidebar
              </NavLink>
              <NavLink to="/sticky-box2">Sticky Box 2</NavLink>
              <NavLink to="/header-sticky">Header Sticky</NavLink>
            </nav>
          </div>
          <Switch>
            <Route path="/" exact>
              <Sidebar />
            </Route>
            <Route path="/sticky-box2">
              <StickyBox2 />
            </Route>
            <Route path="/header-sticky">
              <Header />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
