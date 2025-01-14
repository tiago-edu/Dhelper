import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlace } from "../redux/placesSlice";
import Nav from "../components/Nav";

const AddPlace = () => {
  const dispatch = useDispatch();
  const { error: globalError, loading } = useSelector((state) => state.places);

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    endereco: "",
    telefone: "",
    nota: "",
    placeId: "",
    img: null,
    fotos: [],
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [localError, setLocalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, fotos: files });
    setSelectedImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setFormData({
      ...formData,
      fotos: formData.fotos.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.img) {
      setLocalError("Por favor, selecione uma imagem principal.");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("desc", formData.desc);
    form.append("endereco", formData.endereco);
    form.append("telefone", formData.telefone);
    form.append("nota", formData.nota || 0);
    form.append("placeId", formData.placeId);
    form.append("img", formData.img);

    // Adicionar múltiplas fotos
    formData.fotos.forEach((file) => {
      form.append("fotos", file);
    });

    try {
      const response = await dispatch(addPlace(form)).unwrap();
      console.log("Resposta do servidor:", response);
      setSuccessMessage(
        `Local adicionado com sucesso! Imagem disponível em: ${response.img}`
      );
      setLocalError(null);
      setFormData({
        name: "",
        desc: "",
        endereco: "",
        telefone: "",
        nota: "",
        placeId: "",
        img: null,
        fotos: [],
      });
      setSelectedImages([]);
    } catch (err) {
      setLocalError(
        err.message ||
          "Erro ao adicionar local. Verifique os dados e tente novamente."
      );
      setSuccessMessage(null);
    }
  };

  return (
    <>
      <Nav />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Adicionar Novo Local</h2>
        {(localError || globalError) && (
          <p className="text-red-500">{localError || globalError}</p>
        )}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nome do Local"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            placeholder="Descrição"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleInputChange}
            placeholder="Endereço"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            placeholder="Telefone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            name="nota"
            value={formData.nota}
            onChange={handleInputChange}
            placeholder="Nota"
            min="0"
            max="5"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="placeId"
            value={formData.placeId}
            onChange={handleInputChange}
            placeholder="ID do Local"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
           <input
            type="file"
            onChange={handleFileChange}
            accept="image/jpeg, image/png"
            className="w-full"
            required
          />
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/jpeg, image/png"
            className="w-full"
            required
          />
          <div className="flex flex-wrap gap-2">
            {selectedImages.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt={`Imagem ${index + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className={`mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Adicionando..." : "Adicionar Local"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPlace;
