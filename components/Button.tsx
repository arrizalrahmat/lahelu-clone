import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type ButtonPropTypes = {
  type: 'primary' | 'secondary';
  text: string;
  onPress: () => void;
  style?: ViewStyle;
};

const Button: React.FC<ButtonPropTypes> = props => {
  const {type, text, onPress, style} = props;

  const getContainerStyle = () => {
    switch (type) {
      case 'primary':
        return styles.primaryContainer;
      case 'secondary':
        return styles.secondaryContainer;
      default:
        return {};
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      default:
        return {};
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        getContainerStyle(),
        style ?? {},
      ]}>
      <Text style={[styles.text, getTextStyle()]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderRadius: 4,
    borderColor: 'rgba(52, 172, 224,1.0)',
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: 'semibold',
  },
  primaryContainer: {
    backgroundColor: 'rgba(52, 172, 224,1.0)',
  },
  primaryText: {
    color: 'white',
  },
  secondaryContainer: {},
  secondaryText: {
    color: 'rgba(52, 172, 224,1.0)',
  },
});

export default Button;
