import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TodoInput from './reusable/InputField';
import CommonStyles from '../styles/commons';
import TodoActions from '../store/todo/actions';

let getTodoTextCallback;

class AddTodo extends PureComponent {
  onAddTodoSubmit = () => {
    if (getTodoTextCallback) {
      const todoText = getTodoTextCallback();
      if (todoText.trim() !== '') {
        const { onAddTodo } = { ...this.props };
        onAddTodo(todoText);
      }
    }
  }

  getTodoText = (callback) => {
    getTodoTextCallback = callback;
  }

  render() {
    const todoInputContainer = CommonStyles.containerStandard();
    todoInputContainer.flexDirection = 'row';
    todoInputContainer.paddingLeft = 5;
    todoInputContainer.paddingRight = 5;
    todoInputContainer.flex = 0;
    return (
      <View
        style={{ backgroundColor: `${CommonStyles.lightBlue}`,
          borderRadius: CommonStyles.borderRadius,
          shadowRadius: CommonStyles.borderRadius,
          elevation: CommonStyles.elevation,
          ...todoInputContainer }}
      >
        <TodoInput
          fontFamily="OpenSans-Regular"
          outerStyles={{ borderWidth: 0,
            width: '100%',
            fontSize: 25,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 5,
            paddingBottom: 5 }}
          placeholderText="Type your doable ..."
          cursorColor={CommonStyles.brown}
          returnText={this.getTodoText}
          enterPressCallback={this.onAddTodoSubmit}
        />
      </View>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTodo: todoText => dispatch(TodoActions.add(todoText)),
    onDeleteTodo: id => dispatch(TodoActions.delete(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
