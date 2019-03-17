import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import CommonStyles from '../styles/commons';
import TodoActions from '../store/todo/actions';

class MainScreen extends PureComponent {
  componentDidMount() {
  }

  render() {
    const container = CommonStyles.containerStandard();
    container.justifyContent = 'flex-start';
    container.paddingTop = 10;
    container.paddingLeft = 10;
    container.paddingRight = 10;
    const { todoList, selected, edited } = { ...this.props };
    return (
      <View
        style={container}
      >
        <AddTodo />
        <TodoList
          data={todoList}
          selected={selected}
          edited={edited}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todoList: state.todo.todoList,
    selected: state.todo.selected,
    edited: state.todo.edited
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTodo: todoText => dispatch(TodoActions.add(todoText)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
