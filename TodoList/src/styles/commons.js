const CommonStyles = class {
  static orange = '#703d2c';

  static darkOrange = '#D04302';

  static darkerBlue = '#2C5F70';

  static blue = '#347b82';

  static lighterBlue = '#4baeb8';

  static darkGray = '#5A4D4C';

  static middleGray = '#8A8683';

  static lightGray = '#E4EBF2';

  static white = '#ffffff';

  static transparent = 'rgba(52, 52, 52, 0)';

  static borderRadius = 5;

  static textInputCommons = () => {
    return (
      {
        paddingLeft: '3%',
        paddingRight: '3%',
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: CommonStyles.borderRadius,
        borderWidth: 1,
        fontSize: 15,
        borderColor: CommonStyles.darkOrange,
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
};

export default CommonStyles;
