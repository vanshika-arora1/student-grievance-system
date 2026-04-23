const router = require('express').Router();
const Grievance = require('../models/Grievance');
const auth = require('../middleware/auth');

// CREATE
router.post('/', auth, async (req, res) => {
  const grievance = new Grievance({ ...req.body, userId: req.user });
  await grievance.save();
  res.json(grievance);
});

// GET ALL
router.get('/', auth, async (req, res) => {
  const data = await Grievance.find({ userId: req.user });
  res.json(data);
});

// GET BY ID
router.get('/:id', auth, async (req, res) => {
  const data = await Grievance.findById(req.params.id);
  res.json(data);
});

// UPDATE
router.put('/:id', auth, async (req, res) => {
  const updated = await Grievance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// SEARCH
router.get('/search/:title', auth, async (req, res) => {
  const result = await Grievance.find({
    title: { $regex: req.params.title, $options: "i" }
  });
  res.json(result);
});

module.exports = router;