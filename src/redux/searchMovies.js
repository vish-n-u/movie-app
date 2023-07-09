import { createSlice, current } from "@reduxjs/toolkit";

const SearchMovies = createSlice({
  name: "searchMovies",
  initialState: {
    item: {},
  },
  reducers: {
    addMovies: (state, action) => {
      console.log("reached at searchMovies", action.payload);
      let objs = action.payload;
      if (state.item[objs.query]) {
        state.item[objs.query][objs.pageNumber] = [...objs.movies];
      } else {
        state.item[objs.query] = {};
        state.item[objs.query][objs.pageNumber] = [...objs.movies];
        state.item[objs.query].totalResults = objs.totalResults;
      }
      console.log(state.item);
    },
  },
});

export const { addMovies } = SearchMovies.actions;
export default SearchMovies.reducer;
