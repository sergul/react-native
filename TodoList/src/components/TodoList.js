import React, { PureComponent } from 'react';
import { FlatList, View, Keyboard } from 'react-native';
import TodoListItem from './TodoListItem';
import CommonStyles from '../styles/commons';

class TodoList extends PureComponent {
  _keyExtractor = item => item.id;

  _renderItem = ({ item }) => {
    const { selected = new Map(), edited = new Map() } = { ...this.props };
    const editedText = edited.get(item.id);
    if (editedText && editedText.trim() !== '') {
      item.text = editedText.trim();
    }
    return (
      <TodoListItem
        id={item.id}
        selected={!!selected.get(item.id)}
        text={item.text}
      />
    );
  }

  _onScrollStart = () => {
    Keyboard.dismiss();
  }

  render() {
    const { data } = { ...this.props };
    return (
      <View
        style={CommonStyles.containerStandard()}
      >
        <FlatList
          style={{ width: '100%' }}
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          initialNumToRender={300}
          onScrollBeginDrag={this._onScrollStart}
        />
      </View>
    );
  }
}

export default TodoList;
