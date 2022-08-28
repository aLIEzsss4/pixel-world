import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'



import Adam from '../assets/Adam_login.png'
import Ash from '../assets/Ash_login.png'
import Lucy from '../assets/Lucy_login.png'
import Nancy from '../assets/Nancy_login.png'
import { useAppSelector, useAppDispatch } from '../hooks'
import { setLoggedIn } from '../stores/UserStore'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useAccount, } from 'wagmi'

// @ts-ignore
const Wrapper = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #222639;
  border-radius: 16px;
  padding: 36px 60px;
`

const Title = styled.h1`
  font-size: 24px;
  color: #eee;
  text-align: center;
`



const Content = styled.div`
  display: flex;
  margin: 36px 0 0;
`

const Left = styled.div`
  /* margin-right: 48px; */

  }
`



const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Warning = styled.div`
  margin-top: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
`

const avatars = [
  { name: 'adam', img: Adam },
  { name: 'ash', img: Ash },
  { name: 'lucy', img: Lucy },
  { name: 'nancy', img: Nancy },
]

export default function LoginDialog() {
  const [name, setName] = useState<string>('')
  const [avatarIndex, setAvatarIndex] = useState<number>(0)
  const [nameFieldEmpty, setNameFieldEmpty] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const connected = useAppSelector((state) => state.user.connected)
  const videoConnected = useAppSelector((state) => state.user.videoConnected)
  const game = phaserGame.scene.keys.game as Game


  const { address, isConnected } = useAccount()

  useEffect(()=>{
    if (isConnected){
      setShowError(false)
    }
  }, [isConnected])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name === '') {
      setNameFieldEmpty(true)
    } else if (!isConnected || !address){
      console.log(address, isConnected)
      setShowError(true)
      return 

    } else {
      if (connected) {
        console.log('Join! Name:', name, 'Avatar:', avatars[avatarIndex].name)
        game.registerKeys()
        game.myPlayer.setPlayerName(name)
        game.myPlayer.setPlayerTexture(avatars[avatarIndex].name)
        // game.network.readyToConnect()
        dispatch(setLoggedIn(true))
      }
    }
  }

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Title>Pixel World</Title>
      <Content>
        <Left>
          <TextField
            autoFocus
            fullWidth
            label="Name"
            variant="outlined"
            color="secondary"
            error={nameFieldEmpty}
            helperText={nameFieldEmpty && 'Name is required'}
            onInput={(e) => {
              setName((e.target as HTMLInputElement).value)
            }}
          />
          {showError && <Warning ><Alert severity="error">Please login to the wallet</Alert></Warning>}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: 12,
          }}>
            <ConnectButton />
          </div>
          <a href="https://mumbaifaucet.com/" target="_blank" style={{
            display: 'flex',
            justifyContent: 'center',
            padding: 12,
          }}>GET MATIC</a>
        </Left>
      </Content>
      <Bottom>
        <Button variant="contained" color="secondary" size="large" type="submit">
          Play
        </Button>
      </Bottom>
    </Wrapper>
  )
}
