const Avatar = require("../models/Avatar");
const User = require("../models/User");
const Response = require("../utils/Response");
const Constants = require("../utils/Constants");

module.exports = {
  postAvatar: async (req, res) => {
    try {
      const { userId } = req.userData;
      const {
        shape,
        sex,
        faceColor,
        earSize,
        hairColor,
        hairStyle,
        hairColorRandom,
        hatColor,
        hatStyle,
        eyeStyle,
        glassesStyle,
        noseStyle,
        mouthStyle,
        shirtStyle,
        shirtColor,
        bgColor,
        isGradient,
      } = req.body;

      const avatar = await Avatar.findOneAndUpdate(
        { userId },
        {
          shape,
          sex,
          faceColor,
          earSize,
          hairColor,
          hairStyle,
          hairColorRandom,
          hatColor,
          hatStyle,
          eyeStyle,
          glassesStyle,
          noseStyle,
          mouthStyle,
          shirtStyle,
          shirtColor,
          bgColor,
          isGradient,
        },
        { new: true, upsert: true }
      );

      return Response.success(
        res,
        avatar,
        Constants.SUCCESS,
        "Avatar saved successfully."
      );
    } catch (error) {
      return Response.error(res, Constants.FAIL, error.message);
    }
  },

  getAvatar: async (req, res) => {
    try {
      const { userId } = req.userData;

      const avatar = await Avatar.findOne({ userId });

      if (!avatar) {
        return Response.success(
          res,
          {},
          Constants.SUCCESS,
          "Please create your Avatar."
        );
      }

      return Response.success(
        res,
        avatar,
        Constants.SUCCESS,
        "Avatar retrieved successfully."
      );
    } catch (error) {
      return Response.error(res, Constants.FAIL, error.message);
    }
  },
};
