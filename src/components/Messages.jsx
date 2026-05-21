import React from "react";
import { formatRelative } from "date-fns";

const Message = ({
  createdAt = null,
  text = "",
  email = "",
  displayName = "",
  photoURL = "",
}) => {
  // console.log({ createdAt, text, displayName, photoURL });
  return (
    <div>
      {photoURL ? (
        <img src={photoURL} alt="Avatar" width={45} height={45} />
      ) : (
        <img
          src={
            photoURL || `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${email}`
          }
          alt="Avatar"
          width={45}
          height={45}
        />
      )}
      {displayName ? <p>{displayName}</p> : null}
      {createdAt?.seconds ? (
        <span>
          {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
        </span>
      ) : null}
      <p>{text}</p>
    </div>
  );
};
export default Message;

