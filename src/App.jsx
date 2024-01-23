import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

function App () {
  return (
    <>
      <div className='min-h-dvh bg-black'>
        {/* Main Menu */}
        <div className='relative mx-auto flex min-h-dvh w-full items-center justify-center border-2 border-white'>
          <img
            className='absolute h-full w-full object-cover object-bottom opacity-60'
            src='/src/assets/forestBackground.png'
            alt='Main Menu Image'
          />
          <div className='relative w-80 rounded-md border-b-2 border-t-2 border-dashed border-white border-opacity-30 p-2'>
            <h1 className='flex flex-col text-center text-6xl text-slate-700'>
              <span className='drop-shadow-surrounded-blue text-[#FFCC00]'>
                Pokémon
              </span>
              <span className='drop-shadow-surrounded'>Memory Card</span>
            </h1>
            <div className='m-5 ml-8'>
              <button className='group text-2xl text-white flex items-center'>
                <FontAwesomeIcon
                  className='opacity-0 mb-1 duration-150 group-hover:opacity-100'
                  icon={faCaretRight}
                />
                <span className='block text-center duration-150 transition-all ease-out group-hover:translate-x-2'>
                  Start Game
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
