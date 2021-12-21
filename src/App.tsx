import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./App.module.css";
import { Auth } from "./components/Auth/Auth";
import Feed from "./components/Feed/Feed";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // ユーザー情報に何かしらの変化が起こったときに動作する
    const unSub = auth.onAuthStateChanged((authUser: any) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoURL: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  return (
    <>
      {user.uid ? (
        <div className={styles.app}>
          <Feed />
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
