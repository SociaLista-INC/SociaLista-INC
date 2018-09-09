import React, { Component } from "react";
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
            reach out to us at the links below. We apprecite your feedback! This
            site is built for demonstration and learning purposes only!
          </h5>
        </div>
      </div>
    );
  }
}

export default Contact;
