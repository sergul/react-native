const CommonStyles = class {
  static brown = '#B26C22';

  static lightBrown = '#FFB364';

  static darkerBlue = '#265362';

  static blue = '#4291ab';

  static lightBlue = '#6fb1c6';

  static darkGray = '#5A4D4C';

  static middleGray = '#8A8683';

  static lightGray = '#E4EBF2';

  static white = '#ffffff';

  static black = '#000';

  static transparent = 'rgba(52, 52, 52, 0)';

  static borderRadius = 4;

  static elevation = 2;

  static elevationSmall = 2;

  static textInput = () => {
    return (
      {
        paddingLeft: '3%',
        paddingRight: '3%',
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: CommonStyles.borderRadius,
        borderWidth: 1,
        fontSize: 15,
        borderColor: CommonStyles.lightBrown,
        color: CommonStyles.white
      });
  };

  static buttonCommons = () => {
    return (
      {
        paddingLeft: '3%',
        paddingRight: '3%',
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: CommonStyles.borderRadius,
        fontSize: 15
      });
  };

  static containerStandard = (
    flex = 1,
    width = '100%',
    flexDirection = 'column',
    justifyContent = 'center',
    alignItems = 'center',
    borderWidth = 0,
    borderColor = 'red',
    borderRadius = 0,
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0
  ) => {
    return {
      flex,
      width,
      flexDirection,
      justifyContent,
      alignItems,
      borderWidth,
      borderColor,
      borderRadius,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft
    };
  }
};

export default CommonStyles;
