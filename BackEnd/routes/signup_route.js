const router = require('express').Router();
const { User, validateUser } = require('../models/user_model');
const { hashPassword } = require('../utils/hash')
const auth = require('../middleware/auth')

//Sign up
router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    //Ensure username is unique
    const isUnique = (await User.countDocuments({ username: req.body.username })) === 0;
    if (!isUnique) {
      return res.status(400).json({ error: 'The username or password is not valid' });
    }

    //Make a new user then save to the db
    const user = new User(req.body);
    user.password = await hashPassword(user.password);
    await user.save();

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Get current user details
router.get('/', auth, async (req, res) => {
  try {
    res.send({ currentUser: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;