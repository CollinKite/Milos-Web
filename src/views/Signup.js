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

Copyright 2023 Collin Kite
*/
import React, {useState} from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import Footer from "components/Footer/Footer";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import IndexNavbar from "components/Navbars/IndexNavbar";
import ReCAPTCHA from "react-google-recaptcha";

export default function Signup() {
  if(localStorage.getItem("token") !== null) {
    window.location.href = "/";
  }
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = React.useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [TOS, setTOS] = useState(false);
  const isEnabled = name.length > 0 && email.length > 0 && password.length > 0 && confirmPassword.length > 0 && TOS && recaptchaToken !== null;
  const sleep = ms => new Promise(r => setTimeout(r, ms));

<button disabled={!isEnabled}>Sign up</button>;


  function signup() {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    fetch("https://api.getmilos.app/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: email,
        password: password,
        token: recaptchaToken,
      }),
    })
    .then((res) => {
      if (res.status === 201) {
        alert("Successfully signed up");
        sleep(1000);
        window.location.href = "/login";
      } else {
        res.json().then((data) => {
          alert(data.message);
        }
        );
      }
    }
    );
  }


  const changeTOS = (event) => {
    setTOS(event.target.checked);
  }

  return (
    <>
      <IndexNavbar />
    <div className="section section-signup">
      <Container>
        <Row className="row-grid justify-content-between align-items-center">
          <Col lg="6">
            <p className="text-white mb-3">
              Already Have an Account?
            </p>
            <div className="btn-wrapper">
              <Button color="info" to="login" tag={Link}>
                Login Here
              </Button>
            </div>
          </Col>
          <Col className="mb-lg-auto" lg="6">
            <Card className="card-register">
              <CardHeader>
                <CardImg
                  alt="..."
                  src={require("assets/img/square1.png")}
                />
                <CardTitle tag="h4">Register</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="form">
                  <InputGroup
                    className={classnames({
                      "input-group-focus": fullNameFocus
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Full Name"
                      type="text"
                      onFocus={(e) => setFullNameFocus(true)}
                      onBlur={(e) => setFullNameFocus(false)}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup
                    className={classnames({
                      "input-group-focus": emailFocus
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="text"
                      onFocus={(e) => setEmailFocus(true)}
                      onBlur={(e) => setEmailFocus(false)}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup
                    className={classnames({
                      "input-group-focus": passwordFocus
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-lock-circle" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      onFocus={(e) => setPasswordFocus(true)}
                      onBlur={(e) => setPasswordFocus(false)}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup
                    className={classnames({
                      "input-group-focus": confirmPasswordFocus
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-check-2" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      onFocus={(e) => setConfirmPasswordFocus(true)}
                      onBlur={(e) => setConfirmPasswordFocus(false)}
                      onChange={(e) => setConfirmPassword(e.target.value)}

                    />
                  </InputGroup>
                  <FormGroup check className="text-left">
                    <Label check>
                      <Input type="checkbox" onChange={changeTOS} />
                      <span className="form-check-sign" />I agree to the{" "}
                      <a href="https://github.com/CollinKite/Milos-Web#TOS" target={"_blank"} rel={"noreferrer"}>
                        terms and conditions
                      </a>
                      .
                    </Label>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <ReCAPTCHA theme="dark" sitekey="6LdPHi0kAAAAAB9y1A8wns_RqUQS81ZIzGoLPlbR" onChange={(token) => setRecaptchaToken(token)}/>
                <Button className="btn-round" color="info" size="lg" onClick={signup} disabled={!isEnabled}>
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
    </>
  );
}
