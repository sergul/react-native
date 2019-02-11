import React from 'react';
import { Text, View, Button } from 'react-native';
import CommonStyles from '../styles/commons';
import InputField from './reusable/InputField';

const TodoListItem = ({
  text
}) => {
  const container = CommonStyles.containerStandard();
  container.paddingTop = 10;
  container.paddingBottom = 10;
  return (
    <View style={{ ...container }}>
      <InputField
        fontFamily="OpenSans-Regular"
        outerStyles={{ borderWidth: 0,
          width: '100%',
          fontSize: 15,
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 5,
          paddingBottom: 5,
          borderBottomWidth: 1 }}
        placeholderText="Type your doable ..."
        cursorColor={CommonStyles.brown}
        text={text}
      />
      {/* <Text>{text}</Text> */}
    </View>
  );
};

export default TodoListItem;
