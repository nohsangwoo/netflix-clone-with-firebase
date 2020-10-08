import React, { useState, useEffect } from "react";
import axios from "./axios";

function Row(props) {
  const { title, fetchUrl } = props;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies);
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}

export default Row;
