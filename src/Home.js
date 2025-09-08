import React, { useState, useEffect } from "react";
import {
  useGetMalumotlarQuery,
  useAddMalumotMutation,
  useUpdateMalumotMutation,
  useDeleteMalumotMutation,
} from "./store/malumotApi";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Container,
  Typography,
  Alert,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Home() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // ❗ Token tekshirish
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      navigate("/register");
      return;
    }
  
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded); // 👈 roleni qayerdan kelishini ko‘rish
  
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setRole(decoded.role || decoded.user?.role || "user"); // har ikkisini tekshir
      }
    } catch (err) {
      console.error("Token noto‘g‘ri:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);
  

  // RTK Query malumotlari
  const { data: malumotlar = [], isLoading } = useGetMalumotlarQuery();
  const [addMalumot] = useAddMalumotMutation();
  const [updateMalumot] = useUpdateMalumotMutation();
  const [deleteMalumot] = useDeleteMalumotMutation();

  // Modal
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const initialForm = {
    sana: "",
    fullName: "",
    davlatRaqami: "",
    telNomer: "",
    gazlashgan: "",
    ruxsatnoma: "",
    gazakt: "",
    gazaktTrip: "",
    sugurta: "",
    texasmotr: "",
    davlatTolovi: "",
    smart: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpen = (malumot = null) => {
    setErrorMessage(null);
    if (malumot) {
      setFormData({ ...malumot });
      setEditId(malumot.id || malumot.tartibRaqami);
    } else {
      setFormData(initialForm);
      setEditId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialForm);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const { tartibRaqami, ...updateData } = formData;
        await updateMalumot({ id: editId, ...updateData }).unwrap();
        alert("Muvaffaqiyatli yangilandi!");
      } else {
        const { tartibRaqami, ...newData } = formData;
        await addMalumot(newData).unwrap();
        alert("Muvaffaqiyatli qo‘shildi!");
      }
      handleClose();
    } catch (error) {
      console.error("Backend xato:", error);

      // ✅ xabarni to‘g‘ri olish
      let backendMessage = "Xatolik yuz berdi";
      if (Array.isArray(error?.data?.message)) {
        backendMessage = error.data.message.join(", ");
      } else if (typeof error?.data?.message === "string") {
        backendMessage = error.data.message;
      } else if (error?.error) {
        backendMessage = error.error;
      } else if (error?.message) {
        backendMessage = error.message;
      }

      setErrorMessage(backendMessage);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Rostdan o‘chirmoqchimisiz?")) {
      try {
        await deleteMalumot(id).unwrap();
        alert("O‘chirildi!");
      } catch (error) {
        console.error("Delete xato:", error);

        let backendMessage = "O‘chirishda xatolik yuz berdi";
        if (Array.isArray(error?.data?.message)) {
          backendMessage = error.data.message.join(", ");
        } else if (typeof error?.data?.message === "string") {
          backendMessage = error.data.message;
        } else if (error?.error) {
          backendMessage = error.error;
        } else if (error?.message) {
          backendMessage = error.message;
        }

        setErrorMessage(backendMessage);
      }
    }
  };


  if (isLoading) return <p>Yuklanmoqda...</p>;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, px: 1 }}>

      <Typography variant="h5" gutterBottom>
        Malumotlar ro‘yxati
      </Typography>

      {/* Backend xato bo‘lsa Alert */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {(role === "user" || role === "admin") && (
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Qo‘shish
        </Button>
      )}

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Sana</TableCell>
            <TableCell>Ism Familiya</TableCell>
            <TableCell>Davlat raqami</TableCell>
            <TableCell>Tel nomer</TableCell>
            <TableCell>Gazlashtirish</TableCell>
            <TableCell>Ruxsatnoma</TableCell>
            <TableCell>GAZ AKT</TableCell>
            <TableCell>GAZ AKT 4 TRIP</TableCell>
            <TableCell>SUGURTA</TableCell>
            <TableCell>Texasmotr</TableCell>
            <TableCell>Davlat to‘lovi</TableCell>
            <TableCell>Smart</TableCell>
            <TableCell>Umumiy summa</TableCell>
            <TableCell>Amallar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {malumotlar.map((m, index) => (
            <TableRow key={m.id || m.tartibRaqami || index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{m.sana?.slice(0, 10)}</TableCell>
              <TableCell>{m.fullName}</TableCell>
              <TableCell>{m.davlatRaqami}</TableCell>
              <TableCell>{m.telNomer}</TableCell>
              <TableCell>{m.gazlashgan}</TableCell>
              <TableCell>{m.ruxsatnoma}</TableCell>
              <TableCell>{m.gazakt}</TableCell>
              <TableCell>{m.gazaktTrip}</TableCell>
              <TableCell>{m.sugurta}</TableCell>
              <TableCell>{m.texasmotr}</TableCell>
              <TableCell>{m.davlatTolovi}</TableCell>
              <TableCell>{m.smart}</TableCell>
              <TableCell>{m.umumiySumma}</TableCell>
              <TableCell>
                {role === "admin" && (
                  <>
                    <Button onClick={() => handleOpen(m)} sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(m.id || m.tartibRaqami)}
                    >
                      Delete
                    </Button>
                  </>
                )}
                {role === "user" && (
                  <Typography color="text.secondary" variant="body2">
                    Faqat qo‘shish mumkin
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? "Tahrirlash" : "Yangi ma’lumot"}</DialogTitle>
        <DialogContent>
          {Object.keys(initialForm).map((key) => (
            <TextField
              key={key}
              margin="dense"
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              type={
                [
                  "gazlashgan",
                  "ruxsatnoma",
                  "gazakt",
                  "gazaktTrip",
                  "sugurta",
                  "texasmotr",
                  "davlatTolovi",
                  "smart",
                ].includes(key)
                  ? "number"
                  : key === "sana"
                  ? "date"
                  : "text"
              }
              value={formData[key] || ""}
              onChange={handleChange}
              fullWidth
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Bekor qilish</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Saqlash
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Home;
