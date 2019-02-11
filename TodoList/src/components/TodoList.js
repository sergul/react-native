import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import List from './reusable/List';
import CommonStyles from '../styles/commons';
import TodoListItem from './TodoListItem';

class TodoList extends PureComponent {
  state = {
  };

  componentDidUpdate(prevProps) {
  }

  static getDerivedStateFromProps(props, state) {
    return state;
  }

  render() {
    const { todoList } = { ...this.props };
    const container = CommonStyles.containerStandard();
    container.paddingTop = 20;
    return (
      <View style={container}>
        <List
          data={todoList}
          rowRenderer={({ item }) => {
            return (
              <TodoListItem
                id={item.id}
                text={item.text}
              />
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todoList: state.todo.todoList
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
