import React, { useState } from "react";
import FileInput from "../components/FileInput";
import Nav from "../components/Nav";

const AddPlace = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = (files) => {
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages(imageUrls);
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      <Nav />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Adicionar Novo Local</h2>

        {/* Campos de formulário */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nome do Local"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <textarea
            placeholder="Descrição"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Endereço"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="tel"
            placeholder="Telefone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            placeholder="Nota"
            min="0"
            max="5"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <FileInput onImageUpload={handleImageUpload} />
        {/* Botão de Envio */}
        <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Adicionar Local
        </button>
      </div>
    </>
  );
};

export default AddPlace;
