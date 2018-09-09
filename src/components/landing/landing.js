import React, { Component } from "react";
import Particles from "react-particles-js";
import Fade from "react-reveal/Fade";
import Features from "./../Features/Features";
import Footer from "./../Footer/Footer";
import FloatingActionButtons from "../Buttons/Buttons";

import "./style.css";

class landing extends Component {
  render() {
    return (
      <div id="top">
        <div className="landing-title">
          <div className="particlesHider">
            <Particles
              className="particlesHider"
              params={{
                particles: {
                  number: {
                    value: 55,
                    density: {
                      enable: false
                    }
                  },
                  color: {
                    value: ["#ff524e", "#50a3e3", "#BA8F7F"]
                  },
                  size: {
                    value: 4,
                    random: true
                  },
                  line_linked: {
                    enable: false
                  },
                  move: {
                    bounce: false,
                    random: true,
                    speed: 10,
                    direction: "top-right",
                    out_mode: "out"
                  }
                },
                interactivity: {
                  detect_on: "canvas",
                  events: {
                    onhover: {
                      enable: true,
                      mode: "grab"
                    },
                    resize: true
                  },
                  modes: {
                    grab: {
                      distance: 140
                    },
                    bubble: {
                      distance: 500,
                      size: 4,
                      duration: 0.3,
                      opacity: 1,
                      speed: 3
                    }
                  }
                }
              }}
            />
          </div>
          <div className="app-intro">
            <h3 id="main-text">
              <Fade top delay={400}>
                S o c i a L i s t a
              </Fade>
            </h3>
            <Fade delay={1600}>
              <h5 className="slog">
                <span id="slogan">Be Simple,</span>{" "}
                <span id="alogan">Be Social</span>
              </h5>
            </Fade>
            <Fade delay={3000}>
              <div id="connect-button">
                <FloatingActionButtons>connect</FloatingActionButtons>
              </div>
            </Fade>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default landing;
