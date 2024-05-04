// create token and saving that in cookies
const sendShopToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  res.status(statusCode).json({
    sucess: true,
  });

  res.status(statusCode).cookie('seller_token', token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendShopToken;
