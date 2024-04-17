// middlewares.js
const isAuthenticated = (req, res, next) => {
  const isLoggedIn = req.cookies && req.cookies.isLoggedIn === 'true';

  if (isLoggedIn) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { isAuthenticated };
