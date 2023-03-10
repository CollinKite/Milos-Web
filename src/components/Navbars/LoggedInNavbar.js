/*!

=========================================================
* BLK Design System React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

export default function IndexNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  const [isMobile, setIsMobile] = React.useState(
    window.innerWidth < 992 ? true : false
  );

  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    window.addEventListener("resize", handleResize);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 992 ? true : false);
  };

  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" tag={Link} id="navbar-brand">
            <span>MILOS </span>
            AI Generated Blog Posts
          </NavbarBrand>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="/" onClick={(e) => e.preventDefault()}>
                  Milos
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://github.com/CollinKite"
                rel="noopener noreferrer"
                target="_blank"
                title="Check out my Github"
              >
                <i className="fab fa-github" />
                <p className="d-lg-none d-xl-none">Github</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://linkedin.com/in/collinkite"
                rel="noopener noreferrer"
                target="_blank"
                title="Connect with me on Linkedin"
              >
                <i className="fab fa-linkedin" />
                <p className="d-lg-none d-xl-none">Linkedin</p>
              </NavLink>
            </NavItem>

            {isMobile && (
              <>
                <NavItem>
                  <NavLink
                    data-placement="bottom"
                    href="#"
                    onClick={logout}
                    rel="noopener noreferrer"
                    title="Logout"
                  >
                    <i className="tim-icons icon-single-02" />
                    <p className="d-lg-none d-xl-none">Logout</p>
                  </NavLink>
                </NavItem>
                
                <NavItem>
                <NavLink
                  data-placement="bottom"
                  href="/upload"
                  rel="noopener noreferrer"
                  title="upload"
                >
                  <i className="tim-icons icon-upload" />
                  <p className="d-lg-none d-xl-none">Upload</p>
                </NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink
                  data-placement="bottom"
                  href="/blogs"
                  rel="noopener noreferrer"
                  title="blogs"
                >
                  <i className="tim-icons icon-single-copy-04" />
                  <p className="d-lg-none d-xl-none">View Generated Blogs</p>
                </NavLink>
              </NavItem>

            </>
            )}

            <NavItem>
              <Button
                className="nav-link d-none d-lg-block"
                color="warning"
                onClick={logout}
              >
                <i className="tim-icons icon-single-02" /> Logout
              </Button>
            </NavItem>
            <NavItem>
              <Button
                className="nav-link d-none d-lg-block"
                color="primary"
                tag={Link}
                to="/upload"
              >
                <i className="tim-icons icon-upload" />  Upload File
              </Button>
            </NavItem>
            <NavItem>
              <Button
                className="nav-link d-none d-lg-block"
                color="success"
                tag={Link}
                to="/blogs"
              >
                <i className="tim-icons icon-single-copy-04" /> View Generated Blogs
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
