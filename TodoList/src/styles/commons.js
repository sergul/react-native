const CommonStyles = class {
  static mainBlue = '#328Daa';

  static lightBlue = '#8ED3F4';

  static darkGray = '#5A4D4C';

  static middleGray = '#8A8683';

  static lightGray = '#E4EBF2';

  static textInputCommons = () => {
    return (
      {
        paddingLeft: '3%',
        paddingRight: '3%',
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 15,
        borderColor: CommonStyles.mainBlue
      });
  };

  static buttonCommons = () => {
    return (
      {
        paddingLeft: '3%',
        paddingRight: '3%',
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 10,
        fontSize: 15
      });
  };
};

export default CommonStyles;
