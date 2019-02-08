import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import List from './reusable/List';

class TodoList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getTodoListData = () => {
    const list = [...Array(20)].map((d, index) => {
      return { id: index.toString(), text: d };
    });
    return list;
  }

  render() {
    return (
      <View style={styles.container}>
        <List
          data={this.getTodoListData()}
          rowRenderer={({ item }) => {
            return (
              <View>
                <Text>
                  {item && item.text}
                  {item && item.id}
                </Text>
                <Button title="title 1">Button 1</Button>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default TodoList;
