import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { Button, IconButton, makeStyles } from "@material-ui/core";
import { Send } from "@material-ui/icons";

import styles from "./Post.module.css";
import { db } from "../../firebase";
import { selectUser } from "../../features/userSlice";

interface Props {
  postId: string;
  image: string;
  text: string;
  timestamp: any;
  username: string;
}

export const Post: React.FC<Props> = (props) => {
  const { postId, image, text, timestamp, username } = props;
  const user = useSelector(selectUser);
  const [comment, setComment] = useState("");

  const newComment = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
    });
    setComment("");
  };

  return (
    <>
      <div className={styles.post}>
        <div className={styles.post_body}>
          <div className={styles.post_header}>
            <h3>
              <span className={styles.post_headerUser}>@{username}</span>
              <span className={styles.post_headerTime}>
                {new Date(timestamp?.toDate()).toLocaleString("ja")}
              </span>
            </h3>
          </div>
          <div className={styles.post_tweet}>
            <p>{text}</p>
          </div>
          {image && (
            <div className={styles.post_tweetImage}>
              <img src={image} alt="tweet" />
            </div>
          )}

          {/* コメント機能 */}
          <form onSubmit={newComment}>
            <div className={styles.post_form}>
              <input
                className={styles.post_input}
                placeholder="コメントする"
                type="text"
                // autoFocus
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></input>
              <button
                type="submit"
                disabled={!comment}
                className={
                  comment ? styles.post_button : styles.post_buttonDisable
                }
              >
                <Send></Send>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
