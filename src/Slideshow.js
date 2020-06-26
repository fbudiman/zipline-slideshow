import React, { Component } from 'react'
import images from './images.json';
import './Slideshow.css';
import { ReactComponent as LeftArrow } from './icons/left-arrow.svg';
import { ReactComponent as RightArrow } from './icons/right-arrow.svg';

const initialState = {
  images: [],
  loading: true,
  currentIdx: 0,
  current: {}
}

class Slideshow extends Component {

  state = {...initialState};

  componentDidMount() {
    this.setState(() => ({
      images: images.files
    }), this.setCurrentImg);
  };

  setCurrentIdx = (forward) => {
    this.setState((prevState) => ({
      currentIdx: forward ? 
        prevState.currentIdx === images.files.length - 1 ?
          0 : prevState.currentIdx + 1 : prevState.currentIdx === 0 ?
            images.files.length - 1 : prevState.currentIdx - 1
    }), this.setCurrentImg)
  };

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

  render() {
    const { current, loading } = this.state;

    return (
      <div className="Slideshow">
        <div className="Slideshow__left" onClick={() => this.setCurrentIdx(false)}>
          <LeftArrow />
        </div>
        <div className="Slideshow__image">
          {loading ?
            <div className="empty-image"></div> :
            <img src={require(`./images/${current.url}`)} alt={current.title} />
          }
        </div>
        <div className="Slideshow__left" onClick={() => this.setCurrentIdx(true)}>
          <RightArrow />
        </div>
      </div>
    );
  }
}

export default Slideshow;
