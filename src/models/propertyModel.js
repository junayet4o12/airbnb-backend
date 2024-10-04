const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const propertySchema = new Schema({
  location: {
    type: String,
    required: true
  },
  viewType: {
    type: String,
    required: true
  },
  distance: {
    type: String, // If distance is a numeric value, change this to 'Number'
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
    required: true,
    min: 0,
    max: 5
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
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value for rooms'
      }
    },
    beds: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value for beds'
      }
    },
    bathrooms: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value for bathrooms'
      }
    }
  },
  amenities: {
    wifi: {
      type: Boolean,
      default: false
    },
    kitchen: {
      type: Boolean,
      default: false
    },
    washer: {
      type: Boolean,
      default: false
    }
  },
  bookingOptions: {
    instantBook: {
      type: Boolean,
      default: false
    },
    selfCheckIn: {
      type: Boolean,
      default: false
    },
    allowsPets: {
      type: Boolean,
      default: false
    }
  },
  region: {
    type: String,
    required: true
  },
  acceptableGuestAmount: {
    adults: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value for adults'
      }
    },
    children: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value for children'
      }
    },
    infants: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value for infants'
      }
    },
    pets: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value for pets'
      }
    }
  }
});

const Property = model('properties', propertySchema);

module.exports = Property;
