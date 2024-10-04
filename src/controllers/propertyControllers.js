const Property = require("../models/propertyModel");

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find(); // Fetch all properties
    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create a new property
const createProperty = async (req, res) => {
  try {
    const newProperty = await Property.create(req.body); // Create a new property
    res.status(201).json({
      success: true,
      data: newProperty
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    });
  }
};
const filterProperty = async (req, res) => {
  try {
    const { location, checkIn, checkout, category, adults, children, infants, pets } = req.body;


    const query = {};


    if (location && location.trim() !== '') {
      query.region = location;
    }

    if (category && category.trim() !== '' && category !== 'Icons') {
      query.category = category;
    }

    if (adults || children || infants || pets) {
      if (adults) query['acceptableGuestAmount.adults'] = { $gte: adults };
      if (children) query['acceptableGuestAmount.children'] = { $gte: children };
      if (infants) query['acceptableGuestAmount.infants'] = { $gte: infants };
      if (pets) query['acceptableGuestAmount.pets'] = { $gte: pets };
    }


    let properties = await Property.find(query);

    if (checkIn) {
      properties = properties.filter(property => {
        const propertyStartDate = property.dates.startDate;
        return new Date(checkIn).getTime() <= propertyStartDate;
      });
    }

    if (checkout) {
      properties = properties.filter(property => {
        const propertyEndDate = property.dates.endDate;
        return new Date(checkout).getTime() >= propertyEndDate;
      });
    }
    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    });
  }
};



// Get a single property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id); // Fetch property by ID

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Update a property by ID
const updateProperty = async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updatedProperty
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message
    });
  }
};

// Delete a property by ID
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  getAllProperties,
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
  filterProperty
};
