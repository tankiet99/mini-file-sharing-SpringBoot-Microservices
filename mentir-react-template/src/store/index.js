import { configureStore } from '@reduxjs/toolkit';
import commentDialogSlice from './slice/fileCommentDialogSlice';
export default configureStore({
    reducer: {
        commmentDialog: commentDialogSlice,
    }
})