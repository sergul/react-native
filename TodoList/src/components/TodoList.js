import React, { PureComponent } from 'react';
import { FlatList, View, KeyboardAvoidingView, Keyboard } from 'react-native';
import TodoListItem from './TodoListItem';
import CommonStyles from '../styles/commons';

class TodoList extends PureComponent {
   _contentOffset = 5;

  _keyExtractor = item => item.id;

  _renderItem = ({ item }) => {
    const { selected, edited } = { ...this.props };
    const isSelected = (selected && selected[item.id]) || false;
    const editedText = (edited && edited[item.id]) || '';
    if (editedText && editedText.trim() !== '') {
      item.text = editedText.trim();
    }
    return (
      <TodoListItem
        id={item.id}
        isSelected={isSelected}
        text={item.text}
        getParentContentVerticalOffset={this._getContentOffset}
      />
    );
  }

  _onScrollStart = () => {
    Keyboard.dismiss();
  }

  _onScroll = (event) => {
    this._contentOffset = event.nativeEvent.contentOffset.y;
  }

  _getContentOffset = () => {
    return this._contentOffset;
  }

  render() {
    const { data } = { ...this.props };
    const container = CommonStyles.containerStandard();
    return (
      <View
        ref={(component) => {
          this._container = component;
        }}
        style={container}
      >
        <FlatList
          style={{ width: '100%' }}
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          initialNumToRender={300}
          onScrollBeginDrag={this._onScrollStart}
          onScroll={this._onScroll}
        />
      </View>
    );
  }
}

export default TodoList;
