const express = require("express")

const router = express.Router()

const UsersControllers = require("./controllers/UsersControllers")
const TestimonialsControllers = require("./controllers/TestimonialsControllers")
const TopicsControllers = require("./controllers/TopicsControllers")
const TopicsSubscriptionControllers = require("./controllers/Topics_SubscriptionControllers")
const CategoriesControllers = require("./controllers/CategoriesControllers")
const GmProfilControllers = require("./controllers/GmProfilControllers")
const GamesControllers = require("./controllers/GamesController")
const GamesRegistrationsControllers = require("./controllers/GamesRegistrationsControllers")
const PostsControllers = require("./controllers/PostsControllers")
const FiltersControllers = require("./controllers/FiltersControllers")
const FriendRequestControllers = require("./controllers/FriendRequestControllers")
const UsersFiltersControllers = require("./controllers/UsersFiltersControllers")
const RolePlayingGamesControllers = require("./controllers/RolePlayingGamesController")

router.get("/users", UsersControllers.browse)
router.get("/users/:id", UsersControllers.read)
router.put("/users/:id", UsersControllers.edit)
router.post("/users", UsersControllers.add)
router.delete("/users/:id", UsersControllers.destroy)

router.get("/games", GamesControllers.browse)
router.get("/games/:id", GamesControllers.read)
router.put("/games/:id", GamesControllers.edit)
router.post("/games", GamesControllers.add)
router.delete("/games/:id", GamesControllers.destroy)

router.get("/gamesRegistrations", GamesRegistrationsControllers.browse)
router.get("/gamesRegistrations/:id", GamesRegistrationsControllers.read)
router.put("/gamesRegistrations/:id", GamesRegistrationsControllers.edit)
router.post("/gamesRegistrations", GamesRegistrationsControllers.add)
router.delete("/gamesRegistrations/:id", GamesRegistrationsControllers.destroy)

router.get("/testimonials", TestimonialsControllers.browse)
router.get("/testimonials/:id", TestimonialsControllers.read)
router.put("/testimonials/:id", TestimonialsControllers.edit)
router.post("/testimonials", TestimonialsControllers.add)
router.delete("/testimonials/:id", TestimonialsControllers.destroy)

router.get("/topics", TopicsControllers.browse)
router.get("/topics/:id", TopicsControllers.read)
router.put("/topics/:id", TopicsControllers.edit)
router.post("/topics", TopicsControllers.add)
router.delete("/topics/:id", TopicsControllers.destroy)

router.get("/topics_subscription", TopicsSubscriptionControllers.browse)
router.get("/topics_subscription/:id", TopicsSubscriptionControllers.read)
router.put("/topics_subscription/:id", TopicsSubscriptionControllers.edit)
router.post("/topics_subscription", TopicsSubscriptionControllers.add)
router.delete("/topics_subscription/:id", TopicsSubscriptionControllers.destroy)

router.get("/categories", CategoriesControllers.browse)
router.get("/categories/:id", CategoriesControllers.read)
router.put("/categories/:id", CategoriesControllers.edit)
router.post("/categories", CategoriesControllers.add)
router.delete("/categories/:id", CategoriesControllers.destroy)

router.get("/gmprofil", GmProfilControllers.browse)
router.get("/gmprofil/:id", GmProfilControllers.read)
router.get("/gmprofil/:id", GmProfilControllers.edit)
router.get("/gmprofil", GmProfilControllers.add)
router.get("/gmprofil/:id", GmProfilControllers.destroy)

router.get("/posts", PostsControllers.browse)
router.get("/posts/:id", PostsControllers.read)
router.put("/posts/:id", PostsControllers.edit)
router.post("/posts", PostsControllers.add)
router.delete("/posts/:id", PostsControllers.destroy)

router.get("/filters", FiltersControllers.browse)
router.get("/filters/:id", FiltersControllers.read)
router.put("/filters/:id", FiltersControllers.edit)
router.post("/filters", FiltersControllers.add)
router.delete("/filters/:id", FiltersControllers.destroy)

router.get("/FriendRequestControllers", FriendRequestControllers.browse)
router.get("/FriendRequestControllers/:id", FriendRequestControllers.read)
router.put("/FriendRequestControllers/:id", FriendRequestControllers.edit)
router.post("/FriendRequestControllers", FriendRequestControllers.add)
router.delete("/FriendRequestControllers/:id", FriendRequestControllers.destroy)

router.get("/UsersFiltersControllers", UsersFiltersControllers.browse)
router.get("/UsersFiltersControllers/:id", UsersFiltersControllers.read)
router.put("/UsersFiltersControllers/:id", UsersFiltersControllers.edit)
router.post("/UsersFiltersControllers", UsersFiltersControllers.add)
router.delete("/UsersFiltersControllers/:id", UsersFiltersControllers.destroy)

router.get("/role-playing-games", RolePlayingGamesControllers.browse)
router.get("/role-playing-games/:id", RolePlayingGamesControllers.read)
router.put("/role-playing-games/:id", RolePlayingGamesControllers.edit)
router.post("/role-playing-games", RolePlayingGamesControllers.add)
router.delete("/role-playing-games/:id", RolePlayingGamesControllers.destroy)

module.exports = router
