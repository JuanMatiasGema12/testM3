import moment from "moment";

export const validateLoginForm = (input) => {
  const errors = {};

  if (!input.userName.trim()) {
    errors.userName = "The username is required";
  } else if (!/^[a-zA-Z0-9]+$/.test(input.userName)) {
    errors.userName = "Username can't contain special characters";
  }

  if (!input.password.trim()) {
    errors.password = "The password is required";
  } else if (input.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!/[A-Z]/.test(input.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(input.password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(input.password)) {
    errors.password = "Password must contain at least one special character";
  }

  return errors;
};

export const validateRegisterForm = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "El nombre es requerido";
  } else if (values.name.length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres";
  }

  if (!values.email) {
    errors.email = "El correo es requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Correo inválido";
  }

  if (!values.birthdate) {
    errors.birthdate = "La fecha de nacimiento es requerida";
  }

  if (!values.nDni) {
    errors.nDni = "El número de DNI es requerido";
  } else if (!/^\d{7,9}$/.test(values.nDni)) {
    errors.nDni = "El DNI debe tener entre 7 y 9 dígitos";
  }

  if (!values.username) {
    errors.username = "El nombre de usuario es requerido";
  } else if (values.username.length < 5) {
    errors.username = "El nombre de usuario debe tener al menos 5 caracteres";
  }

  if (!values.password) {
    errors.password = "La contraseña es requerida";
  } else if (
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/i.test(values.password)
  ) {
    errors.password =
      "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un caracter especial";
  }

  return errors;
};

export const validateAppointmentForm = (values) => {
  const errors = {};

  const selectedDate = moment(values.date);
  const selectedTime = values.time;

  if (!values.date) {
    errors.date = "La fecha es obligatoria";
  } else if (!selectedDate.isValid()) {
    errors.date = "La fecha seleccionada no es válida";
  }

  if (!values.time) {
    errors.time = "La hora es obligatoria";
  } else {
    const [hours, minutes] = selectedTime.split(":");
    const selectedDateTime = moment(values.date).set({
      hour: hours,
      minute: minutes,
    });

    const startOfDay = moment(values.date).set({ hour: 8, minute: 0 });
    const endOfDay = moment(values.date).set({ hour: 18, minute: 0 });

    if (
      selectedDateTime.isBefore(startOfDay) ||
      selectedDateTime.isAfter(endOfDay)
    ) {
      errors.time = "La hora debe estar entre las 08:00 y las 17:59";
    }
  }

  const dayOfWeek = selectedDate.day();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    errors.date = "No puedes pedir turno los fines de semana";
  }

  const now = moment();
  const selectedDateTime = moment(values.date).set({
    hour: values.time.split(":")[0],
    minute: values.time.split(":")[1],
  });

  if (selectedDateTime.diff(now, "hours") < 24) {
    errors.date = "Deben pasar al menos 24 horas para poder agendar un turno.";
  }

  return errors;
};
