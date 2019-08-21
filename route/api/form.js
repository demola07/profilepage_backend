const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const formData = require("../../models/form");

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("message", "Message is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const [msg] = errors.array();
      return res.json({
        status: false,
        error: msg.msg
      });
    }

    const { name, email, date, message } = req.body;
    try {
      let user = new formData({
        name,
        email,
        message,
        date
      });
      await user.save();
      res.json({
        status: true,
        value: user
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("server error");
    }
  }
);

module.exports = router;
