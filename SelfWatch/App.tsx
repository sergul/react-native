import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {Timer} from './src/ui/timer/Timer';

const App: () => ReactNode = () => {
  return (
    <View>
      <Timer />
    </View>
  );
};

export default App;
