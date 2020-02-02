import React, { PureComponent } from 'react';
import { View, LayoutAnimation, Dimensions, Easing, Animated, UIManager, Platform } from 'react-native';
import { connect } from 'react-redux';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import CommonStyles from '../styles/commons';
import TodoActions from '../store/todo/actions';

const { width, height } = Dimensions.get('window');

class MainScreen extends PureComponent {
  constructor(props) {
    super(props);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.moveYValue = new Animated.Value(0);

    this.moveYRules = this.moveYValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
  }

  componentWillMount() {
    this.container = CommonStyles.containerStandard();
    this.container.justifyContent = 'flex-start';
    this.container.paddingTop = 10;
    this.container.paddingLeft = 10;
    this.container.paddingRight = 10;
    this.container.borderWidth = 1;
  }

  componentDidMount() {
  }

  animateYPosition = (targetPosition, distance) => {
    if (distance > 0) {
      const factor = 400 / distance;
      const time = factor * 300;
      Animated.timing(this.moveYValue, {
        toValue: targetPosition,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true
      }).start();
    }
  }

  componentDidUpdate = () => {
    const { selected, selectedTodoYPos = 0 } = { ...this.props };
    let isSelected = false;
    if (selected) {
      const keys = Object.keys(selected);
      const selectedId = keys.length > 0 ? keys[0] : '';
      isSelected = (selected && selected[selectedId]) || false;
    }

    if (isSelected) {
      this.animateYPosition(-selectedTodoYPos, selectedTodoYPos);
    } else {
      this.animateYPosition(0, selectedTodoYPos);
    }
  }

  render() {
    const { todoList, selected, edited } = { ...this.props };

    return (
      <Animated.View
        style={{ ...this.container, transform: [{ translateY: this.moveYRules }] }}
      >
        <AddTodo />
        <TodoList
          data={todoList}
          selected={selected}
          edited={edited}
        />
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todoList: state.todo.todoList,
    selected: state.todo.selected,
    selectedTodoYPos: state.todo.selectedRowYPos,
    edited: state.todo.edited
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTodo: todoText => dispatch(TodoActions.add(todoText)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
