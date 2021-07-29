import {
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  Form,
  Button,
} from "react-bootstrap";
import React, { FC } from "react";
import { useQuery } from "@apollo/client";
import { AUTHENTICATION } from "../../graphql/query";
import {useHistory} from "react-router-dom";
interface Props {
  // any props that come into the component
}

const NavbarTopSide: FC<Props> = ({ children }) => {
  const { client, loading, error, data } = useQuery(AUTHENTICATION, {
    errorPolicy: "ignore",
  });
  console.log(data);
  const history = useHistory()
  const handleLogout = (e: any) => {
    client.resetStore();
    localStorage.removeItem("token");
    history.push('/signin');
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">My Todo App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
        {data && !data?.me ? (
          <>
            <Nav.Link href="/signin">Sign in</Nav.Link>
            <Nav.Link href="/signup">Sign up</Nav.Link>{" "}
          </>
        ) : (
          <>
            <Nav.Link href="/manage-todo">
              {data && data?.me?.username?.toUpperCase()}
            </Nav.Link>
            <Button variant="outline-success" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Navbar>
      {children}
    </div>
  );
};

export default NavbarTopSide;
