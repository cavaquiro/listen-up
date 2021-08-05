function notFoundHandler(req, res) {
  res.status(404).json({code: 404, error: 'Not Found', message: 'No Found'});
}

module.exports = notFoundHandler;