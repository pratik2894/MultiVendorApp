const express = require('express');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Shop = require('../model/shop');
const ErrorHandler = require('../utils/ErrorHandler');
const { isSeller } = require('../middleware/auth');
const CoupounCode = require('../model/coupounCode');
const router = express.Router();

// create coupoun code
router.post(
  '/create-coupon-code',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.seller.id;
      const isCoupounCodeExists = await CoupounCode.find({
        name: req.body.name,
        value: req.body.value,
        
      });

      if (isCoupounCodeExists.length !== 0) {
        return next(new ErrorHandler('Coupoun code already exists!', 400));
      }

      const couponCode = await CoupounCode.create({
        ...req.body,
        shopId: shopId  // Include the shopId in the document to be created
      });
      
      res.status(201).json({
        success: true,
        couponCode,
        
      });
    } catch (error) {
      return res.status(500).json( { success:false, error:error.stack});
    }
  }),
);

// get all coupons of a shop
router.get(
  '/get-coupon/:id',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CoupounCode.find({
        shopId: req.seller.id,
      });
      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }),
);

// delete coupoun code of a shop
router.delete(
  '/delete-coupon/:id',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Coupon code dosen't exists!", 400));
      }
      res.status(201).json({
        success: true,
        message: 'Coupon code deleted successfully!',
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }),
);

// get coupon code value by its name
router.get(
  '/get-coupon-value/:name',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findOne({
        name: req.params.name,
      });

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }),
);

module.exports = router;
