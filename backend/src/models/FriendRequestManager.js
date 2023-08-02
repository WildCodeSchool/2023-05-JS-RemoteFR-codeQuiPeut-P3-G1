const AbstractManager = require("./AbstractManager")

class FriendRequestManager extends AbstractManager {
  constructor() {
    super({ table: "FriendRequest" })
  }

  insert(friendRequests) {
    return this.database.query(
      `insert into ${this.table} (users_id_requester, users_id_recipient, status, date) values ("?", "?", "?", "?", NOW())`,
      [
        friendRequests.users_id_requester,
        friendRequests.users_id_recipient,
        friendRequests.status,
        friendRequests.date,
      ]
    )
  }

  update(friendRequests) {
    return this.database.query(
      `update ${this.table} set users_id_requester = ?, users_id_recipient = ? status = ?, date = ? WHERE id = ? `,
      [
        friendRequests.users_id_requester,
        friendRequests.users_id_recipient,
        friendRequests.status,
        friendRequests.date,
      ]
    )
  }
}

module.exports = FriendRequestManager
