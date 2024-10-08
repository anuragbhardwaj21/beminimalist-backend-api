module.exports = {
  success(res, data, code, message, token, extra) {
    res.status(code).json({
      data: data,
      meta: {
        code: code,
        token: token,
        message: message,
      },
      extra,
    });
  },
  error(res, code, message) {
    res.status(code).json({
      error: {
        code: code,
        message: message,
      },
    });
  },
  validationError(res, code, message) {
    res.status(code).json({
      error: {
        code: code,
        message: message,
      },
    });
  },
};
