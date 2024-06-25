import { PropsWithChildren } from "react"

export default function Modal ({ isOpen, children }: PropsWithChildren<{ isOpen: boolean }>) {
  const className = {
    'main-div': `absolute left-0 top-0 flex mx-auto transition-all duration-300 min-h-dvh w-full items-center justify-center ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none -translate-y-8'
    }`
  }
  return (
    <div className={className['main-div']}>
      <div className='relative w-80 rounded-md border-b-2 border-t-2 border-dashed border-white border-opacity-40 p-2'>
        <h1 className='flex flex-col text-center text-6xl text-slate-700'>
          <span className='text-main drop-shadow-surrounded-blue'>Pokémon</span>
          <span className='drop-shadow-surrounded'>Memory Card</span>
        </h1>
        <div className='m-5 ml-8 flex flex-col gap-2'>{children}</div>
      </div>
    </div>
  )
}
