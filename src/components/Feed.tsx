import React from "react";

import { auth } from "../firebase";

const Feed = () => {
  return (
    <div>
      <p>this is FeedPage</p>
      <button onClick={() => auth.signOut()}>Logout</button>
    </div>
  );
};

export default Feed;
