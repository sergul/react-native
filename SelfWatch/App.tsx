import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {StopWatch} from './src/ui/stop-watch/StopWatch';

const App: () => ReactNode = () => {
  return (
    <View>
      <StopWatch />
    </View>
  );
};

export default App;
