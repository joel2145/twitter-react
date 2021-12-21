import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
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
  return (
    <>
      <div className={styles.post}>
        <div className={styles.post_body}>
          <div className={styles.post_header}>
            <h3>
              <span className={styles.post_headerUser}>@{username}</span>
              {/* {console.log(new Date(timestamp?.toDate()).toLocalString())} */}
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
        </div>
      </div>
    </>
  );
};
