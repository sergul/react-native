import React, { PureComponent } from 'react';
import { View, Keyboard, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import CommonStyles from '../styles/commons';
import InputField from './reusable/InputField';
import TodoActions from '../store/todo/actions';
import getStore from '../store/configureStore';

class TodoListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.store = getStore();
    this.store.subscribe(this.onTodoAdded);
  }

  onTodoAdded = () => {
    // console.log(store.getState());
  }

  onTextInputFocus = () => {
    const { id, onRowPress } = { ...this.props };
    onRowPress(id);
  };

  onTextInputBlur = () => {
    console.log('on text input blur');
  };

  onTextInputTouchStart = () => {
  }

  onSubmit = () => {
    const { onEditTodoText, id } = { ...this.props };
    if (this.getTodoTextCallback) {
      const text = this.getTodoTextCallback().trim();
      onEditTodoText({ id, text });
    }
    Keyboard.dismiss();
  };

  getTodoText = (callback) => {
    this.getTodoTextCallback = callback;
  }

  _onPress = () => {
    const { id, onRowPress } = { ...this.props };
    onRowPress(id);
  }

  render() {
    const { text, id, selected } = { ...this.props };
    const container = CommonStyles.containerStandard();
    container.borderBottomWidth = selected ? 1 : 0.5;
    container.height = 80;
    container.borderColor = selected ? CommonStyles.lightBrown : CommonStyles.lightGray;
    return (
      <TouchableOpacity
        onPress={this._onPress}
      >
        <View
          style={{ ...container }}
        >
          <InputField
            fontFamily="OpenSans-Regular"
            outerStyles={{ borderWidth: 0,
              width: '100%',
              fontSize: 15,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 10,
              paddingBottom: 0 }}
            focusCallback={this.onTextInputFocus}
            blurCallback={this.onTextInputBlur}
            enterPressCallback={this.onSubmit}
            placeholderText="Type your doable ..."
            cursorColor={CommonStyles.brown}
            returnText={this.getTodoText}
            text={text}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeTodoIndex: state.todo.activeTodoIndex
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditTodoText: id => dispatch(TodoActions.editText(id)),
    onRowPress: id => dispatch(TodoActions.setSelected(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem);
