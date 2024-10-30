import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const localStorageUserId = localStorage.getItem("userId");
  const [userId, setUserId] = useState(localStorageUserId || null);
  const [userAppointments, setUserAppointments] = useState([]);

  const loginUser = async (userLoginData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/users/login",
        userLoginData
      );
      setUserId(data.data.loginUser.id);
      localStorage.setItem("userId", data.data.loginUser.id);
      return data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };
  

  const registerUser = async (user) => {
    try {
      const { response } = await axios.post(
        "http://localhost:3000/users/register",
        user
      );
      return response;
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  const getAppointments = async (userId) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/users/${userId}`);
      setUserAppointments(data.data.appointments);
    } catch (error) {
      console.error("Error al obtener citas:", error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:3000/appointments/cancel/${appointmentId}`);
      setUserAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: "cancelled" }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error al cancelar la cita:", error);
    }
  };

  const addAppointment = async (appointmentData) => {
    try {
        const response = await axios.post(`http://localhost:3000/appointments/schedule`, appointmentData);
        setUserAppointments((prevAppointments) => [...prevAppointments, response.data.appointment]);
        return response.data;
    } catch (error) {
        console.error("Error al agendar la cita:", error);
        throw error; 
    }
};


  const logoutUser = () => {
    setUserId(null);
    setUserAppointments([]);
    localStorage.removeItem("userId");
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        userAppointments,
        loginUser,
        registerUser,
        getAppointments,
        cancelAppointment,
        addAppointment,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
