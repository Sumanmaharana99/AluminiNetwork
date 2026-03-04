import { Event } from '../models/Event.js';

// @route   POST /api/events
// @access  Private (alumni + admin)
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, event });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   GET /api/events
// @access  Private
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ isActive: true })
      .populate('createdBy', 'name profilePicture')
      .sort({ date: 1 });
    res.status(200).json({ success: true, events });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   GET /api/events/:id
// @access  Private
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name profilePicture');
    if (!event) return res.status(404).json({ success: false, message: 'Event not found.' });
    res.status(200).json({ success: true, event });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   PUT /api/events/:id
// @access  Private (creator or admin)
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found.' });

    const isOwner = event.createdBy.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, event: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   DELETE /api/events/:id
// @access  Private (creator or admin)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found.' });

    const isOwner = event.createdBy.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    await event.deleteOne();
    res.status(200).json({ success: true, message: 'Event deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};