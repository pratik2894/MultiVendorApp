const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Shop = require('../model/shop');

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return next(new ErrorHandler('Please login to continue.', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const authHeader = req.headers.authorization;
 
  if (!authHeader) {
    return next(new ErrorHandler('Authorization header is missing.', 401));
  }

  const tokenParts = authHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return next(new ErrorHandler('Invalid authorization header format.', 401));
  }

  const seller_token = tokenParts[1];

  try {
    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
    req.seller = await Shop.findById(decoded.id);
    
    next();
  } catch (err) {
    return next(new ErrorHandler('Invalid or expired token.', 401));
  }
});

exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} can not access this resources!`),
      );
    }
    next();
  };
};
