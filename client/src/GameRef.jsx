import './game/PhaserGame.ts'
import GameAPP from './game/App'


import muiTheme from './game/MuiTheme'
import {
  ThemeProvider
} from '@mui/material/styles'


import KeyBoardTips from 'components/KeyboardTips'



const GameRef = () => {


  return (
    <ThemeProvider theme={muiTheme} >
      <KeyBoardTips />
      <GameAPP />
     
    </ThemeProvider>
  )
}

export default GameRef