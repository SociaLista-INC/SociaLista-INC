import React, { Component } from "react";
import { Footer } from "react-materialize";
import "./Footer.css";

import Avatar from "@material-ui/core/Avatar";

class Footers extends Component {
  render() {
    return (
      <div className="footerBody">
        <Footer id="myfooter">
          {" "}
          <h4
            style={{ marginTop: "0px", marginBottom: "0px", paddingTop: "2vh" }}
          >
            Project by Kaustubh Deshpande, Abdul Kanjo, Abhishek Duggal
          </h4>
          <div>
            <Avatar
              style={{
                width: 60,
                height: 60
              }}
              src="https://avatars0.githubusercontent.com/u/29470373?s=460&v=4"
              alt="Kaustubh Deshpande"
            />
            <a href="https://github.com/KaustubhDeshpandeDev">
              <img
                alt="icon"
                src="https://image.flaticon.com/icons/svg/25/25231.svg"
                width="25px"
              />
            </a>
            <a href="https://www.google.com">
              <img
                alt="icon"
                src="https://image.flaticon.com/icons/svg/34/34405.svg"
                width="25px"
              />
            </a>
          </div>
          <div>
            <Avatar
              style={{
                width: 60,
                height: 60
              }}
              src="https://media.licdn.com/dms/image/C4E03AQFzKdx-TsfaQA/profile-displayphoto-shrink_200_200/0?e=1541030400&v=beta&t=5a3iv_5kuc54UaTX_KQ7YsMuZhDgyGl6Y_HGTfXyNbk"
              alt="Abdul Kanjo"
            />
            <a href="https://github.com/KaustubhDeshpandeDev">
              <img
                alt="icon"
                src="https://image.flaticon.com/icons/svg/25/25231.svg"
                width="25px"
              />
            </a>
            <a href="https://www.google.com">
              <img
                alt="icon"
                src="https://image.flaticon.com/icons/svg/34/34405.svg"
                width="25px"
              />
            </a>
          </div>
          <div>
            <Avatar
              style={{
                width: 60,
                height: 60
              }}
              src="https://media.licdn.com/dms/image/C4D03AQEsv9f8NiLcNA/profile-displayphoto-shrink_200_200/0?e=1541030400&v=beta&t=bCRpktbCgnuidiTFHMbwDdxKJNwGOcEYdnVImvblvIQ"
              alt="Abhishek Duggal"
            />
            <a href="https://github.com/KaustubhDeshpandeDev">
              <img
                alt="icon"
                src="https://image.flaticon.com/icons/svg/25/25231.svg"
                width="25px"
              />
            </a>
            <a href="https://www.google.com">
              <img
                alt="icon"
                src="https://image.flaticon.com/icons/svg/34/34405.svg"
                width="25px"
              />
            </a>
          </div>
          <p
            className="grey-text text-lighten-4"
            style={{
              marginTop: "1px",
              marginBottom: "0px",
              fontSize: "2vh",
              padding: "0px"
            }}
          >
            This website was coded as an example to demonstrate our skills. This
            website is active, with active users using it for its intended
            purpose. If you have a need for a custom website or software, feel
            free to reach out to us through of of our social media links below.
          </p>
        </Footer>
      </div>
    );
  }
}

export default Footers;
