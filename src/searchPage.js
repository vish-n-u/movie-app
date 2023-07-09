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
          setTotalResults(searchMovies[query].totalResults);
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
          let newArrs = movies.concat(movies2);
          // Process the retrieved movies
          if (data.totalResults < 20) {
            newArrs = newArrs.slice(0, data.totalResults);
          }
          let newArr = [];
          newArrs.map((data) => {
            if (data) newArr.push(data);
          });
          setMovies(newArr);
          setLoading(false);

          // Data is filtered and modified before being dispatched to the searchMovies
          let obj = {
            pageNumber,
            movies: newArr,
            query,
            totalResults: data.totalResults,
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
        {`Total results : ${totalResults ? totalResults : 0}`}
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
                src={
                  movie?.Poster !== "N/A"
                    ? movie.Poster
                    : "data:image/png;base64,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"
                }
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
      {movies.length > 0 && (
        <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalResults={totalResults}
        />
      )}
    </div>
  );
};

export default SearchPage;
