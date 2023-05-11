import { ThemeProvider } from 'styled-components'
import { GlobalStyle, StyledApp } from './styled'
import { darkTheme } from './theme'
import {BrowserRouter as Router} from 'react-router-dom'
import { Signup } from './component'

function App() {

  return (
    <Router>
      <ThemeProvider theme={darkTheme} >
        <GlobalStyle/>
        <StyledApp>
          <Signup/>
        </StyledApp>
      </ThemeProvider>
    </Router>
  )
}

export default App
