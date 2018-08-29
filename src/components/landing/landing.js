import React, { Component } from "react";
import Particles from "react-particles-js";
import "./style.css";
// import MainLogo from "../../images/MainLogo.png";
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
          <div className="landing-title">
            <div className="particlesHider">
              <Particles
                className="particlesHider"
                params={{
                  particles: {
                    number: {
                      value: 160,
                      density: {
                        enable: false
                      }
                    },
                    size: {
                      value: 3,
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
                      speed: 1,
                      direction: "random",
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
              <button
                id="connect-button"
                className="btn yellow"
                onClick={this.goLogin}
              >
                Connect
              </button>
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
