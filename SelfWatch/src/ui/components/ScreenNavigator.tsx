import * as React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useState} from 'react';
import Animated from 'react-native-reanimated';
import {Route} from 'react-native-tab-view';
import {StopWatch} from './stop-watch/StopWatch';
import {Timer} from './timer/Timer';

const initialLayout = {width: Dimensions.get('window').width};

export const ScreenNavigator = () => {
  const [index, setIndex] = useState(0);
  const [position] = useState(() => new Animated.Value(0));
  const [routes] = useState([
    {key: 'stopWatch', title: 'Stop watch'},
    {key: 'timer', title: 'Timer'},
  ]);

  const renderScene = SceneMap({
    stopWatch: () => <StopWatch />,
    timer: () => <Timer />,
  });

  const renderTabBar = (props: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        {props.navigationState.routes.map((route: Route, index: number) => {
          return (
            <TouchableOpacity
              accessibilityRole="button"
              style={{
                flex: 1,
                height: 30,
                borderWidth: 0,
                borderRightWidth: index === 0 ? 1: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setIndex(index);
              }}
              key={route.key}>
              <Animated.Text>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      tabBarPosition="bottom"
      renderTabBar={renderTabBar}
      position={position}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
