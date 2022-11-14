import { useMutation } from "@apollo/client";
import LOGIN from "../services/auth/login";
import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import sitting from "../Sitting.png";
import devlink from "../devlinkicon.png";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [login, { data, loading, error }] = useMutation(LOGIN);

  const loginUser = () => {
    login({
      variables: {
        data: {
          email,
          username,
          password,
        },
      },
    });
  };
  const handleLogin = () => {
    const response = loginUser();
    localStorage.setItem("accesToken", response.accesToken);
    localStorage.setItem("refreshToken", response.refreshToken);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid container>
      <Grid
        xs={12}
        md={8}
        lg={8}
        order={{ xs: 2, sm: 1, md: 1, lg: 1 }}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          style={{
            width: "100%",
            height: "100vh",
          }}
        >
          <Box
            style={{
              width: "20%",
            }}
          >
            <img
              src={devlink}
              style={{
                width: "125%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "left",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Typography
                component="h1"
                sx={{
                  width: "65%",
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "3rem",
                  mb: 5,
                }}
              >
                Log in to your Devlink
              </Typography>
              <TextField
                id="outlined-input"
                label={
                  <Typography
                    component="h4"
                    sx={{
                      color: "#91948B",
                      fontWeight: "bold",
                    }}
                  >
                    Username or email
                  </Typography>
                }
                type="text"
                size="medium"
                margin={"normal"}
                variant="outlined"
                sx={{
                  mb: 3,
                  width: "65%",
                  backgroundColor: "#EFF0EC",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  borderRadius: "8px",
                }}
              />

              <FormControl
                sx={{
                  mb: 5,
                  width: "65%",
                  backgroundColor: "#EFF0EC",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  borderRadius: "8px",
                  fontWeight: "bold",
                }}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  <Typography
                    component="h4"
                    sx={{
                      color: "#91948B",
                      fontWeight: "bold",
                    }}
                  >
                    Password
                  </Typography>
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <Button
                variant="contained"
                sx={{
                  width: "65%",
                  padding: "18px",
                  backgroundColor: "#8129D9",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  mb: 5,
                }}
              >
                Log In
              </Button>

              <Typography
                sx={{
                  fontSize: "1.25rem",
                }}
              >
                Don't have an account?{" "}
                <a
                  href="/signup"
                  style={{
                    color: "#8129D9",
                  }}
                >
                  Create one
                </a>
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid
        xs={12}
        md={4}
        lg={4}
        order={{ xs: 1, sm: 2, md: 2, lg: 2 }}
        style={{
          backgroundColor: "#E9C0E9",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            height: "80%",
          }}
        >
          <img
            src={sitting}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
