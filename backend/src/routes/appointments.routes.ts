import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRespository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRespository = new AppointmentsRespository();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is alredy booked' });
  }

  const appointment = appointmentsRespository.create(provider, parsedDate);

  return response.json(appointment);
});

export default appointmentsRouter;
