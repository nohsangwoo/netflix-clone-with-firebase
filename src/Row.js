import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row(props) {
  const { title, fetchUrl, isLargeRow } = props;
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    heght: "390",
    width: "100%",
    playerVars: {
      // ,2:45:08
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      // movieTrailer 라는 api로 해당 영화의 이름으로 검색된 유튜브 주소를 가져옴
      movieTrailer(movie?.name || "")
        .then((url) => {
          // https://www.youtube.com/watch?time_continue=1&v=QWbMckU3AOQ&feature=emb_title 이런식의 주소에서
          // 필요없는 정보는 다 지우고 파라미터값만 가져옴
          // v=QWbMckU3AOQ  이런걸 가져옴
          const AllurlParms = new URL(url).search;

          // 가져온 파라미터에서 v의 파라미터 값을 가져옴 QWbMckU3AOQ
          const urlParms = new URLSearchParams(AllurlParms);
          setTrailerUrl(urlParms.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

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
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={potserPath}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
