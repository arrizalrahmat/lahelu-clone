import React, {useMemo, useRef, useEffect} from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {currentUsername} from '@/constants/variables';
import {
  Comment,
  Downvotes,
  Upvotes,
} from '@/store/reducers/memes/type';

type InteractionPropTypes = {
  upvotes: Upvotes;
  comments: Comment[];
  downvotes: Downvotes;
  memeID: string;
  onPressInteraction: (
    memeID: string,
    type: 'upvote' | 'downvote' | 'comment' | 'share',
  ) => void;
  style?: ViewStyle;
};

const Interaction: React.FC<
  InteractionPropTypes
> = props => {
  const {
    upvotes,
    comments,
    downvotes,
    memeID,
    onPressInteraction,
    style,
  } = props;

  const isUpvoted = useMemo(() => {
    return upvotes.users.includes(currentUsername);
  }, [upvotes]);

  const isDownvoted = useMemo(() => {
    return downvotes.users.includes(currentUsername);
  }, [downvotes]);

  // Animation values for upvote and downvote
  const upvoteAnim = useRef(new Animated.Value(0)).current;
  const downvoteAnim = useRef(
    new Animated.Value(0),
  ).current;

  // Trigger animation based on vote type
  const triggerVoteAnimation = (
    animValue: Animated.Value,
    voteType: 'upvote' | 'downvote',
  ) => {
    const movement = voteType === 'upvote' ? -20 : 20;
    const reappearPosition =
      voteType === 'upvote' ? 20 : -20;

    animValue.setValue(0); // reset animation
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: movement, // move icon up or down
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: reappearPosition, // move icon to the opposite side
        duration: 0, // instantly jump
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 0, // move back to normal position
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (isUpvoted) {
      triggerVoteAnimation(upvoteAnim, 'upvote');
    }
  }, [isUpvoted]);

  useEffect(() => {
    if (isDownvoted) {
      triggerVoteAnimation(downvoteAnim, 'downvote');
    }
  }, [isDownvoted]);

  const renderVoteButton = (
    animValue: Animated.Value,
    isVoted: boolean,
    voteType: 'upvote' | 'downvote',
    iconName: keyof typeof MaterialCommunityIcons.glyphMap,
    count: number,
  ) => (
    <Pressable
      onPress={() => onPressInteraction(memeID, voteType)}
      style={[
        styles.rowContainer,
        styles.button,
        isVoted ? styles.activeButton : {},
      ]}>
      <Animated.View
        style={{transform: [{translateY: animValue}]}}>
        <MaterialCommunityIcons
          name={iconName}
          size={20}
          color={isVoted ? 'white' : 'black'}
        />
      </Animated.View>
      {voteType === 'upvote' && (
        <Text
          style={[
            styles.label,
            isVoted ? styles.activeLabel : {},
          ]}>
          {count}
        </Text>
      )}
    </Pressable>
  );

  return (
    <View style={[styles.container, style ?? {}]}>
      <View style={styles.rowContainer}>
        {/* upvotes downvotes */}
        <View style={styles.groupContainer}>
          {renderVoteButton(
            upvoteAnim,
            isUpvoted,
            'upvote',
            'arrow-up-bold-outline',
            upvotes.count,
          )}
          <View style={styles.separator} />
          {renderVoteButton(
            downvoteAnim,
            isDownvoted,
            'downvote',
            'arrow-down-bold-outline',
            downvotes.count,
          )}
        </View>

        {/* comments */}
        <View style={styles.groupContainer}>
          <Pressable
            onPress={() =>
              onPressInteraction(memeID, 'comment')
            }
            style={[styles.rowContainer, styles.button]}>
            <MaterialCommunityIcons
              name='comment-outline'
              size={20}
            />
            <Text style={styles.label}>
              {comments.length}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* share */}
      <View style={styles.groupContainer}>
        <Pressable
          style={[styles.rowContainer, styles.button]}
          onPress={() =>
            onPressInteraction(memeID, 'share')
          }>
          <MaterialCommunityIcons
            name='share-outline'
            size={20}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(170, 166, 157, 0.6)',
  },
  button: {
    padding: 12,
  },
  activeButton: {
    backgroundColor: 'rgba(52, 172, 224,1.0)',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  separator: {
    width: 1,
    height: 44,
    backgroundColor: 'rgba(170, 166, 157, 0.6)',
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
  },
  activeLabel: {
    color: 'white',
  },
});

export default Interaction;
