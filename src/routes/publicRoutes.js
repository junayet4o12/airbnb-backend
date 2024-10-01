const express = require("express");

const router = express.Router();
const propertyController  = require('../controllers/propertyControllers')
// Route to get all properties
router.get('/properties', propertyController.getAllProperties);

// Route to create a new property
router.post('/properties', propertyController.createProperty);

// Route to get a property by ID
router.get('/properties/:id', propertyController.getPropertyById);

// Route to update a property by ID
router.put('/properties/:id', propertyController.updateProperty);

// Route to delete a property by ID
router.delete('/properties/:id', propertyController.deleteProperty);

module.exports = router;