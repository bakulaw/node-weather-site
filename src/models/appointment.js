const mongoose = require('mongoose');
const validator = require('validator');
const appointmentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  birthdate: {
    type: Date,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    require: true,
  },
  sex: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
    trim: true,
  },
  doAppointment: {
    type: Date,
    required: true,
    trim: true,
  },
  soAppointment: {
    type: String,
    trim: true,
    default: 'approved',
  },
});

appointmentSchema.statics.isDuplicate = async (req) => {
  const filter = {
    lastname: req.body.appointment.lname,
    firstname: req.body.appointment.fname,
    birthdate: req.body.appointment.bdate,
    soAppointment: 'active',
  };
  // const duplicate = await Appointment.countDocuments(filter);
  const appointment = await Appointment.find(filter);

  //return { appointment, duplicate };
  return appointment;
};

appointmentSchema.statics.getCount = async (doAppointment) => {
  const appointments = await Appointment.countDocuments({ doAppointment });
  return appointments;
};

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
