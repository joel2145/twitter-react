import React from "react";

import { auth } from "../firebase";
import { TweetInput } from "./TweetInput";
import styles from "./Feed.module.css";

const Feed = () => {
  return (
    <div className={styles.feed}>
      <p>this is FeedPage</p>
      <TweetInput />
      <button onClick={() => auth.signOut()}>Logout</button>
    </div>
  );
};

export default Feed;
