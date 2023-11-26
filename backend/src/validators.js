const Joi = require("joi")

const isValidMessageData = (messageData) => {
  if (typeof messageData !== "object" || messageData === null) {
    return false
  }

  if (
    !messageData.hasOwnProperty("from") ||
    !messageData.hasOwnProperty("to") ||
    !messageData.hasOwnProperty("content")
  ) {
    return false
  }

  if (
    typeof messageData.from !== "number" &&
    typeof messageData.from !== "string"
  ) {
    return false
  }
  if (
    typeof messageData.to !== "number" &&
    typeof messageData.to !== "string"
  ) {
    return false
  }

  if (typeof messageData.content !== "string") {
    return false
  }

  const contentLength = messageData.content.trim().length
  if (contentLength === 0 || contentLength > 1000) {
    return false
  }

  return true
}

const validateSignUpForm = (req, res, next) => {
  const validationResult = SignUpCredentialsFormat(req.body)

  if (validationResult) {
    return res.status(400).json(validationResult)
  }
  next()
}

const SignUpCredentialsFormat = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(6).max(50).required(),
    verifyPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Les mots de passe ne correspondent pas" }),
    location: Joi.string().min(2).max(100).required(),
    email_adress: Joi.string().email().required(),
  }).with("password", "verifyPassword")

  const result = schema.validate(data, { abortEarly: false })

  if (result.error) {
    const errorMessages = result.error.details.map((error) => ({
      message: error.message,
    }))
    console.log(result.error)
    return { errorCount: result.error.details.length, errorMessages }
  }
  return false
}

const validateUserCredentials = (credentials) => {
  const result = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(6).max(50).required(),
  }).validate(credentials, { abortEarly: false })

  if (result.error) {
    const errorMessages = result.error.details.map((error) => ({
      message: error.message,
    }))
    return { errorCount: result.error.details.length, errorMessages }
  }
  return false
}

const validateUser = (req, res, next) => {
  const validationResult = validateUserCredentials(req.body)

  if (validationResult) {
    return res.status(400).json(validationResult)
  }
  next()
}

module.exports = {
  isValidMessageData,
  validateUser,
  validateSignUpForm,
}
