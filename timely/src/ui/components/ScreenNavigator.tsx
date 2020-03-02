import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  TabView,
  SceneMap,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import {useState} from 'react';
import Animated from 'react-native-reanimated';
import {Route} from 'react-native-tab-view';
import {StopWatch} from './stop-watch/StopWatch';
import {Timer} from './timer/Timer';
import Icon from 'react-native-vector-icons/Ionicons';

type TabBarProps = SceneRendererProps & {
  navigationState: NavigationState<Route>;
};

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

  const renderTabBar = (props: TabBarProps) => {
    const routes: Route[] = props.navigationState.routes;
    return (
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 2,
        }}>
        {routes.map((route: Route, index: number) => {
          const selectedColor = `${
            selectedIndex === index ? '#2CC394' : 'gray'
          }`;
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                borderWidth: 0,
                borderRightWidth: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              key={route.key}>
              <TouchableOpacity
                accessibilityRole="button"
                activeOpacity={0.5}
                style={{
                  flex: 1,
                  borderWidth: 0,
                  borderRightWidth: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setSelectedIndex(index);
                }}>
                <Icon name={route.icon || ''} color={selectedColor} size={30} />
                <Text
                  style={{
                    color: selectedColor,
                  }}>
                  {route.title}
                </Text>
              </TouchableOpacity>
              {/* separator */}
              {index < routes.length - 1 ? (
                <View
                  style={{
                    borderLeftWidth: 1,
                    height: 40,
                    borderLeftColor: 'gray',
                  }}
                />
              ) : null}
            </View>
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
      timingConfig={{duration: 150}}
      springVelocityScale={3}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
