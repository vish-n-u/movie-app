import { createSlice, current } from "@reduxjs/toolkit";

const HomePageMovies = createSlice({
  name: "homePageMovies",
  initialState: {
    item: [],
  },
  reducers: {
    addMovies: (state, action) => {
      let objs = action.payload;
      console.log(objs);

      state.item = [...objs];
    },
  },
});

export const { addMovies } = HomePageMovies.actions;
export default HomePageMovies.reducer;
