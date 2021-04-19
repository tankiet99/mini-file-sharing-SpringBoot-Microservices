import {
    createSlice,
} from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    fileId: '',
};

const commentDialogSlice = createSlice({
    name: 'commentDialog',
    initialState,
    reducers: {
        closeCommentDailog: state => {
            state.isOpen = false;
        },
        openCommentDialog: state => {
            state.isOpen = true;
        },
        setFileId: (state, action) => {
            state.fileId = action.payload;
        }
    }
});

export const {closeCommentDailog, openCommentDialog, setFileId} = commentDialogSlice.actions;

export default commentDialogSlice.reducer;