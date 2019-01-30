import React, { Component } from 'react';
import Svg, { Defs, LinearGradient as RNLinearGradient, Rect, Stop } from 'react-native-svg';
import { Dimensions, StatusBar } from 'react-native';
import getAnglePercentageObject from './utils/getAnglePercentageObject';

const { width, height } = Dimensions.get('window');

class LinearGradient extends Component {
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', (dimensions) => {
      console.log(dimensions.window);
      this.setState({
        _width: dimensions.window.width,
        _height: dimensions.window.height - (StatusBar.currentHeight || 0)
      });
    });
    this.state = {
      _width: width,
      _height: (height - (StatusBar.currentHeight || 0))
    };
  }

  render() {
    const { angle, colorList } = this.props;
    const angleObj = getAnglePercentageObject(angle);
    const { _width, _height } = this.state;
    const stops = [];
    const createStops = () => {
      for (let i = 0; i < colorList.length; ++i) {
        stops.push(<Stop key={new Date().getTime()} offset={colorList[i].offset} stopColor={colorList[i].color} stopOpacity={colorList[i].opacity} />);
      }
    };
    createStops();
    return (
      <Svg
        width={_width}
        height={_height}
      >
        <Defs>
          <RNLinearGradient
            id="grad"
            x1={`${angleObj.x1}%`}
            y1={`${angleObj.y1}%`}
            x2={`${angleObj.x2}%`}
            y2={`${angleObj.y2}%`}
          >
            {
              stops
            }
          </RNLinearGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          stroke="green"
          strokeWidth="0"
          fill="url(#grad)"
        />
      </Svg>
    );
  }
}

export default LinearGradient;
