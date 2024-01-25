import { faGear, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GameHeader({ handleClickSettings, handleClickMusic, score, bestScore }) {
  return (
    <header className='mt-10 flex flex-wrap border-2 border-sky-500'>
      {/* Top header */}
      <div className='relative flex w-full flex-wrap items-center justify-center gap-x-5'>
        <div className='flex flex-wrap items-center justify-center gap-1'>
          <img
            className='h-16 w-16 pb-1 '
            src='/src/assets/pokeball.png'
            alt='Pokeball image'
          />
          <h1 className='text-center text-6xl text-slate-700 drop-shadow-surrounded'>
            Memory Card Game
          </h1>
        </div>
        <div className='flex flex-wrap items-center gap-2 text-4xl text-white md:absolute md:right-3'>
          <button onClick={() => handleClickMusic()} className=''>
            <FontAwesomeIcon className='mt-2' icon={faVolumeHigh} />
          </button>
          <button
            onClick={() => handleClickSettings()}
            className='ml-auto mr-3 text-4xl text-white hover:animate-spin'
          >
            <FontAwesomeIcon className='mt-2' icon={faGear} />
          </button>
        </div>
      </div>
      <div className='flex flex-1 flex-wrap items-center justify-center gap-5 text-3xl text-white'>
        <p>Current Score: {score}</p>
        <p className='text-main  drop-shadow-surrounded-blue'>
          Best Score: {bestScore}
        </p>
      </div>
    </header>
  )
}
