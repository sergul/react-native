import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import TodoInput from './reusable/InputField';
import CommonStyles from '../styles/commons';
import ButtonStandard from './reusable/ButtonStandard';

let getTodoTextCallback;

class AddTodo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onRememberButtonTouch = () => {
    if (getTodoTextCallback) {
      const todoText = getTodoTextCallback();
      console.log(todoText);
    }
  }

  getTodoText = (callback) => {
    getTodoTextCallback = callback;
  }

  render() {
    console.log('Add Todo component render');
    return (
      <View style={styles.container}>
        <View
          style={{ backgroundColor: `${CommonStyles.lightBlue}`,
            borderRadius: CommonStyles.borderRadius,
            shadowRadius: CommonStyles.borderRadius,
            elevation: CommonStyles.elevation,
            ...styles.todoInputContainer }}
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
            placeholderText="Type your doable here ..."
            cursorColor={CommonStyles.brown}
            returnText={this.getTodoText}
          />
        </View>
        <ButtonStandard
          label="Remember"
          bgColor={CommonStyles.blue}
          bgColorPressed={CommonStyles.darkerBlue}
          pressOutCallback={this.onRememberButtonTouch}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
    borderWidth: 0,
    borderColor: 'red',
  },

  todoInputContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },

  addTodoContainer: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default AddTodo;
