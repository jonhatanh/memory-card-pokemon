import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MenuButton ({ children, onClick }) {
  return (
    <button
      onClick={() => onClick()}
      className='hover:text-main group flex animate-pulse items-center text-2xl  text-white transition-all'
    >
      <FontAwesomeIcon
        className='mb-1 opacity-0 duration-150 group-hover:opacity-100'
        icon={faCaretRight}
      />
      <span className='block text-start transition-all duration-150 ease-out group-hover:translate-x-2'>
        {children}
      </span>
    </button>
  )
}
