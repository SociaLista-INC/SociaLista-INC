import React, { Component } from "react";

import "./Footer.css";

// import Avatar from "@material-ui/core/Avatar";

class Footers extends Component {
  render() {
    return (
      <div className="fotter-main">
        <div className="flexing-each-eng">
          <div>
            <img
              className="our-imgs"
              width="90px"
              src="https://avatars1.githubusercontent.com/u/39711965?s=460&v=4"
              alt="Abdul"
            />
          </div>
          <div className="our-info">
            <div>Abdul Alhajkanjo</div>
            <a href="https://www.linkedin.com/in/abdul-alhajkanjo-355911155/">
              <img
                width="20px"
                src="https://image.flaticon.com/icons/svg/174/174857.svg"
                alt="Abdul Alhajkanjo"
              />
            </a>
            <a>
              <img
                width="20px"
                src="https://image.flaticon.com/icons/svg/25/25657.svg"
                alt="Abdul K"
              />
            </a>
          </div>
        </div>
        <div className="flexing-each-eng">
          <div>
            <img
              className="our-imgs"
              width="90px"
              src="https://media.licdn.com/dms/image/C4D03AQEsv9f8NiLcNA/profile-displayphoto-shrink_200_200/0?e=1541635200&v=beta&t=pFmvHagh4nrvIqng1ohrkFsPe1krHwtf09lSVnl2LLs"
              alt="Abhishek"
            />
          </div>
          <div className="our-info">
            <div>Abhishek Duggal</div>
            <a href="https://www.linkedin.com/in/abhishek-duggal-15149b17/">
              <img
                width="20px"
                src="https://image.flaticon.com/icons/svg/174/174857.svg"
                alt="Abhishek Duggal"
              />
            </a>
            <a>
              <img
                width="20px"
                src="https://image.flaticon.com/icons/svg/25/25657.svg"
                alt="Abhishek D"
              />
            </a>
          </div>
        </div>
        <div style={{ paddingLeft: "40px" }} className="flexing-each-eng">
          <div>
            <img
              className="our-imgs"
              width="90px"
              src="https://avatars0.githubusercontent.com/u/29470373?s=460&v=4"
              alt="Kaustubh"
            />
          </div>
          <div className="our-info">
            <div>Kaustubh Deshpande</div>
            <a href="https://www.linkedin.com/in/kaustubh-deshpande-45649a162/">
              <img
                width="20px"
                src="https://image.flaticon.com/icons/svg/174/174857.svg"
                alt="Kaustubh Deshpande"
              />
            </a>
            <a>
              <img
                width="20px"
                src="https://image.flaticon.com/icons/svg/25/25657.svg"
                alt="Kaustubh D"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footers;
