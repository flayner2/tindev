const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);

    try {
      const targetDev = await Dev.findById(devId);

      loggedDev.dislikes.push(targetDev._id);

      await loggedDev.save();
    } catch {
      return res.status(400).json({ error: "Dev doesn't exist" });
    }

    return res.json(loggedDev);
  }
};
