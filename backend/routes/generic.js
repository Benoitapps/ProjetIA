const { Router } = require("express");
const authMiddleware = require('../middleware/authMiddleware');


module.exports = function (Controller, options = {}) {
  const router = new Router();
  
  router.patch("/:id",authMiddleware, Controller.update);
  router.delete("/:id",authMiddleware, Controller.delete);

  return router;
};
