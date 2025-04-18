"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CardItem = () => {
  const router = useRouter();

  const [title, setTitle] = useState("Título");
  const [subtitle, setSubtitle] = useState("Subtítulo");
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
  );
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setImage(file);
    }
  };

  const handleSave = () => {
    // Aqui você poderia mandar para o banco de dados
    console.log({ title, subtitle, description, image });
    router.push("/produtos");
  };

  const handleCancel = () => {
    router.push("/produtos");
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-8">
      <div className="bg-purple-50 rounded-lg shadow-md p-6 w-full max-w-4xl relative">
        <div className="flex flex-col items-center gap-4">
          <div className="w-full">
            <label htmlFor="imageUpload" className="cursor-pointer block">
              <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-600">Clique para adicionar imagem</span>
                )}
              </div>
            </label>
            <input
              id="imageUpload"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <input
            type="text"
            className="w-full px-4 py-2 border rounded text-lg font-semibold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="w-full px-4 py-2 border rounded text-sm text-gray-600"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
          <textarea
            className="w-full px-4 py-2 border rounded text-sm text-gray-700"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 rounded border border-gray-400 text-gray-700"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded bg-purple-600 text-white"
            onClick={handleSave}
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
