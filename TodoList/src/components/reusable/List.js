import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

class List extends PureComponent {
  static defaultProps = {
    rowRenderer: ({ item, index }) => {
      return (
        <View>
          <Text>
            {item.text}
            {index}
          </Text>
        </View>
      );
    },

    data: [{ id: '0', text: 'row 1' }, { id: '1', text: 'row 2' }]
  }

  constructor(props, defaultProps) {
    super(props, defaultProps);
    const { data } = { ...props };
    this.state = {
      data
    };
  }

  render() {
    const { data } = { ...this.state };
    const { rowRenderer } = { ...this.props };
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={rowRenderer}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
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

export default List;
