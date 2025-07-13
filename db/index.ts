import memory from "./memory.db";
import message from "./message.db";
import user from "./user.db";

// Main DB ops object
const db = {
  user,
  message,
  memory,
};

export default db;
