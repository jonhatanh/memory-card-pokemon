import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Modal ({ isOpen, children }) {
  const className = {
    'main-div': `relative mx-auto min-h-dvh w-full items-center justify-center border-2 border-white ${
      isOpen ? 'flex' : 'hidden'
    }`
  }
  return (
    <div className={className['main-div']}>
      <div className='relative w-80 rounded-md border-b-2 border-t-2 border-dashed border-white border-opacity-40 p-2'>
        <h1 className='flex flex-col text-center text-6xl text-slate-700'>
          <span className='text-[#FFCC00] drop-shadow-surrounded-blue'>
            Pokémon
          </span>
          <span className='drop-shadow-surrounded'>Memory Card</span>
        </h1>
        <div className='m-5 ml-8 flex flex-col gap-2'>
          {children}
          {/* <button className='group flex items-center text-2xl text-white'>
            <FontAwesomeIcon
              className='mb-1 opacity-0 duration-150 group-hover:opacity-100'
              icon={faCaretRight}
            />
            <span className='block text-center transition-all duration-150 ease-out group-hover:translate-x-2'>
              Start Game
            </span>
          </button> */}
        </div>
      </div>
    </div>
  )
}
