import { faCaretRight, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import GameLayout from './components/GameLayout'
import Modal from './components/Modal'
import MenuButton from './components/MenuButton'

const audioUrl = '/src/assets/EternaForestCompressed.mp3'
function App () {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  function handleOpenModal (value = true) {
    setModalIsOpen(value)
  }

  const handleToggleMute = () => {
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
        <audio src={audioUrl} loop autoPlay={!isMuted} muted={isMuted} />
        {/* Main Menu */}
        {modalIsOpen && (
          <Modal isOpen={modalIsOpen}>
            <MenuButton onClick={() => setModalIsOpen(false)}>
              Start Game
            </MenuButton>
            <MenuButton onClick={handleToggleMute}>
              Music: {isMuted ? 'OFF' : 'ON'}
            </MenuButton>
          </Modal>
        )}

        {!modalIsOpen && <GameLayout handleOpenMainModal={handleOpenModal} handleToggleMute={handleToggleMute} musicMuted={isMuted} />}
      </div>
    </>
  )
}

export default App
