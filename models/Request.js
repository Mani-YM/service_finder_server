const mongoose = require("mongoose")

const requestSchema = mongoose.Schema(
  {
    requestInfo: {
      type: String,
      required: [true, "Please add request information"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    address: {
      line1: {
        type: String,
        required: [true, "Please add address line 1"],
      },
      line2: {
        type: String,
      },
      city: {
        type: String,
        required: [true, "Please add a city"],
      },
      state: {
        type: String,
        required: [true, "Please add a state"],
      },
      zipCode: {
        type: String,
        required: [true, "Please add a zip code"],
      },
    },
    contact: {
      email: {
        type: String,
        required: [true, "Please add an email"],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"],
      },
      mobile: {
        type: String,
        required: [true, "Please add a mobile number"],
      },
    },
    preferredDate: {
      type: Date,
      required: [true, "Please add a preferred date"],
    },
    status: {
      type: String,
      enum: ["pending", "assigned", "completed"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Technician",
    },
    assignmentDate: {
      type: Date,
    },
    completionDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

const Request = mongoose.model("Request", requestSchema)

module.exports = Request

