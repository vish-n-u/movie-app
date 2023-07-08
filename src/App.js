import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMovies } from "./redux/homePageData";
import { useSelector } from "react-redux";
import logo from "./assets/logo.png";
import ShimmerHomePage from "./shimmerHomePage";
const apiKey = process.env.REACT_APP_API_KEY;

console.log("API Key: " + apiKey);

const MovieSearch = () => {
  const [movies, setMovies] = useState([]); // all the movies shown in the homepage are set in this variable.
  const [searchQuery, setSearchQuery] = useState(""); // the queries written in the searchbar is set here
  const Dispatch = useDispatch(); // react-redux hook to store data in rtk
  const homePageData = useSelector((store) => store.homePageMovies.item); // gets the data from the store

  useEffect(() => {
    if (homePageData.length > 0) {
      setMovies(homePageData); // checks if data is available in rtk , if yes then skips fetching data
      return;
    }

    /**
     *
     *
     * @description :- fetches data to render on ui, gets data either through rtk or by fetching it from  url
     */
    const fetchMovies = async () => {
      // fetch the movies , but since each request only return 10 movies
      try {
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=avengers&page=1`;
        const url2 = `http://www.omdbapi.com/?apikey=${apiKey}&s=avengers&page=2`;

        const [response, response2] = await Promise.all([
          fetch(url),
          fetch(url2),
        ]);
        const [data, data2] = await Promise.all([
          response.json(),
          response2.json(),
        ]);
        // if the data is returned then store the response in state
        //  variables else throws an error

        if (data.Response === "True") {
          const movies = data.Search;
          const movies2 = data2.Search;
          const newArr = movies.concat(movies2);

          console.log(newArr);
          setMovies(newArr);
          Dispatch(addMovies(newArr));

          // Check if there are more pages
        }
      } catch (error) {
        console.error("Error fetching movies: ", error);
        alert("Error fetching movies , please refresh");
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-[100%] bg-black min-h-[50px]">
        <div className=" w-28">
          <Link to="/">
            {" "}
            <img src={logo} alt="logo" className="h-24 w-28 mt-2" />
            <h1 className="font-bold text-2xl text-rose-500 m-2">
              BlockBuster
            </h1>
          </Link>
        </div>
      </div>
      <div className="w-[100%] bg-black p-2 flex items-center justify-center">
        <input
          type="text"
          className="p-2 pl-5 border-black border rounded-md w-80 rounded-l-full "
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link to={`/search?query=${searchQuery}`}>
          <button className="rounded-r-full px-6 h-10 bg-gray-200 hover:bg-gray-400/75 active:bg-gray-700 text-white border border-white rounded-lg  p-2">
            🔍
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap justify-center pt-10 bg-black text-white">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.imdbID}
              className=" w-56  rounded-md flex flex-col mx-5   m-2 "
            >
              <Link to={`/movie/${movie.imdbID}`}>
                {/* opens a new page dynamically onClick */}
                <img
                  className="h-80 w-full rounded-md p-2 hover:relative hover:p-0 hover:transition-all"
                  src={movie.Poster}
                  alt={movie.Title}
                />
                <h1 className="w-full">{movie.Title}</h1>
                <h1>{movie.Year}</h1>
              </Link>
            </div>
          ))
        ) : (
          <ShimmerHomePage />
          // a ui feature to render something on screen while data is being fetched
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
