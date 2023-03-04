import axios from "axios";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { SpinningCircles } from "react-loading-icons";
import { useDispatch } from "react-redux";
import {
  Item,
  addItemToFav,
  removeItemFromFav,
} from "../features/favoriteSlice";



const SearchPage = () => {
  const location = useLocation();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_KEY
        }&query=${location?.state.title}`,
      )
      .then((res) => {
        setLoading(true);
        setDatas(res.data.results);
      })
      .catch((err) => console.log(err));
    console.log(datas);
  }, [location]);

  //handle add to favorites
  function handleAddToFav(item: any) {
    const newItem: Item = {
      id: item.id,
      title: item.title,
      poster_path: item.poster_path,
      overview: item.overview,
      release_date: item.release_date,
    };
    dispatch(addItemToFav(newItem));
    Swal.fire({
      title: "Success",
      text: "Successfully add to Favorites",
      confirmButtonText: "OK",
    });
    console.log(newItem);
  }

  //handle remove From favorites
  function handleRemove(item: Item) {
    dispatch(removeItemFromFav(item.id));
    Swal.fire({
      title: "Success",
      text: "Successfully Removed From Favorites",
      confirmButtonText: "OK",
    });
    console.log(item);
  }

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-3 ml-4 xl:p-auto 2xl:grid-cols-5 md:p-5 lg:p-6 cursor-pointer h-auto">
      {datas && loading === true ? (
        datas.map((item: any, i: any) => {
          return (
            <Card
              title={item.title}
              img={item.poster_path}
              handleRemoveFav={() => handleRemove(item.id)}
              handleFavList={() => handleAddToFav(item)}
              onClick={() =>
                navigate(`/detail/${item.id}`, {
                  state: {
                    id: item.id,
                  },
                })
              }
            />
          );
        })
      ) : (
        <h1 className="flex justify-center">
          <SpinningCircles />
        </h1>
      )}
    </div>
  );
};

export default SearchPage;
