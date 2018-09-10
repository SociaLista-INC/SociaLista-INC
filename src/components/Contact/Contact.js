// import React, { Component } from "react";
// import FeaturesPictureTwo from "../../FeaturesPictureTwo.png";
// import "./FeatureTwo.css";

// class FeatureTwo extends Component {
//   render() {
//     return (
//       <div id="FeatureTwo-Background">
//         <div id="features" className="features">
//           <h2 className="center-align">Features Two</h2>
//           <div className="rows">
//             <h5>Put mobile mockup here </h5>
//           </div>
//           {/* <img id="Features-Picture-Two" src={FeaturesPictureTwo} alt="test" /> */}
//         </div>
//       </div>
//     );
//   }
// }

// export default FeatureTwo;

import React, { Component } from "react";

import { Row, Col } from "react-materialize";

import "./Contact.css";

class Contact extends Component {
  render() {
    return (
      <div id="contact-background">
        <div id="contact" className="features">
          <h2 id="contact-header" className="center-align">
            Contact Us
          </h2>
          <h5 className="contact-small-text">
            We at SociaLista hope that you were able to benefit from our social
            media website. If you have any questions, or suggestions, please
            reach out to us at the links below. We apprecite your feedback!
          </h5>
          <div className="rows spaced-rows" />
          <Row>
            <Col s={4} className="grid-example">
              <a
                className="grey-text text-lighten-3 fa fa-linkedin fa-4x"
                href="https://www.linkedin.com/in/bryce-hull-9a9429123/"
              >
                {" "}
              </a>
            </Col>
            1
            <Col s={4} className="grid-example">
              <a
                className="grey-text text-lighten-3 fa fa-twitter fa-4x"
                href="https://twitter.com/BryceHull1"
              >
                {" "}
              </a>
            </Col>
            <Col s={4} className="grid-example">
              <a
                className="grey-text text-lighten-3 fa fa-github fa-4x"
                href="https://github.com/bahull"
              >
                {" "}
              </a>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Contact;
