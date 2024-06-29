const Data = require('../models/Data');

exports.getData = async (req, res) => {
  try {
    const data = await Data.findAll();
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateData = async (req, res) => {
  const { id, actionType, actionName } = req.body;

  try {
    const data = await Data.findByPk(id);
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }

    data.actionType = actionType;
    data.actionName = actionName;
    data.editedBy = req.user.username;
    data.editedWhen = new Date();

    await data.save();

    res.json({ message: 'Data updated', data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
