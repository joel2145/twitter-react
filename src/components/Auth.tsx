import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  makeStyles,
  Modal,
  IconButton,
  Box,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import CameraIcon from "@material-ui/icons/Camera";
import EmailIcon from "@material-ui/icons/Email";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import styles from "./Auth.module.scss";
import { auth, provider, storage } from "../firebase";
import { setupMaster } from "cluster";
import { cursorTo } from "readline";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1503756234508-e32369269deb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  pointer: {
    cursor: "pointer",
  },
}));

export const Auth: React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  // ログイン画面とセットアップ画面の切り替え
  const [isLogin, setIsLogin] = useState(true);

  const signInEmail = async () => {
    // await auth.signInWithEmailAndPassword(email, password);
    console.log("signInEmail");
  };
  const signUpEmail = async () => {
    // await auth.createUserWithEmailAndPassword(email, password);
    console.log("signUpEmail");
  };
  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isLogin ? "ログイン" : "新規登録"}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassWord(e.target.value)
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // {...(isLogin
              //   ? (onclick = () => signInEmail())
              //   : (onclick = () => signUpEmail()))}
            >
              {isLogin ? "ログイン" : "新規登録"}
            </Button>

            <Grid container>
              <Grid item xs>
                <span>パスワードをお忘れですか？</span>
              </Grid>
              <Grid item xs>
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  className={classes.pointer}
                >
                  {isLogin
                    ? "新規登録はこちら"
                    : "既にアカウントをお持ちの方はこちら"}
                </span>
              </Grid>
            </Grid>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => signInGoogle()}
            >
              Googleアカウントでログインする
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
