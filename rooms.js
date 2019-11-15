const rooms = new Map();

class Room {
  constructor(ownerID) {
    this.ownerID = ownerID;
    this.clients = new Set();
  }

  addClient(id) {
    this.clients.add(id);
  }

  removeClient(id) {
    this.clients.delete(id);
  }

  isClient(id) {
    this.clients.has(id);
  }
}

const createRoom = (roomName, ownderID) => {
  if (rooms.has(roomName)) return false;
  else {
    rooms.set(roomName, new Room(ownderID));
    return true;
  }
};

const removeRoom = roomName => {
  rooms.delete(roomName);
};

const joinRoom = (roomName, id) => {
  if (rooms.has(roomName)) {
    rooms.get(roomName).addClient(id);
    return true;
  } else return false;
};

const quit = (roomName, id) => {
  if (rooms.has(roomName)) rooms.get(roomName).removeClient(id);
};

const getOwnerID = (roomName, id) => {
  const room = rooms.get(roomName);
  if (room) {
    if (!room.isClient(id)) return null;
    else {
      return room.ownerID;
    }
  } else {
    return null;
  }
};

module.exports = { createRoom, removeRoom, joinRoom, quit, getOwnerID };
