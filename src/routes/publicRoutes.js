const express = require("express");
const propertyController = require('../controllers/propertyControllers');
const Property = require("../models/propertyModel");
const router = express.Router();
// const propertyController = require('../controllers/propertyControllers');
// Route to get all properties
router.get('/properties', async (req, res) => {
    const properties = await Property.find();
    res.send(properties)
  });
router.get('/hello', async (req, res) => {
    res.send({ hmm: 'hello' })
});

router.post('/properties/filter', propertyController.filterProperty);

module.exports = router;