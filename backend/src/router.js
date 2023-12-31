const express = require("express")
const { hashPassword, verifyPassword, verifyToken } = require("./auth.js")
const multer = require("multer")

const upload = multer({ dest: "public/assets/tmp" })

const router = express.Router()

const UsersControllers = require("./controllers/UsersControllers")
const TestimonialsControllers = require("./controllers/TestimonialsControllers")
const TopicsControllers = require("./controllers/TopicsControllers")
const TopicsSubscriptionControllers = require("./controllers/TopicsSubscriptionControllers")
const CategoriesControllers = require("./controllers/CategoriesControllers")
const GmProfilControllers = require("./controllers/GmProfilControllers")
const GamesControllers = require("./controllers/GamesControllers")
const GameRegistrationsControllers = require("./controllers/GameRegistrationsControllers")
const PostsControllers = require("./controllers/PostsControllers")
const FiltersControllers = require("./controllers/FiltersControllers")
const FriendRequestControllers = require("./controllers/FriendRequestControllers")
const UsersFiltersControllers = require("./controllers/UsersFiltersControllers")
const RolePlayingGamesControllers = require("./controllers/RolePlayingGamesController")
const PrivateMessagesControllers = require("./controllers/PrivateMessagesControllers")

router.post("/login", UsersControllers.verifyUser, verifyPassword)
router.post("/users", hashPassword, UsersControllers.add)
router.get("/testimonials", TestimonialsControllers.browse)
router.get("/testimonials/:id", TestimonialsControllers.read)

router.use(verifyToken)

router.put(
  "/users/:id/upload",
  upload.single("myFile"),
  UsersControllers.updateProfilPicture
)

router.get("/users/:id", UsersControllers.read)
router.put("/users/:id", hashPassword, UsersControllers.edit)

router.get("/users", UsersControllers.browse)
router.delete("/users/:id", UsersControllers.destroy)

router.get("/games", GamesControllers.browse)
router.get("/games/:id", GamesControllers.read)
router.put("/games/:id", GamesControllers.edit)
router.post("/games", GamesControllers.add)

router.get(
  "/usernameGMFutureGames",
  GameRegistrationsControllers.futureGamesGMUsername
)
router.get("/gamesRegistrations", GameRegistrationsControllers.browse)
router.get("/gamesRegistrations/:id", GameRegistrationsControllers.read)
router.put("/gamesRegistrations/:id", GameRegistrationsControllers.edit)
router.post("/gamesRegistrations", GameRegistrationsControllers.add)

router.put("/testimonials/:id", TestimonialsControllers.edit)
router.post("/testimonials", TestimonialsControllers.add)
router.delete("/testimonials/:id", TestimonialsControllers.destroy)

router.get("/topics", TopicsControllers.browse)
router.get("/topics/:id", TopicsControllers.read)
router.put("/topics/:id", TopicsControllers.edit)
router.post("/topics", TopicsControllers.add)

router.get("/topics_subscription", TopicsSubscriptionControllers.browse)
router.get("/topics_subscription/:id", TopicsSubscriptionControllers.read)
router.put("/topics_subscription/:id", TopicsSubscriptionControllers.edit)
router.post("/topics_subscription", TopicsSubscriptionControllers.add)

router.get("/categories", CategoriesControllers.browse)
router.get("/categories/:id", CategoriesControllers.read)
router.put("/categories/:id", CategoriesControllers.edit)
router.post("/categories", CategoriesControllers.add)

router.get("/gmprofil", GmProfilControllers.browse)
router.get("/gmprofil/:id", GmProfilControllers.read)
router.get("/gmprofil/:id", GmProfilControllers.edit)
router.get("/gmprofil", GmProfilControllers.add)

router.get("/posts", PostsControllers.browse)
router.get("/posts/:id", PostsControllers.read)
router.put("/posts/:id", PostsControllers.edit)
router.post("/posts", PostsControllers.add)

router.get("/filters", FiltersControllers.browse)
router.get("/filters/:id", FiltersControllers.read)
router.put("/filters/:id", FiltersControllers.edit)
router.post("/filters", FiltersControllers.add)

router.get("/FriendRequestControllers", FriendRequestControllers.browse)
router.get("/FriendRequestControllers/:id", FriendRequestControllers.read)
router.put("/FriendRequestControllers/:id", FriendRequestControllers.edit)
router.post("/FriendRequestControllers", FriendRequestControllers.add)

router.get("/UsersFiltersControllers", UsersFiltersControllers.browse)
router.get("/UsersFiltersControllers/:id", UsersFiltersControllers.read)
router.put("/UsersFiltersControllers/:id", UsersFiltersControllers.edit)
router.post("/UsersFiltersControllers", UsersFiltersControllers.add)

router.get("/role-playing-games", RolePlayingGamesControllers.browse)
router.get("/role-playing-games/:id", RolePlayingGamesControllers.read)
router.put("/role-playing-games/:id", RolePlayingGamesControllers.edit)
router.post("/role-playing-games", RolePlayingGamesControllers.add)

router.get("/PrivateMessages", PrivateMessagesControllers.browse)
router.get("/PrivateMessages/:id", PrivateMessagesControllers.read)
router.put("/PrivateMessages/:id", PrivateMessagesControllers.edit)
router.post("/PrivateMessages", PrivateMessagesControllers.add)

router.delete("/gmprofil/:id", GmProfilControllers.destroy)
router.delete("/categories/:id", CategoriesControllers.destroy)
router.delete("/topics_subscription/:id", TopicsSubscriptionControllers.destroy)
router.delete("/topics/:id", TopicsControllers.destroy)
router.delete("/games/:id", GamesControllers.destroy)
router.delete("/filters/:id", FiltersControllers.destroy)
router.delete("/gamesRegistrations/:id", GameRegistrationsControllers.destroy)
router.delete("/posts/:id", PostsControllers.destroy)
router.delete("/FriendRequestControllers/:id", FriendRequestControllers.destroy)
router.delete("/UsersFiltersControllers/:id", UsersFiltersControllers.destroy)
router.delete("/role-playing-games/:id", RolePlayingGamesControllers.destroy)
router.delete("/PrivateMessages/:id", PrivateMessagesControllers.destroy)

module.exports = router
