import React, { Component } from "react";
import Particles from "react-particles-js";
import "./style.css";
import FloatingActionButtons from "../Buttons/Buttons";
import MainLogo from "../../../src/LogoMakr_7PRQtL.png";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import NavigationIcon from "@material-ui/icons/Navigation";

// other pages
// import Description from "./../Description/Description";
// import Contact from "./../Contact/Contact";
// import Footers from "./../Footer/Footer";
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
                        value: 50,
                        density: {
                          enable: false
                        }
                      },
                      color: {
                        value: ["#ff524e", "#50a3e3", "#BA8F7F"]
                      },
                      size: {
                        value: 4,
                        random: true,
                        anim: {
                          speed: 4,
                          size_min: 0.3
                        }
                      },
                      line_linked: {
                        enable: false
                      },
                      move: {
                        bounce: false,
                        random: true,
                        speed: 6,
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
                    fontFamily: "Playfair Display ,serif",
                    color: "white",
                    fontSize: "55px"
                  }}
                >
                  S o c i a L i s t a
                </div>
                <div
                  id="slogan"
                  style={{
                    fontFamily: "Playfair Display ,serif",
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
          {/* <Features />
          <Contact /> */}
        </div>
        {/* <Footers /> */}
      </div>
    );
  }
}
export default landing;
