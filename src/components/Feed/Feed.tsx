import React, { useEffect, useState } from "react";

import { db } from "../../firebase";
import { TweetInput } from "../TweetInput/TweetInput";
import { Post } from "../../components/Post/Post";
import styles from "./Feed.module.css";
import { Button } from "@material-ui/core";
import { auth } from "../../firebase";

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
      .catch((error: any) => {
        console.log(`ログアウト時にエラーが発生しました (${error})`);
      });
  };

  // firebaseから投稿のデータを取得する
  useEffect(() => {
    const unSub = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot: any) => {
        setPosts(
          snapshot.docs.map((doc: any) => ({
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
      {posts[0]?.id && (
        <>
          {posts.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              image={post.image}
              text={post.text}
              timestamp={post.timestamp}
              username={post.username}
            ></Post>
          ))}
        </>
      )}
    </div>
  );
};

export default Feed;
