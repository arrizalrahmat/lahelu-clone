import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type TagPropTypes = {
  tag: string;
  type?: 'tag' | 'donate';
  onPress: (tag: string, isDonate: boolean) => void;
};

const Tag: React.FC<TagPropTypes> = props => {
  const {tag, type = 'tag', onPress} = props;

  return (
    <Pressable
      onPress={() => onPress(tag, type === 'donate')}
      style={[
        styles.container,
        type === 'donate' ? styles.donateContainer : {},
      ]}>
      {type === 'donate' ? (
        <View style={styles.dollarContainer}>
          <FontAwesome
            name='dollar'
            size={8}
            color={'rgba(255, 177, 66,1.0)'}
          />
        </View>
      ) : (
        <FontAwesome5 name='hashtag' size={12} />
      )}
      <Text
        style={[
          styles.label,
          type === 'donate' ? styles.donateLabel : {},
        ]}>
        {tag}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(170, 166, 157, 0.6)',
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
  donateContainer: {
    backgroundColor: 'rgba(255, 177, 66,1.0)',
    borderWidth: 0,
  },
  dollarContainer: {
    backgroundColor: 'white',
    height: 12,
    width: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    borderRadius: 6,
  },
  donateLabel: {
    color: 'white',
  },
});

export default Tag;
