require("dotenv").config()

const mysql = require("mysql2/promise")

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
})

// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  )
})

// declare and fill models: that's where you should register your own managers

const models = {}

const UsersManager = require("./UsersManager")
const TestimonialsManager = require("./TestimonialsManager")
const GamesManager = require("./GamesManager")
const GameRegistrationsManager = require("./GameRegistrationsManager")
const PostsManager = require("./PostsManager")
const TopicsManager = require("./TopicsManager")
const TopicsSubscriptionManager = require("./TopicsSubscriptionManager")
const CategoriesManager = require("./CategoriesManager")
const FriendRequestManager = require("./FriendRequestManager")
const FiltersManager = require("./FiltersManager")
const UsersFiltersManager = require("./UsersFiltersManager")
const PrivateMessagesManager = require("./PrivateMessagesManager")
const RolePlayingGamesManager = require("./RolePlayingGamesManager")
const GamesHasUsersManager = require("./GamesHasUsersManager")
const GameRegistrationsAsPlayerManager = require("./GameRegistrationsAsPlayerManager")

models.users = new UsersManager()
models.users.setDatabase(pool)

models.testimonials = new TestimonialsManager()
models.testimonials.setDatabase(pool)

models.games = new GamesManager()
models.games.setDatabase(pool)

models.gameRegistrationsManager = new GameRegistrationsManager()
models.gameRegistrationsManager.setDatabase(pool)

models.posts = new PostsManager()
models.posts.setDatabase(pool)

models.gamesHasUsersManager = new GamesHasUsersManager()
models.gamesHasUsersManager.setDatabase(pool)

models.FriendRequest = new FriendRequestManager()
models.FriendRequest.setDatabase(pool)

models.topics = new TopicsManager()
models.topics.setDatabase(pool)

models.topics_subscription = new TopicsSubscriptionManager()
models.topics_subscription.setDatabase(pool)

models.categories = new CategoriesManager()
models.categories.setDatabase(pool)

models.filter = new FiltersManager()
models.filter.setDatabase(pool)

models.usersFilters = new UsersFiltersManager()
models.usersFilters.setDatabase(pool)

models.private_messages = new PrivateMessagesManager()
models.private_messages.setDatabase(pool)

models.role_playing_games = new RolePlayingGamesManager()
models.role_playing_games.setDatabase(pool)

models.GameRegistrationsAsPlayer = new GameRegistrationsAsPlayerManager()
models.GameRegistrationsAsPlayer.setDatabase(pool)

// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop]
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1)

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    )
  },
}

module.exports = new Proxy(models, handler)
