export default function IconButton ({
  children,
  hoverText = '',
  ...extraProps
}) {
  const haveText = hoverText !== ''

  return (
    <button
      className='group relative flex items-center justify-center text-4xl text-white'
      {...extraProps}
    >
      {haveText && (
        <p className='absolute bottom-full min-w-min whitespace-nowrap text-center text-2xl opacity-0 transition-all group-hover:opacity-100'>
          {hoverText}
        </p>
      )}
      {children}
    </button>
  )
}
