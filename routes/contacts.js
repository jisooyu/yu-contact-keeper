const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post(
  '/',
  auth,
  check('name', 'Name is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Mead 는 이런식으로 처리
      const newContact = new Contact({
        ...req.body,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.status(201).json(contact);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   Put api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
  // Mead의 complete node 강의 방식을 따름
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'phone', 'type'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    // Mead 는 이런식으로 처리
    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    updates.forEach((update) => (contact[update] = req.body[update]));
    await contact.save();
    res.send(contact);

    res.json(contact);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/contacts/:id
// @desc    delete contact
// @access  Private
router.delete(
  '/:id',
  auth,
  check('name', 'Name is required').not().isEmpty(),
  async (req, res) => {
    try {
      const contact = await Contact.findByIdAndDelete({
        _id: req.params.id,
        user: req.user.id,
      });
      if (!contact) {
        res.status(404).send();
      }
      res.send(contact);
    } catch (error) {
      res.status(500).send();
    }
  }
);

module.exports = router;
