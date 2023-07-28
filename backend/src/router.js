const express = require("express")

const router = express.Router()

const UsersControllers = require("./controllers/UsersControllers")
const TestimonialsControllers = require("./controllers/TestimonialsControllers")

router.get("/users", UsersControllers.browse)
router.get("/users/:id", UsersControllers.read)
router.put("/users/:id", UsersControllers.edit)
router.post("/users", UsersControllers.add)
router.delete("/users/:id", UsersControllers.destroy)

router.get("/testimonials", TestimonialsControllers.browse)
router.get("/testimonials/:id", TestimonialsControllers.read)
router.put("/testimonials/:id", TestimonialsControllers.edit)
router.post("/testimonials", TestimonialsControllers.add)
router.delete("/testimonials/:id", TestimonialsControllers.destroy)

module.exports = router
