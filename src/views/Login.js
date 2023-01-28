import React, {useState} from "react";
import classnames from "classnames";
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
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';

export default function Signup() {
  if(localStorage.getItem("token") !== null) {
    window.location.href = "/";
  }
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const isEnabled = email.length > 0 && password.length > 0 && recaptchaToken !== null;
  function toastMsg(message, boolSuccess)
  {
    const props = {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    }
    if (boolSuccess)
    {
      toast.success(message, props);
    }
    else
    {
      toast.error(message, props);
    }
  }



  function login() {
    fetch("https://api.getmilos.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
        token: recaptchaToken,
        rememberMe: rememberMe,
      }),
    })
    .then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
            localStorage.setItem("token", data.token);
            toastMsg("Successfully Logged In", true);
            setTimeout(function(){ window.location.href = "/"; }, 4000);
        });
      } else {
        res.json().then((data) => {
          toastMsg(data.message, false);
        }
        );
      }
    }
    );
  }

  const toggleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  }
    

  return (
    <>
      <IndexNavbar />
    <div className="section section-signup">
      <Container>
        <Row className="row-grid justify-content-between align-items-center">
          <Col lg="6">
            <p className="text-white mb-3">
              Don't Have an Account?
            </p>
            <div className="btn-wrapper">
              <Button color="info" href="/signup">
                Sign Up Here
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
                <CardTitle tag="h4">Login</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="form">
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
                  <FormGroup check className="text-left">
                    <Label check>
                      <Input type="checkbox" onChange={toggleRememberMe}  />
                      <span className="form-check-sign" />Rememer Me
                    </Label>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <ReCAPTCHA theme="dark" sitekey="6LdPHi0kAAAAAB9y1A8wns_RqUQS81ZIzGoLPlbR" onChange={(token) => setRecaptchaToken(token)}/>
                <Button className="btn-round" color="info" size="lg" onClick={login} disabled={!isEnabled}>
                  Login
                </Button>
                <ToastContainer limit={1}/>
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
