const jwt = require("jsonwebtoken");

module.exports = function Controller(Service, options = {}) {
  return {
    update: async (req, res, next) => {
      const { id } = req.params;
      const { body } = req;

      const token = req.cookies.token;
      if (!token) return res.status(401).json({ error: "Unauthorized" });
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const userId = decodedToken.userId;

      if (parseInt(id) !== userId) return res.status(401).json({ error: "Unauthorized" });

      try {
        const [result] = await Service.update({ id: parseInt(id, 10) }, body);
        if (result) res.json(result);
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    },
    delete: async (req, res, next) => {
      const { id } = req.params;
      try {
        const nbDeleted = await Service.delete({ id: parseInt(id, 10) });
        if (nbDeleted) res.sendStatus(204);
        else res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    },
  };
};
