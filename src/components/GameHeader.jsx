import {
  faForward,
  faGear,
  faPlay,
  faRotateRight,
  faVolumeHigh
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconButton from './IconButton'

export default function GameHeader({
  handleClickSettings,
  handleClickMusic,
  score,
  bestScore,
  totalPokemons,
  gameEnded,
  handleNextLevel,
}) {
  return (
    <header className='mt-10 flex flex-wrap '>
      {/* Top header */}
      <div className='relative flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-7'>
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
        <div className='flex flex-wrap items-center gap-2 text-4xl text-white md:absolute md:right-7'>
          {gameEnded && (
            <IconButton hoverText='Next Level' onClick={()=> handleNextLevel()}>
              <FontAwesomeIcon className='text-main' icon={faForward} />
            </IconButton>
          )}
          <IconButton hoverText='Mute Music' onClick={() => handleClickMusic()}>
            <FontAwesomeIcon icon={faVolumeHigh} />
          </IconButton>
          <IconButton
            hoverText='Settings'
            onClick={() => handleClickSettings()}
          >
            <FontAwesomeIcon icon={faGear} />
          </IconButton>
        </div>
      </div>
      <div className='flex flex-1 flex-wrap items-center justify-center gap-5 text-3xl text-white'>
        <p>
          Current Score: {score} / {totalPokemons}
        </p>
        <p className='text-main  drop-shadow-surrounded-blue'>
          Best Score: {bestScore}
        </p>
      </div>
    </header>
  )
}
