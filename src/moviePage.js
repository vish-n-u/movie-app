import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";
import ShimmerMoviePage from "./shimmerMoviePage";
const apiKey = process.env.REACT_APP_API_KEY;

const MoviePage = () => {
  const { id } = useParams(); // a react-router-dom hook to get params from url

  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(true); // use to load the shimmer whenever data is being fetched
  /**
   *
   *
   * @description :- fetches data to render on ui, gets data by fetching it from  url based on id
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}` // gets data based on id
        );
        const dataJson = await data.json();
        setMovieData(dataJson);
        setLoading(false);
        console.log("dataJSon", dataJson);
      } catch (err) {
        console.log(err);
        alert("try refreshing the page....");
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col bg-gray-700 h-screen">
      <div className="w-full bg-black">
        <div className=" w-28">
          <Link to="/">
            <img src={logo} alt="logo" className="h-24 w-28 mt-2" />
            <h1 className="font-bold text-2xl text-rose-500 m-2">
              BlockBuster
            </h1>
          </Link>
        </div>
      </div>
      <div className="flex p-10 bg-gray-700 justify-center text-gray-100 items-start">
        {!loading ? ( // ternary function to check whether shimmer should be shown or data is fetched
          <>
            <img
              src={
                movieData.Poster !== "N/A"
                  ? movieData.Poster
                  : "data:image/png;base64,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"
              }
              alt="movieImg"
              className="m-2 rounded-lg  h-96 w-72 p-4 hover:p-0 hover:transition-all"
            />

            <div className="flex ml-3 flex-col w-[50%]">
              <div className="flex">
                <h1 className="text-2xl font-bold">{movieData.Title}</h1>
                <h1 className="text-xl ml-3"> ({movieData.Year})</h1>
              </div>
              <ol className="flex ">
                <li className="m-2">{movieData.Released}</li>
                <li className="m-2">{movieData.Genre}</li>
                <li className="m-2">{movieData.Runtime}</li>
              </ol>
              <div className="flex my-3 w-full justify-start items-center">
                <CircularProgressbar
                  className="h-24  max-w-[100px]"
                  value={
                    Number(movieData?.Ratings?.[1]?.Value.slice(0, -1)) ||
                    Number(movieData?.Ratings?.[0]?.Value.slice(0, -3) * 10)
                  }
                  text={
                    movieData.Ratings.length == 0
                      ? "N/A"
                      : movieData?.Ratings?.[1]?.Value ||
                        movieData?.Ratings?.[0]?.Value.slice(0, -3) * 10 + "%"
                  }
                />
                <h1 className="ml-3 text-xl font-semibold">User Score</h1>
              </div>
              <h1 className="ml-2 text-xl font-bold">Overview</h1>
              <h1 className="w-[100%] ml-3">{movieData.Plot}</h1>
              <div className="flex w-[100%] justify-evenly mt-10">
                <div className="flex flex-col w-[40%]">
                  <h1 className="text-xl font-semibold">
                    {movieData.Director}
                  </h1>
                  <h1 className="font-bold italic mt-2">Director</h1>
                </div>
                <div className="flex flex-col w-[40%]">
                  <h1 className="text-xl font-semibold">{movieData.Writer}</h1>
                  <h1 className="font-bold italic mt-2">Writer</h1>
                </div>
              </div>
            </div>
          </>
        ) : (
          <ShimmerMoviePage />
        )}
      </div>
    </div>
  );
};

export default MoviePage;
