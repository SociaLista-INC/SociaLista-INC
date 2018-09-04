import React from "react";
// import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Lightbox from "react-images";
import axios from "axios";

class Gallery1 extends React.Component {
  constructor() {
    super();
    this.state = { photos: [], currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  componentDidMount() {
    this.getPictures();
  }

  getPictures() {
    axios
      .get("/api/getgallery/images")
      .then(res => this.setState({ photos: res.data }));
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }
  render() {
    console.log(this.state.photos);

    let mappedPhotoes = this.state.photos
      .filter(e => {
        console.log(!e.image_url.toLowerCase().includes(".mp3"));

        return (
          e.image_url.toLowerCase().includes(".png") ||
          e.image_url.toLowerCase().includes(".jpg") ||
          e.image_url.toLowerCase().includes(".jpeg")
        );
      })
      .map((e, i) => {
        console.log(e);
        return {
          src: e.image_url,
          width: Math.floor(Math.random() * 3) + 1,
          height: Math.floor(Math.random() * 2) + 1
        };
      });

    return (
      <div>
        {console.log(mappedPhotoes)}
        <Gallery
          caption={"asdasds"}
          photos={mappedPhotoes}
          onClick={this.openLightbox}
        />
        <Lightbox
          images={mappedPhotoes}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          caption="hello"
        />
      </div>
    );
  }
}
export default Gallery1;
