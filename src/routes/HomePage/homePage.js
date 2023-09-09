import React, { Component } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd';


@connect(({ homePage, login, event }) => ({

}))
export default class homePage extends Component {


  constructor(props) {
    super(props);
    this.state = {

    };
  }

getImages=()=>{
  const images = [];
  for(let i=0;i<7;i++){
    images.push(
    <div>
      <img style={{ height: "calc(100vh - 140px)", width: '100%' }} src={require(`../../../public/images/yanruyuinages/timg${i+1}.jpg`)}></img>
    </div>);
  }
  return <Carousel autoplay>{images}</Carousel>;
}

  render() {
    return (
      <div style={{ width: '100%', height: "calc(100vh - 129px)", overflow: 'auto', background: "white" }}>
        {this.getImages()}
      </div>
    );
  }
}
