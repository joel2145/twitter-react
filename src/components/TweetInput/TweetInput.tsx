import React, { useState } from "react";
import { useSelector } from "react-redux";
import firebase from "firebase/app";
import { Button, IconButton } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import { auth, db, storage } from "../../firebase";
import { selectUser } from "../../features/userSlice";
import styles from "./TweetInput.module.css";

export const TweetInput: React.FC = () => {
  const user = useSelector(selectUser);
  const [tweetMsg, setTweetMsg] = useState("");
  const [tweetImg, setTweetImg] = useState<File | null>(null);

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setTweetImg(e.target.files![0]);
      e.target.value = "";
    }
  };
  const sendTweet = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tweetImg) {
      // ランダムな文字列を作成しているのだが、ここらへんは難しくてよくわかっていない、、
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + tweetImg.name;

      // 画像をアップロード
      const uploadTweetImg = storage.ref(`images/${fileName}`).put(tweetImg);
      uploadTweetImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,

        () => {},
        (err) => {
          alert(err.message);
        },
        async () => {
          await storage
            .ref("images")
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection("posts").add({
                image: url,
                text: tweetMsg,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                username: user.displayName,
              });
            });
        }
      );
    } else {
      db.collection("posts").add({
        image: "",
        text: tweetMsg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: user.displayName,
      });
      console.log(user.displayName);
    }
    setTweetImg(null);
    setTweetMsg("");
  };

  return (
    <>
      <form onSubmit={sendTweet}>
        <div className={styles.tweet_form}>
          {user.displayName && <p>Hello！{user.displayName}!</p>}
          <input
            className={styles.tweet_input}
            placeholder="今何してる？"
            type="text"
            autoFocus
            value={tweetMsg}
            onChange={(e) => setTweetMsg(e.target.value)}
          ></input>
          <IconButton>
            <label>
              <AddAPhotoIcon
                className={
                  tweetImg ? styles.tweet_addIconLoaded : styles.tweet_addIcon
                }
              />
              <input
                className={styles.tweet_hiddenIcon}
                placeholder="今何してる？"
                type="file"
                onChange={(e) => onChangeImageHandler(e)}
              ></input>
            </label>
          </IconButton>
        </div>
        <Button
          type="submit"
          disabled={!tweetMsg}
          className={
            tweetMsg ? styles.tweet_sendBtn : styles.tweet_sendDisableBtn
          }
        >
          Tweet
        </Button>
      </form>
    </>
  );
};
