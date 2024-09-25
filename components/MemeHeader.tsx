import React, {useMemo} from 'react';
import {Creator} from '@/store/reducers/memes/type';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {getPostedDate} from '@/app/utils/posted-date';
type MemeHeaderPropTypes = {
  creator: Creator;
  createdAt: string;
  onPressEllipsis: () => void;
};

const MemeHeader: React.FC<MemeHeaderPropTypes> = props => {
  const {creator, createdAt, onPressEllipsis} = props;

  return (
    <View style={styles.header}>
      <View style={styles.leftHeader}>
        <Image
          source={{uri: creator.avatar}}
          style={styles.avatar}
        />
        <Text style={styles.username}>
          {creator.username}
        </Text>
        <Text style={styles.timestamp}>
          {' '}
          · {getPostedDate(createdAt)}
        </Text>
      </View>
      <Pressable
        style={styles.rightHeader}
        onPress={onPressEllipsis}>
        <Ionicons name='ellipsis-horizontal-outline' />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightHeader: {
    marginRight: 8,
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  timestamp: {
    color: '#888',
    fontSize: 10,
  },
});

export default MemeHeader;
