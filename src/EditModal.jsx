// "use client";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Textarea } from "./ui/textarea";
// import { Button } from "./ui/button";
// import { getFormData, validate } from "@/lib/utils";
// import { toast } from "sonner";
// import { useUpdateNewsMutation } from "@/store/redux/api/newsApi";

// export default function EditModal({ isOpen, onClose, datas}) {
//   const [updateNews] = useUpdateNewsMutation();
//   // console.log(data);
//   const {
//     titleUz,
//     titleRu,
//     titleEn,
//     descriptionUz,
//     descriptionRu,
//     descriptionEn,
//     date,
//     id,
//     user_id
//   } = datas;
//   // console.log("datas", datas);
//   // const newsdate = date.split(".").reverse().join("-");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = getFormData(e.target);
//     console.log("data 1", data);
//     const imgs = "edit";
//     const check = validate(data, imgs);
//     const updateData = {...data, id, user_id}
//     console.log("updateData", updateData);
//     if (check == null) {
      
//       await updateNews(updateData)
//       onClose();
//       toast("Ajoyib!", {
//         description: "Malumotlar muvaffaqiyatli saqlandi",
//       });
//     } else {
//       const { message, target } = check;
//       toast.error(message);
//       e.target[target].focus();
//     }
//   };

//   if (!isOpen) {
//     return null;
//   }
//   return (
//     <div className="w-full inset-0 flex items-center justify-center bg-black bg-inherit z-50">
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 w-[500px]">
//           <div className="grid w-full items-center gap-1.5 my-3">
//             <Label className="font-bold" htmlFor="text">
//               Sarlavha uz
//             </Label>
//             <Input
//               type="text"
//               id="titleUz"
//               name="titleUz"
//               placeholder="Sarlavha yozing"
//               defaultValue={titleUz || ""}
//             />
//           </div>
//           <div className="grid items-center gap-1.5 my-3">
//             <Label className="font-bold" htmlFor="text">
//               Sarlavha ru
//             </Label>
//             <Input
//               type="text"
//               id="title"
//               name="titleRu"
//               placeholder="Sarlavha yozing"
//               defaultValue={titleRu || ""}
//             />
//           </div>
//           <div className="grid w-full items-center gap-1.5 my-3">
//             <Label className="font-bold " htmlFor="text">
//               Sarlavha en
//             </Label>
//             <Input
//               type="text"
//               id="title"
//               name="titleEn"
//               placeholder="Sarlavha yozing"
//               defaultValue={titleEn || ""}
//             />
//           </div>
//         </div>

//         <div className="grid w-full gap-1.5 my-3">
//           <Label className="font-bold" htmlFor="message">
//             Tavsif uz
//           </Label>
//           <Textarea
//             placeholder="Tavsif yozing"
//             id="message"
//             name="descriptionUz"
//             defaultValue={descriptionUz || ""}
//           />
//         </div>
//         <div className="grid w-full gap-1.5 my-3">
//           <Label className="font-bold" htmlFor="message">
//             Tavsif ru
//           </Label>
//           <Textarea
//             placeholder="Tavsif yozing"
//             id="message"
//             name="descriptionRu"
//             defaultValue={descriptionRu || ""}
//           />
//         </div>
//         <div className="grid w-full gap-1.5 my-3">
//           <Label className="font-bold" htmlFor="message">
//             Tavsif en
//           </Label>
//           <Textarea
//             placeholder="Tavsif yozing"
//             id="message"
//             name="descriptionEn"
//             defaultValue={descriptionEn || ""}
//           />
//         </div>

//         <div className="grid w-full items-center gap-1.5 my-3">
//           <Label className="font-bold" htmlFor="date">
//             Sanani kiriting
//           </Label>

//           <Input
//             type="date"
//             id="date"
//             name="date"
//             defaultValue={date || ""}
//             className="mt-3"
//           />
//         </div>

//         <div className="grid w-full items-center gap-1.5">
//           <Label className="font-bold mt-5" htmlFor="text">
//             Rasm yuklash
//           </Label>
//           <Input type="file" id="title" name="uploadImg" />
//         </div>
//         <div className="flex gap-5 my-5">
//           <Button className="hover:bg-red-500" onClick={onClose}>
//             Yopish
//           </Button>
//           <Button className="hover:bg-green-500" type="submit">
//             Saqlash
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
