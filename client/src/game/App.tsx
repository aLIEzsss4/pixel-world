import React from 'react'

import { useAppSelector } from './hooks'

import LoginDialog from './components/LoginDialog'
import FishingCom from './components/Fishing'
import NFTsCom from './components/Balance'
import Chat from './components/Chat'

// import Debug from './components/Debug'

function App() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn)
  const fishOpen = useAppSelector((state) => state.fishing.open)

  console.log(loggedIn,'loggedIn')

  return (

      <div className="App">
        {/* <Debug /> */}

        {/* Render the LoginDialog if not logged in, else render Chat. */}
        {loggedIn ? <Chat /> : <LoginDialog />}

        {/* Render the ComputerDialog if user is using a computer. */}
      {<FishingCom/>}
      {<NFTsCom />}

        {/* Render the VideoConnectionDialog if user is not connected to a webcam. */}
        {/* {!computerDialogOpen && !videoConnected && loggedIn && <VideoConnectionDialog />} */}
      </div>

  )
}

export default App
