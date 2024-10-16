import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const localStorageUserId = localStorage.getItem("userId");

export const loginUser = createAsyncThunk(
  "user/login",
  async (userLoginData, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/users/login",
        userLoginData
      );
      dispatch(setUser(data.data.loginUser));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAppointments = createAsyncThunk(
  "appointment/getAppointment",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/users/${userId}`);
      dispatch(setUserAppointments(data.data.appointments));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  "appointment/cancelAppointment",
  async (appointmentId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/appointments/cancel/${appointmentId}`
      );
      dispatch(cancelUserAppointment(appointmentId));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addAppointment = createAsyncThunk(
  "appointment/addAppointment",
  async (appointmentData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/appointments/schedule`,
        appointmentData
      );
      dispatch(addUserAppointment(response.data.appointment));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const { response } = await axios.post(
        "http://localhost:3000/users/register",
        user
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "userReducer",
  initialState: {
    user: localStorageUserId || null,
    userAppointments: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.id;
      localStorage.setItem("userId", action.payload.id);
    },
    setUserAppointments: (state, action) => {
      state.userAppointments = action.payload;
    },
    cancelUserAppointment: (state, action) => {
      state.userAppointments = state.userAppointments.map((appointment) => {
        if (appointment.id === action.payload) {
          return { ...appointment, status: "cancelled" };
        }
        return appointment;
      });
    },
    addUserAppointment: (state, action) => {
      state.userAppointments = [...state.userAppointments, action.payload];
    },
    logoutUser: (state) => {
      state.user = null;
      state.userAppointments = [];
      localStorage.removeItem("userId");
    },
  },
});

export const {
  setUser,
  setUserAppointments,
  cancelUserAppointment,
  addUserAppointment,
  logoutUser,
} = userSlice.actions;
export default userSlice.reducer;
