import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {MemesResponseType, MemesStateType} from './type';
import data from '../../../constants/memes.json';
import * as Crypto from 'expo-crypto';
import {
  currentUserAvatar,
  currentUsername,
} from '@/constants/variables';

const initialState: MemesStateType = {
  memes: [],
  isLoading: false,
  error: null,
  count: 100,
  offset: 0,
};

const memeSlice = createSlice({
  name: 'memes',
  initialState,
  reducers: {
    upvote: (state, action) => {
      const {memeID} = action.payload;
      const meme = state.memes.find(
        meme => meme.id === memeID,
      );
      if (meme) {
        if (meme.upvotes.users.includes(currentUsername)) {
          // remove upvote if exist
          meme.upvotes.count -= 1;
          meme.upvotes.users = meme.upvotes.users.filter(
            user => user !== currentUsername,
          );
        } else {
          meme.upvotes.count += 1;
          meme.upvotes.users.push(currentUsername);
        }
      }
    },
    downvote: (state, action) => {
      const {memeID} = action.payload;
      const meme = state.memes.find(
        meme => meme.id === memeID,
      );
      if (meme) {
        if (
          meme.downvotes.users.includes(currentUsername)
        ) {
          // remove downvote if exist
          meme.downvotes.count -= 1;
          meme.downvotes.users =
            meme.downvotes.users.filter(
              user => user !== currentUsername,
            );
        } else {
          meme.downvotes.count += 1;
          meme.downvotes.users.push(currentUsername);
        }
      }
    },
    addComment: (state, action) => {
      const {memeID, comment} = action.payload;
      const meme = state.memes.find(
        meme => meme.id === memeID,
      );
      if (meme) {
        meme.comments.push({
          id: Crypto.randomUUID(),
          user: {
            id: Crypto.randomUUID(),
            username: currentUsername,
            avatar: currentUserAvatar,
          },
          comment: comment,
          createdAt: new Date().toISOString(),
          likes: [],
        });
      }
    },
    likeComment: (state, action) => {
      const {memeID, commentID} = action.payload;

      const meme = state.memes.find(
        meme => meme.id === memeID,
      );
      if (meme) {
        const comment = meme.comments.find(
          e => e.id === commentID,
        );
        if (comment) {
          if (comment.likes.includes(currentUsername)) {
            // unlike if exist
            comment.likes = comment.likes.filter(
              user => user !== currentUsername,
            );
          } else {
            comment.likes.push(currentUsername);
          }
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMemes.pending, state => {
        state.isLoading = true;
      })
      .addCase(getMemes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.memes = [
          ...state.memes,
          ...action.payload.data,
        ];
        state.offset = action.payload.offset;
      })
      .addCase(getMemes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const {upvote, downvote, addComment, likeComment} =
  memeSlice.actions;

export default memeSlice.reducer;

export const getMemes = createAsyncThunk(
  'memes/getMemes',
  (params?: {offset?: number}) => {
    const memes: MemesResponseType = {
      data: [],
      offset: params?.offset ?? 0,
    };

    //only needed because we are using local data and only 5 records available and returned endless time. So that all user and emme have unique ids
    memes.data = data.map(meme => {
      return {
        id: Crypto.randomUUID(),
        ...meme,
        creator: {
          id: Crypto.randomUUID(),
          ...meme.creator,
        },
        comments: meme.comments.map(comment => ({
          id: Crypto.randomUUID(),
          ...comment,
          user: {
            id: Crypto.randomUUID(),
            ...comment.user,
          },
        })),
      };
    });

    return memes;
  },
);
