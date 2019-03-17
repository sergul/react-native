import React, { PureComponent } from 'react';
import { View, Text, Keyboard, FlatList, Dimensions } from 'react-native';
import CommonStyles from '../../styles/commons';

class List extends PureComponent {
  static defaultProps = {
    rowRenderer: ({ item, index }) => {
      return (
        <View>
          <Text>
            {item.text}
            {index}
          </Text>
        </View>
      );
    },
    data: [{ id: '0', text: 'row 1' }, { id: '1', text: 'row 2' }]
  }

  constructor(props, defaultProps) {
    super(props, defaultProps);
    this.state = {
    };
    this._rowRenderer = props.rowRenderer;
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.onKeyboardOpen,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.onKeyboardDismiss,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onKeyboardOpen = ({ endCoordinates: { height } }) => {
    // const { data } = { ...this.props };
    // if (data.length > 4) {
    //   setTimeout(() => {
    //     this._myRef.scrollToIndex({
    //       index: 80,
    //       animated: true
    //     });
    //   }, 100);
    // }
    this._myRef.y = 200;
  }

  onKeyboardDismiss = () => {
    this.setState(() => {
      return {
        containerPaddingBottom: 0
      };
    });
  }

  onScrollStart = () => {
    const { scrollStartCallback } = { ...this.props };
    if (scrollStartCallback) {
      scrollStartCallback();
    }
  }

  onScrollEnd = () => {
    const { scrollEndCallback } = { ...this.props };
    if (scrollEndCallback) {
      scrollEndCallback();
    }
  }

  render() {
    const { data, extraData } = { ...this.props };
    const container = CommonStyles.containerStandard();
    return (
      <View style={{ ...container }}>
        <FlatList
          style={{ width: '100%', flex: 0 }}
          ref={(ref) => {
            this._myRef = ref;
          }}
          data={data}
          extraData={extraData}
          renderItem={this._rowRenderer}
          onScrollBeginDrag={this.onScrollStart}
          onScrollEndDrag={this.onScrollEnd}
          keyExtractor={(item) => {
            return item.id;
          }}
        />
      </View>
    );
  }
}

export default List;
