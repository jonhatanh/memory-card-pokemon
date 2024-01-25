import { faCaretRight, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import GameLayout from './components/GameLayout'
import Modal from './components/Modal'
import MenuButton from './components/MenuButton'

function App () {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  // function handleMouseEnter (e, pokemonId) {
  //   e.target.src = pokemon.sprites.animated
  // }
  // function handleMouseLeave (e, pokemonId) {
  //   e.target.src = pokemon.sprites.normal
  // }
  function handleOpenModal (value = true) {
    setModalIsOpen(value)
  }
  return (
    <>
      <div className='relative min-h-dvh bg-black overflow-hidden'>
        <img
          className='absolute h-full w-full object-cover object-bottom opacity-60'
          src='/src/assets/forestBackground.png'
          alt='Main Menu Image'
        />
        {/* Main Menu */}
        {modalIsOpen && (
          <Modal isOpen={modalIsOpen}>
            <MenuButton onClick={() => setModalIsOpen(false)}>
              Start Game
            </MenuButton>
          </Modal>
        )}

        {!modalIsOpen && (
          <GameLayout
            handleOpenMainModal={handleOpenModal}
          />
        )}
      </div>
    </>
  )
}

export default App
