import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PropsWithChildren } from 'react'

export default function MenuButton ({ children, onClick } : PropsWithChildren<{ onClick: () => void }>) {
  return (
    <button
      onClick={() => onClick()}
      className='group flex animate-pulse items-center text-2xl text-white  transition-all hover:text-main'
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
