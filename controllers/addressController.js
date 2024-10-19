const User = require("../models/User");
const Address = require("../models/Address");
const Constants = require("../utils/Constants");
const Response = require("../utils/Response");

module.exports = {
  getAddress: async (req, res) => {
    try {
      const { userId } = req.userData;
      const addresses = await Address.find({ userId });
      return Response.success(
        res,
        addresses,
        Constants.SUCCESS,
        "Address Fetched Successfully."
      );
    } catch (error) {
      return Response.error(res, Constants.FAIL, error.message);
    }
  },

  postAddress: async (req, res) => {
    try {
      const { userId } = req.userData;
      
      const { title, addline1, addline2, city, pinCode, state, phoneNumber } =
        req.body.address;

      const newAddress = new Address({
        userId,
        title,
        addline1,
        addline2,
        city,
        pinCode,
        state,
        phoneNumber,
      });

      await newAddress.save();

      const addresses = await Address.find({ userId });

      return Response.success(
        res,
        addresses,
        Constants.SUCCESS,
        "Address Saved Successfully."
      );
    } catch (error) {
      return Response.error(res, Constants.FAIL, error.message);
    }
  },
};
