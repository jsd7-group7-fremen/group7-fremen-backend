const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({
    message: "resource not found in this server",
  });
};

export default notFoundMiddleware;
