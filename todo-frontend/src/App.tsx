import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./features/layout/navbar";
import SignInSide from "./features/auth/signin";
import SignUpSide from "./features/auth/signup";
import { useQuery } from "@apollo/client";
import { AUTHENTICATION } from "./graphql/query";
import { ProtectedRouteProps } from "./components/ProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageTodo from "./features/me/ManageTodo";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { loading, error, data } = useQuery(AUTHENTICATION, {
    errorPolicy: "ignore",
  });
  let isAuthenticated = false;
  if (data && data.me) {
    isAuthenticated = true;
  }
  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: isAuthenticated,
    authenticationPath: "/signin",
  };

  const defaultProtectedRouteProps2: ProtectedRouteProps = {
    isAuthenticated: !isAuthenticated,
    authenticationPath: "/manage-todo",
  };

  return (
    <Router>
      <Navbar>
        <Switch>
          <ProtectedRoute {...defaultProtectedRouteProps} path="/manage-todo" exact>
            <ManageTodo />
          </ProtectedRoute>

          
          <ProtectedRoute {...defaultProtectedRouteProps2} path="/signin" exact>
            <SignInSide />
          </ProtectedRoute>

          <ProtectedRoute {...defaultProtectedRouteProps2} path="/signup" exact>
            <SignUpSide />
          </ProtectedRoute>

          

          {/* <Route path="/signin" exact>
          <SignInSide />
          </Route>
          <Route path="/signup" exact>
            <SignUpSide />
          </Route> */}

        </Switch>
      </Navbar>
    </Router>
  );
}

export default App;
