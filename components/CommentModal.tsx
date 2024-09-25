import {Comment, Meme} from '@/store/reducers/memes/type';
import React, {useCallback} from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItem,
} from 'react-native';
import Modal from 'react-native-modal';
import {Ionicons} from '@expo/vector-icons';
import Button from './Button';
import CommentItem from './CommentItem';
import * as Crypto from 'expo-crypto';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/store';
import {likeComment} from '@/store/reducers/memes';
import {currentUsername} from '@/constants/variables';

type CommentModalPropTypes = {
  isVisible: boolean;
  toggleModal: () => void;
  meme: Meme | null;
};

const CommentModal: React.FC<
  CommentModalPropTypes
> = props => {
  const {isVisible, toggleModal, meme} = props;
  const dispatch = useDispatch<AppDispatch>();

  const handleLikeComment = useCallback(
    (memeID: string, commentID: string) => {
      const payload = {memeID, commentID};

      dispatch(likeComment({memeID, commentID}));
    },
    [],
  );

  const getIsCommentLiked = (commentID: string) => {
    const comment = meme?.comments.find(
      comment => comment.id === commentID,
    );

    if (comment) {
      const like = comment.likes.find(
        user => user === currentUsername,
      );
      if (like) {
        return true;
      }
    }
    return false;
  };

  const renderItem: ListRenderItem<Comment> = ({item}) => {
    return (
      <CommentItem
        comment={item}
        onPressLike={commentID => {
          if (meme) {
            handleLikeComment(meme.id, commentID);
          }
        }}
        isLiked={getIsCommentLiked(item.id)}
      />
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={toggleModal}
      animationIn='slideInRight'
      animationOut='slideOutRight'
      style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {/* Header */}
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>
            {meme?.name}
          </Text>
          <Pressable onPress={toggleModal}>
            <Ionicons
              name='close'
              size={28}
              style={styles.closeButton}
            />
          </Pressable>
        </View>

        {/* Body Content */}
        <View style={styles.contentNavigator}>
          <View style={styles.rowContainer}>
            <Button
              text='Populer'
              onPress={() => {}}
              type='primary'
            />
            <Button
              text='Terbaru'
              onPress={() => {}}
              type='secondary'
            />
          </View>
          <Text style={styles.commentCountText}>
            {meme?.comments.length} Komentar
          </Text>
        </View>
        {meme && (
          <FlatList
            data={meme.comments}
            keyExtractor={(item, index) =>
              Crypto.randomUUID() + index
            }
            renderItem={renderItem}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 16,
    height: '100%', // Adjust height as needed
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginTop: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
    color: '#333',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contentNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  commentCountText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  listContainer: {},
});

export default CommentModal;
