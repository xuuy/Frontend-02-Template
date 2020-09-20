import { Component, h, render } from "./f7.js";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wrapper">
        <p className="title">轮播图</p>
        <label for="autoplay">
          自动轮播
          <input type="checkbox" id="autoplay" />
        </label>

        <label for="duration">
          时长
          <input type="range" id="duration" />
        </label>

        <label for="timing">
          贝塞尔曲线
          <select>
            <option>ease</option>
            <option>easeIn</option>
            <option>easeOut</option>
          </select>
        </label>
        {this.props.children}
      </div>
    );
  }
}

const Carousel = (props) => {
  //鼠标事件
  setTimeout(() => {
    const container = document.getElementById('container')

    let position = 0;
    container.addEventListener('mousedown', event => {
      let children = container.children;
      let startX = event.clientX;
  
      let move = event => {
        let x = event.clientX - startX;
        for(let child of children){
          child.style.transition = 'none';
          child.style.transform = `translateX(${- position * 500 + x}px)`;
        }
      }
  
      let up = event => {
        let x = event.clientX - startX;
        position = position -  Math.round(x / 500);
        for(let child of children){
          child.style.transition = '';
          child.style.transform = `translateX(${- position * 500}px)`;
        }
  
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mousemove', up);
      }
  
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
  
    })
  })
  
  // setInterval(() => {
  //   const len = props.images.length
  //   let currentIndex = 0
  //   const container = document.getElementById('container')
  //   const children = container.children
  //   let nextIndex = (currentIndex + 1) % len

  //   let current = children[currentIndex]
  //   let next = children[nextIndex]

  //   next.style.transition = 'none'
  //   next.style.transform = `translateX(${100 - nextIndex * 100}%)`
  //   console.log(currentIndex, nextIndex)
    
  //   setTimeout(() => {
  //     next.style.transition = ''
  //     current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
  //     next.style.transform = `translateX(${- nextIndex * 100}%)`
  //     currentIndex = nextIndex
  //   }, 16)
  // }, 2000)
  return (
    <div className="carousel" id="container">
      {props.images.map(url => (
        <div className="carousel-item" style={{ backgroundImage: `url(${url})` }}></div>
      ))}
    </div>
  );
};

render(
  <App>
    <Carousel
      images={[
        "./images/w1.jpg",
        "./images/w2.jpg",
        "./images/w3.jpg",
        "./images/w4.jpg",
        "./images/w5.jpg",
      ]}
    />
  </App>,
  document.getElementById("root")
);