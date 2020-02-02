import React, { PureComponent } from 'react';
import { View, Keyboard, TouchableOpacity, Dimensions, UIManager, findNodeHandle } from 'react-native';
import { connect } from 'react-redux';
import CommonStyles from '../styles/commons';
import InputField from './reusable/InputField';
import TodoActions from '../store/todo/actions';
import getStore from '../store/configureStore';

const { width, height } = Dimensions.get('window');

class TodoListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.store = getStore();
    this.store.subscribe(this.onTodoAdded);
  }

  onTodoAdded = () => {
    // console.log(store.getState());
  }

  onTextInputFocus = () => {
    const { id, onRowFocusIn, selectedRowYPos } = { ...this.props };
    const parentContentOffset = this._parentOffsetGetter ? this._parentOffsetGetter() : 0;
    console.log(parentContentOffset);
    this._view.measure((x, y, widthT, heightT, pageX, pageY) => {
      selectedRowYPos(pageY);
      onRowFocusIn(id, true);
    });
  };

  onTextInputBlur = () => {
    const { id, onRowFocusOut } = { ...this.props };
    onRowFocusOut(id, false);
    this.applyEditedText();
  };

  onTextInputTouchStart = () => {
  }

  onSubmit = () => {
    this.applyEditedText();
    Keyboard.dismiss();
    this.isSubmitted = true;
  };

  applyEditedText = () => {
    const { onEditTodoText, id } = { ...this.props };
    if (this.getTodoTextCallback) {
      const text = this.getTodoTextCallback().trim();
      onEditTodoText({ id, text });
    }
  }

  getTodoText = (callback) => {
    this.getTodoTextCallback = callback;
  }

  getTextInputRef = (callback) => {
    this.textInputRefCallback = callback;
  }

  _onPress = () => {
    const { id, onRowFocusIn } = { ...this.props };
    onRowFocusIn(id, true);
  }

  render() {
    const { text, id, isSelected, getParentContentVerticalOffset } = { ...this.props };
    this._parentOffsetGetter = getParentContentVerticalOffset;
    const container = CommonStyles.containerStandard();
    container.borderBottomWidth = isSelected ? 1 : 0.5;
    container.paddingBottom = isSelected ? 200 : 80;
    container.borderColor = isSelected ? CommonStyles.lightBrown : CommonStyles.lightGray;
    return (
      <TouchableOpacity
        onPress={this._onPress}
      >
        <View
          style={{ ...container }}
          ref={(ref) => {
            if (ref) {
              this._view = ref;
            }
          }}
        >
          <InputField
            fontFamily="OpenSans-Regular"
            outerStyles={{ borderWidth: 0,
              width: '100%',
              fontSize: 15,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 10,
              paddingBottom: 0 }}
            focusCallback={this.onTextInputFocus}
            blurCallback={this.onTextInputBlur}
            enterPressCallback={this.onSubmit}
            placeholderText="Type your doable ..."
            cursorColor={CommonStyles.brown}
            needsFocus={isSelected && !this.isSubmitted}
            returnTextCallback={this.getTodoText}
            textInputRefCallback={this.getTextInputRef}
            text={text}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditTodoText: id => dispatch(TodoActions.editText(id)),
    onRowFocusIn: (id, isSelected) => dispatch(TodoActions.selectRow(id, isSelected)),
    onRowFocusOut: (id, isSelected) => dispatch(TodoActions.selectRow(id, isSelected)),
    selectedRowYPos: yPos => dispatch(TodoActions.saveSelectedRowYPos(yPos))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem);
