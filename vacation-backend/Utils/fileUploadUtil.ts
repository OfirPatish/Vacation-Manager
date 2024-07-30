import fileUpload from "express-fileupload";
import path from "path";

export const handleFileUpload = async (file: fileUpload.UploadedFile, destination: string): Promise<string> => {
  const fileExtension = path.extname(file.name);
  const fileName = `${destination.toLowerCase().replace(/\s+/g, "_")}${fileExtension}`;
  const uploadPath = path.join(__dirname, "..", "uploads", fileName);
  await file.mv(uploadPath);
  return fileName;
};
