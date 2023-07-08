import { configureStore } from "@reduxjs/toolkit";
import HomePageMovies from "./homePageData";
import SearchMovies from "./searchMovies";
const store = configureStore({
  reducer: {
    homePageMovies: HomePageMovies,
    searchMovies:SearchMovies
  },
});

export default store;
