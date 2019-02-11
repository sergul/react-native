import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CommonStyles from '../../styles/commons';

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
    this._rowRenderer = props.rowRenderer;
  }

  _rowRenderer;

  render() {
    const { data } = { ...this.props };
    return (
      <View style={CommonStyles.containerStandard()}>
        <FlatList
          data={data}
          renderItem={this._rowRenderer}
          keyExtractor={(item) => {
            return item.id;
          }}
        />
      </View>
    );
  }
}

export default List;
