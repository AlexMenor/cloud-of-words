const {
  createRoom,
  removeRoom,
  joinRoom,
  quit,
  getOwnerID
} = require("./rooms");

module.exports.onConnection = (socket, io) => {
  const { id } = socket;

  socket.on("CREATE_ROOM", (data, callback) => {
    const { roomName } = data;
    if (createRoom(roomName, id)) {
      socket.on("disconect", () => {
        removeRoom(roomName);
      });
      callback(true);
    } else callback(false);
  });

  socket.on("JOIN_ROOM", (data, callback) => {
    const { roomName } = data;
    if (joinRoom(roomName, id)) {
      socket.on("WORDS", (data, callback) => {
        const { words } = data;
        callback(sendWords(roomName, id, words, io));
        quit(roomName, id);
      });
      socket.on("disconnect", () => {
        quit(roomName, id);
      });
      callback(true);
    } else callback(false);
  });
};

const sendWords = (roomName, id, words, io) => {
  const ownerID = getOwnerID(roomName, id);
  if (ownerID) {
    io.to(ownerID).emit("WORDS", words);
    return true;
  } else {
    return false;
  }
};
