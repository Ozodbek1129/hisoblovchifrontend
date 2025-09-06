// "use client";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Button } from "./ui/button";
// import { toast } from "sonner";
// import { useDispatch } from "react-redux";
// import { deleteImg } from "@/store/redux/slice/ImageSlice";
// import { useCreateMalumotMutation } from "@/store/redux/api/malumotlarApi";

// export default function Modal({ isOpen, onClose }) {
//   const [createMalumot] = useCreateMalumotMutation();
//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const data = Object.fromEntries(formData);

//     // number bo‘lishi kerak bo‘lgan qiymatlarni raqamga o‘tkazamiz
//     const numericFields = [
//       "tartibRaqami",
//       "ruxsatnoma",
//       "texasmotr",
//       "davlatTolovi",
//       "smart",
//       "umumiySumma",
//       "texpasportalmashtirish",
//       "oldisotdi",
//       "yagonadacha",
//       "qaytajihoz",
//       "gazakt",
//       "sugurta",
//     ];
//     numericFields.forEach((field) => {
//       if (data[field]) data[field] = Number(data[field]);
//     });

//     // checkbox boolean qiymat
//     data.gazlashgan = data.gazlashgan === "on";

//     try {
//       await createMalumot(data).unwrap();
//       toast("✅ Ma'lumot muvaffaqiyatli qo‘shildi");
//       onClose();
//       dispatch(deleteImg());
//     } catch (err) {
//       console.error("Xato:", err);
//       toast.error("❌ Ma'lumot qo‘shishda xatolik yuz berdi");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-2xl shadow-lg w-[600px] max-h-[90vh] overflow-y-auto"
//       >
//         <h2 className="text-xl font-bold mb-4">Yangi ma'lumot qo‘shish</h2>

//         <div className="grid gap-3">
//           <div>
//             <Label htmlFor="sana">Sana</Label>
//             <Input type="date" id="sana" name="sana" required />
//           </div>

//           <div>
//             <Label htmlFor="tartibRaqami">Tartib raqami</Label>
//             <Input type="number" id="tartibRaqami" name="tartibRaqami" required />
//           </div>

//           <div>
//             <Label htmlFor="fullName">To‘liq ism</Label>
//             <Input type="text" id="fullName" name="fullName" required />
//           </div>

//           <div>
//             <Label htmlFor="telNomer">Telefon raqami</Label>
//             <Input type="tel" id="telNomer" name="telNomer" placeholder="+998901234567" required />
//           </div>

//           <div>
//             <Label htmlFor="davlatRaqami">Davlat raqami</Label>
//             <Input type="text" id="davlatRaqami" name="davlatRaqami" required />
//           </div>

//           <div className="flex items-center gap-2">
//             <input type="checkbox" id="gazlashgan" name="gazlashgan" />
//             <Label htmlFor="gazlashgan">Gazlashgan</Label>
//           </div>

//           <div>
//             <Label htmlFor="ruxsatnoma">Ruxsatnoma</Label>
//             <Input type="number" id="ruxsatnoma" name="ruxsatnoma" />
//           </div>

//           <div>
//             <Label htmlFor="texasmotr">Texasmotr</Label>
//             <Input type="number" id="texasmotr" name="texasmotr" />
//           </div>

//           <div>
//             <Label htmlFor="davlatTolovi">Davlat to‘lovi</Label>
//             <Input type="number" id="davlatTolovi" name="davlatTolovi" />
//           </div>

//           <div>
//             <Label htmlFor="smart">Smart</Label>
//             <Input type="number" id="smart" name="smart" />
//           </div>

//           <div>
//             <Label htmlFor="umumiySumma">Umumiy summa</Label>
//             <Input type="number" id="umumiySumma" name="umumiySumma" />
//           </div>

//           <div>
//             <Label htmlFor="texpasportalmashtirish">Texpasport almashtirish</Label>
//             <Input type="number" id="texpasportalmashtirish" name="texpasportalmashtirish" />
//           </div>

//           <div>
//             <Label htmlFor="oldisotdi">Oldi-sotdi</Label>
//             <Input type="number" id="oldisotdi" name="oldisotdi" />
//           </div>

//           <div>
//             <Label htmlFor="yagonadacha">Yagona dacha</Label>
//             <Input type="number" id="yagonadacha" name="yagonadacha" />
//           </div>

//           <div>
//             <Label htmlFor="qaytajihoz">Qayta jihoz</Label>
//             <Input type="number" id="qaytajihoz" name="qaytajihoz" />
//           </div>

//           <div>
//             <Label htmlFor="gazakt">Gaz akt</Label>
//             <Input type="number" id="gazakt" name="gazakt" />
//           </div>

//           <div>
//             <Label htmlFor="sugurta">Sug‘urta</Label>
//             <Input type="number" id="sugurta" name="sugurta" />
//           </div>
//         </div>

//         <div className="flex justify-end gap-4 mt-6">
//           <Button variant="outline" onClick={onClose} type="button">
//             Yopish
//           </Button>
//           <Button type="submit" className="bg-green-500 hover:bg-green-600">
//             Saqlash
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
