import React, { FC, useState, useEffect} from "react";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import ApiHome from "../service/ApiHome";
import { useNavigate } from "react-router-dom";
import {SpinningCircles} from 'react-loading-icons'

import Button from "../components/Button";

interface detailProps {
  item?: any;
  handleAddFav?: React.MouseEventHandler;
  handleRemoveFav?: React.MouseEventHandler;
}
const img = "https://image.tmdb.org/t/p/w500";
export const Detail: FC<detailProps> = ({ item,handleAddFav, handleRemoveFav }) => {
  const location = useLocation();

  const [data, setData] = useState(item);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function getDetail() {
    ApiHome.getMovie(location?.state.id)
      .then((res) => {
        console.log(res.data);
        setLoading(true);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="hero min-h-screen bg-base-200 ">
      
        {data && loading === true ? (
          <>
              <div className="hero-content flex-col lg:flex-row justify-center align-center ">
            <img
              className="w-auto h-[600px] rounded-md"
              src={img + data.poster_path}
              alt="Movie"
            />
            <div className="card-body font-poppins">
              <h2 className="card-title text-5xl font-bold mb-10">{data.title}</h2>
              <h2 className="text-xl">Ratings : {data.vote_average}</h2>
              <h2 className="text-xl">Release : {data.release_date}</h2>
              <h2 className="text-xl">Description :  </h2>
              <h5>{data.overview}</h5>
              <div className="card-actions justify-start mt-10 ">
                <button
                  className="btn btn-primary w-40"
                  onClick={() => navigate("/")}
                >
                  Watch
                </button>
              </div>
           
            </div>
            </div>

           
          </>
        ) : (
          <h1 className="flex justify-center"><SpinningCircles /></h1>
        )}
    </div>
  );
};
export default Detail;
