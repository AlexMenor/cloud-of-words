const rooms = new Map();

class Room {
  constructor(ownerID, roomContext) {
    this.ownerID = ownerID;
    this.roomContext = roomContext;
  }
}

const createRoom = (roomName, ownderID, roomContext) => {
  if (rooms.has(roomName)) return false;
  else {
    rooms.set(roomName, new Room(ownderID, roomContext));
    return true;
  }
};

const removeRoom = roomName => {
  rooms.delete(roomName);
};

const getContext = roomName => {
  if (rooms.has(roomName)) return rooms.get(roomName).roomContext;
  else return false;
};

const getOwnerID = roomName => {
  const room = rooms.get(roomName);
  if (room) return room.ownerID;
  else return null;
};

module.exports = { createRoom, removeRoom, getContext, getOwnerID };
