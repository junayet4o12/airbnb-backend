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

const filterProperty = async (req, res) => {
  try {
    const { location, checkIn, checkout, category, adults, children, infants, pets, price, type, roomsAndBeds, amenities } = req.body;
    const { room, bed, bathroom } = roomsAndBeds;
    const { wifi, kitchen, washer } = amenities;
    let { min = 0, max = 550 } = price;
    min = min === null ? 0 : min;
    max = max === null ? 550 : max;
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
    query['roomsAndBeds.rooms'] = { $gte: room };
    query['roomsAndBeds.beds'] = { $gte: bed };
    query['roomsAndBeds.bathrooms'] = { $gte: bathroom };

    if (wifi || kitchen || washer) {
      if (wifi) query['amenities.wifi'] = true;
      if (kitchen) query['amenities.kitchen'] = true;
      if (washer) query['amenities.washer'] = true;

    }
    if (type && type !== 'anyType') {
      query.typeOfPlace = type;
    }
    query.pricePerNight = { $gte: min, $lte: max };
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

module.exports = {
  getAllProperties,
  filterProperty,
};
