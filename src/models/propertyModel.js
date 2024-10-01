const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  viewType: {
    type: String,
    required: true
  },
  distance: {
    type: String,
    required: true
  },
  dates: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  pricePerNight: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  totalBeforeTaxes: {
    type: Number,
    required: true
  },
  typeOfPlace: {
    type: String,
    required: true
  },
  roomsAndBeds: {
    rooms: {
      type: Number,
      required: true
    },
    beds: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      required: true
    }
  },
  amenities: {
    wifi: {
      type: Boolean,
      required: true
    },
    kitchen: {
      type: Boolean,
      required: true
    },
    washer: {
      type: Boolean,
      required: true
    }
  },
  bookingOptions: {
    instantBook: {
      type: Boolean,
      required: true
    },
    selfCheckIn: {
      type: Boolean,
      required: true
    },
    allowsPets: {
      type: Boolean,
      required: true
    }
  },
  region: {
    type: String,
    required: true
  },
  acceptableGuestAmount: {
    adults: {
      type: Number,
      required: true
    },
    children: {
      type: Number,
      required: true
    },
    infants: {
      type: Number,
      required: true
    },
    pets: {
      type: Number,
      required: true
    }
  }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
