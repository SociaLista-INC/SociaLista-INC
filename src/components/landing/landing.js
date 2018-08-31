import React, { Component } from "react";
import Particles from "react-particles-js";
import "./style.css";
import FloatingActionButtons from "../Buttons/Buttons";

import Features from "../Features/Features";
import FeatureTwo from "../FeatureTwo/FeatureTwo";
import Footer from "../Footer/Footer";

class landing extends Component {
  goLogin() {
    window.alert("this will take you to the login or sign up");
  }
  render() {
    return (
      <div id="top">
        <div className="landing-body">
          <div className="container">
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
                        // anim: {
                        //   speed: 6,
                        //   opacity_min: 1,
                        //   size_min: 0.3
                        // }
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
                {/* <img className="centered" src={MainLogo} /> */}
                <div
                  style={{
                    fontFamily: "Playfair Display",
                    color: "white",
                    fontSize: "55px"
                  }}
                >
                  S o c i a L i s t a
                </div>
                <div
                  id="slogan"
                  style={{
                    fontFamily: "Roboto",
                    color: "white",
                    fontSize: "20px"
                  }}
                >
                  Be Simple, Be Social
                </div>
                <div id="connect-button">
                  <FloatingActionButtons />
                </div>
              </div>
            </div>
          </div>
          <Features />
          <FeatureTwo />
        </div>
        <Footer />
      </div>
    );
  }
}
export default landing;
