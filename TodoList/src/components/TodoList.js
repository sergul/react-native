import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import List from './reusable/List';
import CommonStyles from '../styles/commons';

class TodoList extends PureComponent {
  state = {
  };

  componentDidUpdate(prevProps) {
    const { todoList } = { ...this.props };
  }

  static getDerivedStateFromProps(props, state) {
    const { todoList } = { ...props };
    return state;
  }

  render() {
    const { todoList } = { ...this.props };
    return (
      <View style={CommonStyles.containerStandard()}>
        <List
          data={todoList}
          rowRenderer={({ item }) => {
            return (
              <View style={CommonStyles.containerStandard()}>
                <Text>
                  {item && item.text}
                </Text>
                <Button title={item.id} />
              </View>
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
