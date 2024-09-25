import {Tabs} from 'expo-router';
import React from 'react';
import {Alert} from 'react-native';
import {Pressable} from 'react-native';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const showAlert = () => {
    Alert.alert('Alert', 'This tab does not navigate!', [
      {text: 'OK'},
    ]);
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: '',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='forum'
        options={{
          title: '',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon
              name={
                focused
                  ? 'code-slash'
                  : 'code-slash-outline'
              }
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='add'
        options={{
          title: '',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon
              name={
                focused
                  ? 'alert-circle'
                  : 'alert-circle-outline'
              }
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
