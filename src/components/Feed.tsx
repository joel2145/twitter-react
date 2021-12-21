import React, { useEffect, useState } from "react";

import { db } from "../firebase";
import { TweetInput } from "./TweetInput";
import styles from "./Feed.module.css";
import { Button } from "@material-ui/core";
import { auth } from "../firebase";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState([
    {
      id: "",
      image: "",
      text: "",
      timestamp: null,
      username: "",
    },
  ]);

  const onClickLogOut = () => {
    auth
      .signOut()
      .then(() => {
        // console.log("ログアウトしました");
      })
      .catch((error) => {
        console.log(`ログアウト時にエラーが発生しました (${error})`);
      });
  };

  // firebaseから投稿のデータを取得する
  useEffect(() => {
    const unSub = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            image: doc.data().image,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
          }))
        );
      });
    return () => {
      unSub();
    };
  }, []);

  return (
    <div className={styles.feed}>
      <p>this is FeedPage</p>
      <TweetInput />
      <Button onClick={() => onClickLogOut()}>ログアウト</Button>
      {posts.map((post) => (
        <p key={post.id}>{post.id}</p>
      ))}
    </div>
  );
};

export default Feed;
