const express = require('express');
const Appointment = require('../models/appointment');
const router = new express.Router();

router.get('/appointment', (req, res) => {
  res.render('appointment', {
    title: 'Appointment',
  });
});

router.post('/appointment/check', async (req, res) => {
  doAppointment = req.body.appointment.doa;
  const daycount = await Appointment.getCount(doAppointment);
  res.status(201).json({ daycount: daycount });
});

router.post('/appointment/checknames', async (req, res) => {
  //console.log(appointment[0].doAppointment);

  try {
    const appointment = await Appointment.isDuplicate(req);
    res.status(201).json({ doa: appointment[0].doAppointment });
  } catch (err) {
    res.status(201).json({ doa: 'valid' });
  }
});

router.post('/appointment/save', async (req, res) => {
  const appointment = new Appointment(req.body.appointment);

  try {
    await appointment.save();
    res.status(201).send({ appointment });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
