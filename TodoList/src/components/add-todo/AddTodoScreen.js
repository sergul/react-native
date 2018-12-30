import React, { PureComponent } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import TodoInput from '../InputField';
import commonStyles from '../../styles/commons';
import ButtonCommon from '../ButtonCommon';

class AddTodoScreen extends PureComponent {
  onSavePress = () => {
    Keyboard.dismiss();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <TodoInput
            fontFamily="OpenSans-Regular"
            isMultiLine
            outerStyles={{ borderWidth: 2, width: '80%', fontSize: 20 }}
          />
        </View>
        <View style={styles.bottomSection}>
          <ButtonCommon
            label="Button 2"
            size={{ width: 160, height: 40 }}
            bgColor={commonStyles.middleGray}
            pressOutCallback={this.onSavePress}
          />

          <ButtonCommon
            label="Button 1"
            size={{ width: 140, height: 40 }}
            bgColor={commonStyles.mainBlue}
            pressOutCallback={this.onSavePress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  topSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },

  bottomSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AddTodoScreen;
