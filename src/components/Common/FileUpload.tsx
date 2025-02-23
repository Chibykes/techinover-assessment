import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import uploadImage from "../../assets/upload.svg";

interface FileUploadInterface {
  image: string | null;
  onFileUpload: (image: string | null) => void;
  onFileRemove: () => void;
}

const FileUpload = ({
  image,
  onFileUpload,
  onFileRemove,
}: FileUploadInterface) => {
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string | null>(image);
  const [dragging, setDragging] = useState(false);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFile = async (file: File) => {
    const base64String = await convertToBase64(file);
    setFile(file);
    setBase64(base64String);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const base64String = await convertToBase64(selectedFile);
      setFile(selectedFile);
      setBase64(base64String);
      //   console.log("blob_url", URL.createObjectURL(selectedFile));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setDragging(false);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  useEffect(() => {
    onFileUpload(base64);
  }, [base64, onFileUpload]);

  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Upload cover
        <span className="font-normal text-[#848585]">(Optional)</span>
      </label>
      <div
        className={clsx(
          "mt-2 flex justify-center rounded-lg border border-gray-300 p-4",
          dragging && "border-indigo-600",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {base64 ? (
          <div className="flex items-center justify-between gap-4">
            <img className="w-[40%] rounded-sm" src={base64} />
            <div className="flex w-full flex-col gap-2">
              <p className="max-w-[200px] truncate text-sm font-medium">
                {file?.name}
              </p>
              <p className="text-xs font-normal text-neutral-600">
                {file?.size ? (file?.size / 1024 / 1024).toFixed(2) : 0} MB
              </p>
              <div className="flex items-center gap-4">
                <div className="relative h-2 w-full overflow-hidden rounded-full">
                  <span className="absolute top-0 left-0 h-full w-full bg-indigo-600"></span>
                </div>
                <span className="text-xs font-normal text-neutral-600">
                  100%
                </span>
              </div>
            </div>
            <button
              className="cursor-pointer"
              onClick={() => {
                setBase64(null);
                onFileRemove();
              }}
            >
              <FaRegTrashAlt size={20} className="shrink-0 text-neutral-600" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <img className="m-auto" src={uploadImage} width={40} height={40} />
            <div className="mt-4 flex text-sm/6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
              >
                <span className="font-medium">
                  {dragging ? "Drop file here..." : "Click to upload"}
                </span>
                {!dragging && (
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                )}
              </label>
              {!dragging && <p className="pl-1">or drag and drop</p>}
            </div>
            <p className="text-xs/5 text-gray-600">PNG, JPG</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
