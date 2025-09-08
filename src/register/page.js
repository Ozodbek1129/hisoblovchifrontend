import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../store/usersApi";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function Register() {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [formData, setFormData] = useState({
    first_name: "",
    second_name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null); // ❗ Backend xatoni saqlash

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Har safar tozalab turamiz
    try {
      const res = await registerUser(formData).unwrap();
      if (res.token) {
        localStorage.setItem("token", res.token);
      }
      navigate("/");
    } catch (error) {
      console.error("Register error:", error);

      // ❗ Backenddan kelgan xatoni aniqlab ko‘rsatamiz
      const backendMessage =
        Array.isArray(error?.data?.message)
          ? error.data.message[0]
          : error?.data?.message || error?.error || error?.message || "Xatolik yuz berdi!";

      setErrorMessage(backendMessage);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Ro‘yxatdan o‘tish
        </Typography>

        {/* ❗ Backend xatoni ko‘rsatish */}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Ism"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Familiya"
            name="second_name"
            value={formData.second_name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Parol"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Ro‘yxatdan o‘tish"
            )}
          </Button>
        </form>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, cursor: "pointer", color: "blue" }}
          onClick={() => navigate("/login")}
        >
          Akkauntingiz bormi? Login
        </Typography>
      </Paper>
    </Box>
  );
}
