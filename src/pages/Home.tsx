import React, { useEffect, useState } from "react";

import Card from "../components/Card";
import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Scrollbar } from "swiper";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import { useDispatch } from "react-redux";
import {
  Item,
  addItemToFav,
  removeItemFromFav,
} from "../features/favoriteSlice";
import Swal from "sweetalert2";
import { SpinningCircles } from "react-loading-icons";

export const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [popular, setPopular] = useState([]);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  function getAllPages(page: number) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=c0cf889b8d4bcdc45ffc8742122630d5&language=en-US&page=${page.toString()}`,
      )
      .then((response) => {
        setLoading(true);
        setData(response.data.results);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=${
          import.meta.env.VITE_KEY
        }`,
      )
      .then((res) => {
        setLoading(true);
        setPopular(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

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

  //handle next page
  function nextPage() {
    setCount(count + 1);
    getAllPages(count);
  }
  //handle previous page
  function prevPage() {
    setCount(count - 1);
    getAllPages(count);
  }

  return (
    <>
      {/*bann */}
      <div className="flex">
        <Banner />
        {/* <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            className="w-full h-[250px]"
          >

            {popular.map((item: any) => {
                console.log();
                
              return (
                <SwiperSlide className="" >
                  <img className="h-96 w-full"
                    src={"https://image.tmdb.org/t/p/w500" + item.poster_path}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper> */}
      </div>
      <div
        className={`grid lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-3 ml-4 xl:p-auto 2xl:grid-cols-5 md:p-5 lg:p-6 cursor-pointer h-auto"
          }`}
      >
        {popular && loading === true ? (
          popular.map((items: any, index) => {
            return (
              <Card
                key={index}
                img={items.poster_path}
                handleRemoveFav={() => handleRemove(items.id)}
                handleFavList={() => handleAddToFav(items)}
                onClick={() =>
                  navigate(`/detail/${items.id}`, {
                    state: {
                      id: items.id,
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

      {/* api for all page */}
      <div
        className={`grid lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-3 ml-4 xl:p-auto 2xl:grid-cols-5 md:p-5 lg:p-6 cursor-pointer h-auto "
          }`}
      >
        {data && loading === true ? (
          data.map((items: any, index) => {
            return (
              <Card
                key={index}
                img={items.poster_path}
                handleRemoveFav={() => handleRemove(items.id)}
                handleFavList={() => handleAddToFav(items)}
                onClick={() =>
                  navigate(`/detail/${items.id}`, {
                    state: {
                      id: items.id,
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

      {/* button for next page */}
      <div className="btn-group flex justify-center">
        <button className="btn" onClick={() => prevPage()}>
          «
        </button>
        <button className="btn">{count}</button>
        <button className="btn" onClick={() => nextPage()}>
          »
        </button>
      </div>
    </>
  );
};

export default Home;
