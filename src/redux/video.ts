import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { VideoDataType } from "api/video.type";

interface VideoStateProps {
  searchResult: VideoDataType[] | [];
  isLoading: boolean;
  search: string;
}

const initialState = {
  searchResult: [],
  isLoading: false,
  search: "",
} as VideoStateProps;

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setSearchResult(state, action: PayloadAction<VideoDataType[] | []>) {
      state.isLoading = true;
      state.searchResult = action.payload;
      state.isLoading = false;
    },
    setSearchText(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const { setSearchResult,setSearchText } = videoSlice.actions;
export default videoSlice.reducer;
