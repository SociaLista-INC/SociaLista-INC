import React, { Component } from "react";

import Particles from "react-particles-js";

import Features from "./../Features/Features";
import Contact from "./../Contact/Contact";
import Footers from "./../Footer/Footer";
import FloatingActionButtons from "../Buttons/Buttons";

import "./style.css";

class landing extends Component {
  goLogin() {
    window.location.href = "/auth";
  }
  render() {
    return (
      <div id="top">
        <div className="landing-body">
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
              <h3 id="main-text">S o c i a L i s t a</h3>
              <h5 id="slogan">Be Simple, Be Social</h5>
              <div id="connect-button">
                <FloatingActionButtons>connect</FloatingActionButtons>
              </div>
            </div>
          </div>
          <Features />
          <Contact />
        </div>
        <Footers />
      </div>
    );
  }
}

export default landing;
