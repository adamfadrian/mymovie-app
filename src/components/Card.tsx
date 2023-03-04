import React, { FC } from "react";

interface Props {
  img: string;
  title?: string;
  onClick?: React.MouseEventHandler;
  handleAddFav?: React.MouseEventHandler;
  handleRemoveFav?: React.MouseEventHandler;
  handleFavList?: React.MouseEventHandler;
}

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const Card: FC<Props> = ({
  img,
  onClick,
  handleAddFav,
  handleRemoveFav,
  handleFavList,

}) => {
  return (
    <div className=" mb-10 h-auto mx-auto cursor-pointer w-full xl:w-[280px] 2xl:w-[300px] shadow-md rounded-2xl">
      <img
        onClick={onClick ? onClick : () => {}}
        className="rounded-2xl hover:rounded-1xl duration-100 hover:scale-125 image-full"
        src={IMG_URL + img}
      />
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 align-middle justify-center mt-5 mb-5">
          <button className="btn bg-slate-700 outline-none border-none text-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white w-28 " onClick={handleRemoveFav}>
            remove from fav
          </button>
          <button className="btn bg-slate-700 outline-none border-none text-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white w-28" onClick={handleFavList}>
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
