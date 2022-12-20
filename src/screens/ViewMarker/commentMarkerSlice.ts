import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {CommentCardProps} from './../../components/CommentCardProps';

const commentMarkerInitialState = {
  comment: [] as CommentCardProps[],
};

export const commentMarkerSlice = createSlice({
  name: 'commentMarker',
  initialState: commentMarkerInitialState,
  reducers: {
    setCommentMarker(state, action: PayloadAction<{feed: CommentCardProps[]}>) {
      state.comment = action.payload.feed;
    },
    addCommentPage(state, action: PayloadAction<{feed: CommentCardProps[]}>) {
      state.comment = [...state.comment, ...action.payload.feed];
    },
  },
});

export const commentMarkerActions = commentMarkerSlice.actions;
export const commentMarkerReducer = commentMarkerSlice.reducer;