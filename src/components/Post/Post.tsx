import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { Button, IconButton, makeStyles } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import MessageIcon from "@material-ui/icons/Message";

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

interface Comment {
  id: string;
  text: string;
  timestamp: any;
  username: string;
}

export const Post: React.FC<Props> = (props) => {
  const { postId, image, text, timestamp, username } = props;
  const user = useSelector(selectUser);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "",
      text: "",
      timestamp: null,
      username: "",
    },
  ]);
  const [openComments, setOpenComments] = useState(false);

  // コメントを表示させる機能
  useEffect(() => {
    const unSub = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot: any) => {
        setComments(
          snapshot.docs.map((doc: any) => ({
            text: doc.data().text,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
          }))
        );
      });
    return () => {
      unSub();
    };
  }, [postId]);

  // firebaseに新規コメントを保存
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
      <div className={styles.post} key={postId}>
        <div className={styles.post_body}>
          {/* 投稿 */}
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
          <MessageIcon
            className={styles.post_commentIcon}
            onClick={() => setOpenComments(!openComments)}
          ></MessageIcon>

          {openComments && (
            <>
              {/* コメント一覧 */}
              {comments.map((com) => (
                <div className={styles.post_comment} key={com.id}>
                  <span className={styles.post_commentUser}>
                    @{com.username}
                  </span>
                  <span className={styles.post_commentText}>@{com.text}</span>
                  <span className={styles.post_headerTime}>
                    {new Date(com.timestamp?.toDate()).toLocaleString("ja")}
                  </span>
                </div>
              ))}

              {/* 新規コメント機能 */}
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
            </>
          )}
        </div>
      </div>
    </>
  );
};
