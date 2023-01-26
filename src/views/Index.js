import React from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";
import Aos from "aos";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


// sections for this page/view
import Tabs from "views/IndexSections/Tabs.js";

export default function Index() {
  Aos.init();
  console.log("AOS initialized");

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
      await console.log(container);
  }, []);

  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
      <div id="particles-js">
        <Particles
            id="tsparticles"

            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                fullScreen: false,
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "grab",
                        },
                        resize: false,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: ["#fcec52", "#EF2D56", "#0cce6b", "#33b1f8"],
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 0.5,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        directions: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.8,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 2, max: 3 },
                    },
                },
                detectRetina: true,
            }}
        />
        <PageHeader/>
      </div>
        </div>

        <div id="about" className="main aos-init aos-animate" data-aos="zoom-in" data-aos-duration="500">
          <Tabs />
        </div>
        <Footer />
    </>
  );
}
