export default (res, message) => (err) =>
  res.status(500).json({ message, err })