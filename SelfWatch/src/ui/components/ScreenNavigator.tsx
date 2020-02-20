import * as React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useState} from 'react';
import Animated from 'react-native-reanimated';
import {Route} from 'react-native-tab-view';
import {StopWatch} from './stop-watch/StopWatch';
import {Timer} from './timer/Timer';
import Icon from 'react-native-vector-icons/Ionicons';

const initialLayout = {width: Dimensions.get('window').width};

export const ScreenNavigator = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [position] = useState<Animated.Value<number>>(
    () => new Animated.Value(0),
  );
  const [routes] = useState<Route[]>([
    {key: 'stopWatch', title: 'Stop watch', icon: 'ios-stopwatch'},
    {key: 'timer', title: 'Timer', icon: 'ios-timer'},
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
          bottom: 2,
        }}>
        {props.navigationState.routes.map((route: Route, index: number) => {
          return (
            <TouchableOpacity
              accessibilityRole="button"
              style={{
                flex: 1,
                borderWidth: 0,
                borderRightWidth: index === 0 ? 1 : 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setSelectedIndex(index);
              }}
              key={route.key}>
              <Icon
                name={route.icon || ''}
                color={`${selectedIndex === index ? '#2CC394' : 'gray'}`}
                size={30}
              />
              <Animated.Text
                style={{
                  color: `${selectedIndex === index ? '#2CC394' : 'gray'}`,
                }}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <TabView
      navigationState={{index: selectedIndex, routes}}
      renderScene={renderScene}
      tabBarPosition="bottom"
      renderTabBar={renderTabBar}
      position={position}
      onIndexChange={setSelectedIndex}
      initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
