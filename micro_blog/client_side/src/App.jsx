import { ThemeProvider } from "styled-components";
import { GlobalStyle, StyledApp } from "./styled";
import { darkTheme } from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import { Signup } from "./component";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const user = useContext(UserContext);

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <StyledApp>{user?.loggedIn ? "logged In" : <Signup />}</StyledApp>
      </ThemeProvider>
    </Router>
  );
}

export default App;
