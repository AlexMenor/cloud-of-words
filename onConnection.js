const { createRoom, removeRoom, getContext, getOwnerID } = require("./rooms");

module.exports.onConnection = (socket, io) => {
  const { id } = socket;

  socket.on("CREATE_ROOM", (data, callback) => {
    const { roomName, roomContext } = data;
    if (createRoom(roomName, id, roomContext)) {
      socket.on("disconnect", () => {
        removeRoom(roomName);
      });
      callback(true);
    } else callback(false);
  });

  socket.on("JOIN_ROOM", (data, callback) => {
    const { roomName } = data;
    const context = getContext(roomName);
    if (context) {
      socket.on("WORDS", (words, callback) => {
        callback(sendWords(roomName, words, io));
        socket.disconnect();
      });
      callback(context);
    } else callback(false);
  });
};

const sendWords = (roomName, words, io) => {
  const ownerID = getOwnerID(roomName);
  if (ownerID) {
    io.to(ownerID).emit("WORDS", words);
    return true;
  } else {
    return false;
  }
};
