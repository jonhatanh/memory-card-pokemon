import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'
import GameLayout from './components/GameLayout.tsx'
import Modal from './components/Modal.tsx'
import MenuButton from './components/MenuButton.tsx'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { audios } from './constans.ts'


function App () {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)
  function handleOpenModal (value = true) {
    setModalIsOpen(value)
  }

  const handleToggleMute = () => {
    if (audioRef.current && isMuted) {
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
          src='/assets/forestBackground.png'
          alt='Main Menu Image'
        />
        <audio
          ref={audioRef}
          src={audios.backgroundMusic}
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
