import { useState } from 'react'
import { Button } from '@mui/material'
import './App.css'
import Typography from '@mui/material/Typography'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  useColorScheme
} from '@mui/material/styles'

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
} 

function App() {


  return (
    <>
      <ModeToggle />
      <Typography variant='body2' color="text.secondary">Test Typography</Typography>    
    </>
  )
}

export default App
