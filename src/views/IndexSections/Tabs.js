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
import classnames from "classnames";
// reactstrap components
import {
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

export default function Tabs() {
  const [iconTabs, setIconsTabs] = React.useState(1);
  return (
    <div className="section section-tabs">
      <Container>
        <div className="title">
          <h3 className="mb-3">About</h3>
        </div>
        <Row>
          <Col className="ml-auto mr-auto" md="10" xl="6">
            <div className="mb-3">
            </div>
            <Card>
              <CardHeader>
                <Nav className="nav-tabs-info" role="tablist" tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 1
                      })}
                      onClick={(e) => setIconsTabs(1)}
                      href="#about"
                    >
                      <i className="tim-icons icon-paper" />
                      About The App
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 2
                      })}
                      onClick={(e) => setIconsTabs(2)}
                      
                    >
                      <i className="tim-icons icon-single-02" />
                      About Me
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>
              <CardBody>
                <TabContent className="tab-space" activeTab={"link" + iconTabs}>
                  <TabPane tabId="link1">
                    <p>
                    MILOS 
                    is my capstone project for <a href="https://www.neumont.edu" target="_blank" rel="noreferrer">Neumont College of Computer Science.</a> <br/> <br/>
                    MILOS helps users gnerate blog posts from videos using AI. 
                    It uses <a href="https://github.com/openai/whisper" target="_blank" rel="noreferrer">OpenAI's Whisper AI Model</a> to transcribe audio.
                    and then using a pre-trained GPT-3 model, it processes the transcriptions, and automatically generates an organized blog that follows the video.
                    </p>
                  </TabPane>
                  <TabPane tabId="link2">
                    <img alt="..." class="img-fluid rounded-circle shadow" src="https://media.licdn.com/dms/image/D5603AQH3D_ws8aCFOg/profile-displayphoto-shrink_400_400/0/1673111179485?e=1680134400&v=beta&t=C8Qrp_FthROMO7XtVHGhH0zygfC9DKRA3BO8oDGWY-M" style={{width: "150px", marginBottom: "10px", marginLeft:"35%"}}></img>
                    <p>
                      My Name's Collin Kite, I love learning new things, and building fullstack apps! <br />
                      <br />
                      I'm a computer science student and have worked hard to earn my degree in just two years! (Oct 2021 - Dec 2023). During my studies, I've built full-stack applications for desktop, mobile, and web using various programming languages and technologies including Java, C#, Python, C++, Git, SQL, MongoDB, and more!
                    </p>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
