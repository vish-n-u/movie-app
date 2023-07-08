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
      <div className="flex p-10 bg-gray-700 justify-center text-gray-100 items-center">
        {!loading ? ( // ternary function to check whether shimmer should be shown or data is fetched
          <>
            <img
              src={movieData.Poster}
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
                    movieData?.Ratings?.[1]?.Value.slice(0, -1) ||
                    movieData?.Ratings?.[0]?.Value.slice(0, -3) * 10 ||
                    10
                  }
                  text={
                    movieData?.Ratings?.[1]?.Value ||
                    movieData?.Ratings?.[0]?.Value.slice(0, -3) * 10 + "%" ||
                    10
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
                  <h1 className="">Director</h1>
                </div>
                <div className="flex flex-col w-[40%]">
                  <h1 className="text-xl font-semibold">{movieData.Writer}</h1>
                  <h1 className="">Writer</h1>
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
