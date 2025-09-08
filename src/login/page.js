import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../store/usersApi";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null); // ❗ Xatoni saqlash

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // ❗ Avvalgi xatoni tozalash
    try {
      const res = await loginUser(formData).unwrap();
      if (res.token) {
        localStorage.setItem("token", res.token);
        navigate("/"); // login bo‘lgandan keyin Home ga o‘tadi
      }
    } catch (error) {
      console.error("Login error:", error);

      // ❗ Backend xabarini chiqarish
      const backendMessage =
        Array.isArray(error?.data?.message)
          ? error.data.message[0]
          : error?.data?.message || error?.error || error?.message || "Email yoki parol xato!";

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
          Tizimga kirish
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
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Kirish"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
