import { useState } from "react";
import { useMutation } from "@apollo/client";
import LOGIN from "../services/auth/login";
import Grid from "@mui/material/Unstable_Grid2";
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
import devlink from "../devlinkicon.png";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import standing from "../standing.png";

const SignUp = () => {
  const [email, setEmail] = useState(null);
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [signUp, { data, loading, error }] = useMutation(LOGIN);

  const signUpUser = () => {
    signUp({
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
    const response = signUpUser();
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
      <Grid xs={12} md={8} lg={8} order={{ xs: 2, sm: 1, md: 1, lg: 1 }}>
        <Box
          style={{
            width: "20%",
            display: "flex",
          }}
        >
          <img
            src={devlink}
            style={{
              width: "125%",
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
            xs={10}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "left",
              width: "80%",
            }}
          >
            <Typography
              component="h1"
              sx={{
                width: "65%",
                fontWeight: "bold",
                fontSize: "3rem",
              }}
            >
              Create your account
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: "1rem",
                mb: 3,
                width: "65%",
                color: "#A5A7A0",
              }}
            >
              Choose your Devlink username. You can always change it later.
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
                  Username
                </Typography>
              }
              type="text"
              size="medium"
              margin={"normal"}
              variant="outlined"
              sx={{
                width: "65%",
                backgroundColor: "#EFF0EC",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                borderRadius: "8px",
              }}
            />
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
                  Email
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
                mb: 3,
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
            <FormControl
              sx={{
                mb: 3,
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
                  Confirm Password
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
              Create Account
            </Button>
            <Typography
              sx={{
                fontSize: "1.25rem",
              }}
            >
              Already have an account?{" "}
              <a
                href="/login"
                style={{
                  color: "#8129D9",
                }}
              >
                Log in
              </a>
            </Typography>
          </Grid>
        </Box>
      </Grid>
      <Grid
        xs={12}
        md={4}
        lg={4}
        order={{ xs: 1, sm: 2, md: 2, lg: 2 }}
        sx={{
          backgroundColor: "#D6A336",
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
          }}
        >
          <img
            src={standing}
            style={{
              width: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
