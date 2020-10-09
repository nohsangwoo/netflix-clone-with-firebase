import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row(props) {
  const { title, fetchUrl, isLargeRow } = props;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => {
          const potserPath = movie.poster_path
            ? base_url + (isLargeRow ? movie.poster_path : movie.backdrop_path)
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Flag_of_None.svg/1280px-Flag_of_None.svg.png";

          return (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={potserPath}
              alt={movie.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Row;
