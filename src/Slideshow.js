import React, { Component } from 'react'
import images from './images.json';
import './Slideshow.css';
import { ReactComponent as LeftArrow } from './icons/left-arrow.svg';
import { ReactComponent as RightArrow } from './icons/right-arrow.svg';

const initialState = {
  images: [],
  loading: true,
  currentIdx: 0,
  current: {},
  displayViews: false
}

class Slideshow extends Component {

  state = {...initialState};

  componentDidMount() {
    this.setState(() => ({
      images: images.files
    }), this.setCurrentImg);
  };

  // index should loop around once it reaches both ends (start/finish)
  setCurrentIdx = (forward) => {
    this.setState((prevState) => ({
      currentIdx: forward ? 
        prevState.currentIdx === images.files.length - 1 ?
          0 : prevState.currentIdx + 1 : prevState.currentIdx === 0 ?
            images.files.length - 1 : prevState.currentIdx - 1
    }), this.setCurrentImg)
  };

  // update images state also to keep track of each image's views
  setCurrentImg = () => {
    const { images: imgs, currentIdx } = this.state;
    const current = {
      ...imgs[currentIdx],
      views: imgs[currentIdx].views + 1
    };
    const idx = imgs.findIndex((img) => img.id === current.id);
    imgs.splice(idx, 1, current);

    this.setState(() => ({ 
      images: [...imgs],
      current,
      loading: false
    }));
  }

  // allows for use of keyboard to shuffle through images (L/R only)
  handleKeyDown = (e) => {    
    if (e.keyCode === 37) {
      this.setCurrentIdx(false);
    } else if (e.keyCode === 39) {
      this.setCurrentIdx(true);
    }
  }

  // toggles on/off the display for number of views
  handleToggleViews = () => {
    this.setState((prevState) => ({
      displayViews: !prevState.displayViews
    }));
  }

  render() {
    const { current, loading, displayViews } = this.state;

    return (
      <div className="Slideshow" tabIndex="1" onKeyDown={this.handleKeyDown}>
        <div className="Slideshow__left" onClick={() => this.setCurrentIdx(false)}>
          <LeftArrow />
        </div>
        <div className="Slideshow__image" onClick={this.handleToggleViews}>
          {loading ?
            <div className="empty-image"></div> :
            <img src={require(`./images/${current.url}`)} alt={current.title} />
          }
        </div>
        {displayViews && <div className="Slideshow__views">{current.views}</div>}
        <div className="Slideshow__left" onClick={() => this.setCurrentIdx(true)}>
          <RightArrow />
        </div>
      </div>
    );
  }
}

export default Slideshow;
