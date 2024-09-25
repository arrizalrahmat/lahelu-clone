import {getPostedDate} from '@/app/utils/posted-date';
import {Comment} from '@/store/reducers/memes/type';
import {Feather, Ionicons} from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

type CommentItemPropTypes = {
  comment: Comment;
  onPressLike: (commentID: string) => void;
  isLiked: boolean;
};

const CommentItem: React.FC<
  CommentItemPropTypes
> = props => {
  const {comment, isLiked, onPressLike} = props;

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image
          source={{uri: comment.user.avatar}}
          style={styles.avatar}
        />
        <View>
          {/* header */}
          <View style={styles.rowContainer}>
            <Text style={styles.usernameText}>
              {comment.user.username}
            </Text>
            <Text style={styles.dateText}>
              · {getPostedDate(comment.createdAt)}
            </Text>
          </View>
          {/* comment */}
          <Text style={styles.commentText}>
            {comment.comment}
          </Text>
          {/* interaction */}
          <View style={styles.interactionContainer}>
            <TouchableOpacity
              onPress={() => onPressLike(comment.id)}>
              <Feather
                name='thumbs-up'
                size={16}
                color={
                  isLiked
                    ? 'rgba(52, 172, 224,1.0)'
                    : 'black'
                }
              />
            </TouchableOpacity>
            <Text style={styles.likeCountText}>
              {comment.likes.length}
            </Text>
            <Text style={styles.replyText}>BALAS</Text>
            <Ionicons name='ellipsis-horizontal-outline' />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(132, 129, 122, 0.2)',
    paddingVertical: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  usernameText: {
    fontWeight: 'semibold',
    fontSize: 10,
  },
  dateText: {
    color: '#888',
    fontSize: 10,
  },
  commentText: {
    fontSize: 14,
    marginVertical: 8,
    lineHeight: 20,
    color: 'rgba(132, 129, 122,1.0)',
    letterSpacing: 1,
  },
  interactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  likeCountText: {
    fontSize: 10,
    fontWeight: 'semibold',
  },
  replyText: {
    fontSize: 10,
    fontWeight: 'semibold',
    marginHorizontal: 12,
  },
});

export default CommentItem;
