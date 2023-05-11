import { ThemeProvider } from 'styled-components'
import { GlobalStyle, StyledApp } from './styled'
import { darkTheme } from './theme'
import {BrowserRouter as Router} from 'react-router-dom'

function App() {

  return (
    <Router>
      <ThemeProvider theme={darkTheme} >
        <GlobalStyle/>
        <StyledApp>
          <h1>Hello</h1>
        </StyledApp>
      </ThemeProvider>
    </Router>
  )
}

export default App
