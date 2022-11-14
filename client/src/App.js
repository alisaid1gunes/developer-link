import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Analytics from "./pages/Analytics";
import MyAccount from "./pages/MyAccount";
import Links from "./pages/Links";
import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  // buttons, links and other components with text would automatically use the global font family
});
function App() {
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container
          maxWidth={false}
          style={{
            padding: "0px",
            minWidth: "100vw",
            minHeight: "100vh",
          }}
        >
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/links" element={<Links />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
