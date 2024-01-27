import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'
import GameLayout from './components/GameLayout'
import Modal from './components/Modal'
import MenuButton from './components/MenuButton'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const audioUrl = '/src/assets/EternaForestCompressed.mp3'
function App () {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef(null)
  function handleOpenModal (value = true) {
    setModalIsOpen(value)
  }

  const handleToggleMute = () => {
    if (audioRef && isMuted) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
    setIsMuted(!isMuted)
  }
  return (
    <>
      <div className='relative min-h-dvh overflow-hidden bg-black'>
        <img
          className='absolute h-full w-full object-cover object-bottom opacity-60'
          src='/src/assets/forestBackground.png'
          alt='Main Menu Image'
        />
        <audio
          ref={audioRef}
          src={audioUrl}
          loop
          autoPlay={!isMuted}
          muted={isMuted}
        />

        {modalIsOpen && (
          <Modal isOpen={modalIsOpen}>
            <MenuButton onClick={() => setModalIsOpen(false)}>
              Start Game
            </MenuButton>
            <MenuButton onClick={handleToggleMute}>
              Music: {isMuted ? 'OFF' : 'ON'}
            </MenuButton>
            <MenuButton
              onClick={() =>
                window.open(
                  'https://github.com/jonhatanh/memory-card-pokemon',
                  '_blank'
                )}
            >
              GitHub Repo{' '}
              <FontAwesomeIcon
                className='ml-1 text-lg hover:animate-spin'
                icon={faGithub}
              />
            </MenuButton>
          </Modal>
        )}
        {!modalIsOpen && (
          <GameLayout
            handleOpenMainModal={handleOpenModal}
            handleToggleMute={handleToggleMute}
            musicMuted={isMuted}
          />
        )}
      </div>
    </>
  )
}

export default App
