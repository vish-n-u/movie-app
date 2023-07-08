import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Pagination from "./pagination";
import logo from "./assets/logo.png";
import ShimmerHomePage from "./shimmerHomePage";
import { addMovies } from "./redux/searchMovies";
import { useDispatch, useSelector } from "react-redux";
const apiKey = process.env.REACT_APP_API_KEY;
const SearchPage = () => {
  // gets params value from url
  const [pageNumber, setPageNumber] = useState(1); // to getData based on pagination
  const [movies, setMovies] = useState([]); // stores the recieved movies
  const [totalResults, setTotalResults] = useState(0); // the total number of movies present in db is recieved while fetching movies from url, the number of buttons is set using this value
  const [loading, setLoading] = useState(true);
  const Dispatch = useDispatch();
  const searchMovies = useSelector((store) => store.searchMovies.item);
  const location = useLocation();
  const queryparams = new URLSearchParams(location.search);
  const query = queryparams.get("query");
  const navigate = useNavigate();

  useEffect(() => {
    /***
     * @description :- fetches data to render on ui based on pagination, gets data either through rtk or by fetching it from  url
     */
    const fetchMovies = async () => {
      try {
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${
          pageNumber * 2 - 1
        }`;
        const url2 = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${
          pageNumber * 2
        }`;
        /***
         * The searchMovies is  a part of the store, which stores data in :-
         * searchMovies={
         * [query]:{
         * [pageNumber]:[MovieData]}}
         * during search first the store is checked and only then a request is made to  a url
         */
        if (searchMovies?.[query]?.[pageNumber]) {
          console.log("reached here again");
          let newArr = searchMovies[query][pageNumber];

          setMovies(newArr);
          setLoading(false);
          return;
        }

        const [response, response2] = await Promise.all([
          fetch(url),
          fetch(url2),
        ]);
        const [data, data2] = await Promise.all([
          response.json(),
          response2.json(),
        ]);

        setTotalResults(data.totalResults); // total results are set here
        if (data.Response === "True") {
          const movies = data.Search;
          const movies2 = data2.Search;
          let newArr = movies.concat(movies2);
          // Process the retrieved movies
          if (data.totalResults < 20) {
            newArr = newArr.slice(0, data.totalResults);
          }
          setMovies(newArr);
          setLoading(false);

          // Data is filtered and modified before being dispatched to the searchMovies
          let obj = {
            pageNumber,
            movies: newArr,
            query,
          };
          Dispatch(addMovies(obj));

          // Check if there are more pages
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching movies: ", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [pageNumber]);
  return (
    <div className="flex flex-col bg-black text-white">
      <div className="w-[100%] bg-black min-h-[50px]">
        <div className="h-28 w-28">
          <Link to="/">
            {" "}
            <img src={logo} alt="logo" className="h-24 w-28 mt-2" />
            <h1 className="font-bold text-2xl text-rose-500 m-2">
              BlockBuster
            </h1>
          </Link>
        </div>
      </div>
      <h1 className="font-bold text-xl mt-20 m-2">{`Search Results for : ${query}`}</h1>
      <h1 className="text-lg font-semibold ml-3">
        {" "}
        {`Total results :- ${totalResults ? totalResults : 0}`}
      </h1>
      {movies.length > 0 ? (
        <div className="flex flex-wrap justify-center mt-10">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className=" w-56  rounded-md flex flex-col mx-5 m-2"
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
            >
              <img
                className="h-80 w-full rounded-md p-2 hover:p-0 hover:transition-all"
                src={movie.Poster}
                alt={movie.Title}
              />
              <h1 className="w-full">{movie.Title}</h1>
              <h1>{movie.Year}</h1>
            </div>
          ))}
        </div>
      ) : loading ? (
        <ShimmerHomePage />
      ) : (
        <img
          src="https://www.riptgroup.in/404.gif"
          alt="Did not find this page"
        />
      )}
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalResults={totalResults}
      />
    </div>
  );
};

export default SearchPage;
