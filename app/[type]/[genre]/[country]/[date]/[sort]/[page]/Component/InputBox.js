"use client"
import React from 'react'
import { movieGenre, tvGenre } from '../Genres';
import { useRouter } from 'nextjs-toploader/app';


const InputBox = ({params}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = React.useState(false);
  const [genreDropdownOpen, setGenreDropdownOpen] = React.useState(false);

  const router = useRouter()
  const currentYear = new Date().getFullYear();
  const years = []; // Array to hold years
  const type = params.type
  const genre = params.genre
  const country = params.country
  const date = params.date
  const sort = params.sort
  for (let year = 1940; year <= currentYear; year++) {
    years.push(year);
  }
  return (
    <div className={` flex  items-center ${genre == '16'?' w-full sm:w-[60%] md:w-[40%]':'  w-full sm:w-[80%] md:w-[50%]'} justify-between`}>
      <div >
      <div className="relative">
  <div 
    className="cursor-pointer outline-none bg-black w-24 sm:w-32 lg:w-52 rounded-lg border-white border-[1px] border-opacity-40 px-2 py-2 text-white"
    onClick={() => setDropdownOpen(!dropdownOpen)}
  >
    {params.date || "Select Year"}
  </div>

  {dropdownOpen && (
    <div className="absolute z-30 bg-black w-24 sm:w-32 lg:w-52 rounded-lg border-white border-[1px] border-opacity-40 mt-1 max-h-60 overflow-y-auto scrollbar-track-black scrollbar-thin scrollbar-thumb-slate-400 ">
      {years.map((year) => (
        <div 
          key={year} 
          className="px-2 py-2 cursor-pointer hover:bg-slate-600"
          onClick={() => {
            setDropdownOpen(false);
            router.push(`/${type}/${genre}/${country}/${year}/${sort}/1`);
          }}
        >
          {year}
        </div>
      ))}
    </div>
  )}
</div>

      </div>
      <div>
      <div className="relative">
  <div
    className="cursor-pointer overflow-hidden whitespace-nowrap outline-none bg-black w-24 sm:w-32 lg:w-52 rounded-lg border-white border-[1px] border-opacity-40 px-2 py-2 text-white"
    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
  >
    {params.sort == "1"
      ? "Most Popular"
      : params.sort == "2"
      ? "Most Rated"
      : params.sort == "3"
      ? "Most Recent"
      : "Sort by"}
  </div>

  {sortDropdownOpen && (
    <div className="absolute overflow-x-hidden bg-black w-24 sm:w-32 lg:w-52 rounded-lg border-white border-[1px] border-opacity-40 mt-1 z-30">
      <div
        className="px-2 py-2 whitespace-nowrap cursor-pointer hover:bg-slate-600"
        onClick={() => {
          setSortDropdownOpen(false);
          router.push(`/${type}/${genre}/${country}/${date}/1/1`);
        }}
      >
        Most Popular
      </div>
      <div
        className="px-2 py-2 whitespace-nowrap cursor-pointer hover:bg-slate-600"
        onClick={() => {
          setSortDropdownOpen(false);
          router.push(`/${type}/${genre}/${country}/${date}/2/1`);
        }}
      >
        Most Rated
      </div>
      <div
        className="px-2 py-2 whitespace-nowrap cursor-pointer hover:bg-slate-600"
        onClick={() => {
          setSortDropdownOpen(false);
          router.push(`/${type}/${genre}/${country}/${date}/3/1`);
        }}
      >
        Most Recent
      </div>
    </div>
  )}
</div>

      </div>
      <div>
        {type == "movie"?
        <div>
<div className="relative">
  <div
    className="cursor-pointer whitespace-nowrap overflow-hidden outline-none bg-black w-20 sm:w-32 lg:w-52 rounded-lg border-white border-[1px] border-opacity-40 px-2 py-2 text-white"
    onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
  >
    {genre ? movieGenre.find((g) => g.id == genre)?.name || "Genre" : "Genre"}
  </div>

  {genreDropdownOpen && (
    <div className="absolute overflow-x-hidden  bg-black w-20 sm:w-32 lg:w-52 rounded-lg border-white border-[1px] border-opacity-40 mt-1 z-30 max-h-60 overflow-y-auto scrollbar-track-black scrollbar-thin scrollbar-thumb-slate-400">
      {movieGenre.map((item) => (
        <div
          key={item.id}
          className="px-2 py-2 whitespace-nowrap cursor-pointer hover:bg-slate-600"
          onClick={() => {
            setGenreDropdownOpen(false);
            router.push(`/${type}/${item.id}/${country}/${date}/${sort}/1`);
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  )}
</div>

        </div>:
        <div>
            {genre != '16'&&<div className="relative">
  <div
    className="cursor-pointer outline-none bg-black w-20 sm:w-32 lg:w-52 rounded-lg border-white border-[1px] border-opacity-40 px-2 py-2 text-white"
    onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
  >
    {genre ? tvGenre.find((g) => g.id == genre)?.name || "Genre" : "Genre"}
  </div>

  {genreDropdownOpen && (
    <div className="absolute bg-black w-20 overflow-x-hidden sm:w-32 lg:w-52 rounded-lg border-white border-[1px] border-opacity-40 mt-1 z-30 max-h-60 overflow-y-auto scrollbar-track-black scrollbar-thin scrollbar-thumb-slate-400">
      {tvGenre.map((item) => (
        <div
          key={item.id}
          className="px-2 py-2 whitespace-nowrap cursor-pointer hover:bg-slate-600"
          onClick={() => {
            setGenreDropdownOpen(false);
            router.push(`/${type}/${item.id}/${country}/${date}/${sort}/1`);
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  )}
</div>
}
        </div>}
      </div>
    </div>
  )
}

export default InputBox