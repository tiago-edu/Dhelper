import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../components/Nav";
import { styles } from "../utils/styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/effect-coverflow";
import { fetchPlaces, updatePlace } from "../redux/placesSlice";

const Home = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [editedPlace, setEditedPlace] = useState(null);

  const dispatch = useDispatch();

  // Obter os lugares do Redux
  const { data: places, loading, error } = useSelector((state) => state.places);

  // Dispara a ação de buscar lugares ao carregar o componente
  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  const handleOpen = (place) => {
    setSelectedPlace(place);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPlace(null);
  };

  const handleEditOpen = (place) => {
    setEditedPlace({ ...place });
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditedPlace(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedPlace((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => URL.createObjectURL(file));

    setEditedPlace((prev) => ({
      ...prev,
      fotos: [...(prev.fotos || []), ...newPhotos],
    }));
  };

  const handleRemovePhoto = (indexToRemove) => {
    setEditedPlace((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSaveEdit = () => {
    dispatch(updatePlace(editedPlace));
    console.log("Lugar editado:", editedPlace);
    setEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredPlaces = Array.isArray(places)
    ? places.filter((item) =>
        item.name?.toLowerCase().includes(search?.toLowerCase())
      )
    : [];

  //api key: AIzaSyBlgn1_G6GzE48Tg_uuf9ZhfTjy8gbZbt0

  function getGoogleMapsUrl(placeId) {
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBlgn1_G6GzE48Tg_uuf9ZhfTjy8gbZbt0&q=place_id:${placeId}`;
  }

  function Mapa({ place }) {
    const url = getGoogleMapsUrl(place?.placeId);

    return (
      <iframe
        width="85%"
        height="250"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={url}
      ></iframe>
    );
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar lugares: {error}</div>;
  }

  return (
    <>
      <Nav />

      <div>
        <Modal
          className={`flex justify-center items-center`}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            className={`${styles.borderInside} flex h-[90%] p-4 w-full xl:w-5/6 bg-white text-black absolute bottom-0 xl:relative scrollbar-hide overflow-auto`}
          >
            {selectedPlace && (
              <div className={`${styles.column} w-full gap-8`}>
                <div className="xl:pl-[13%]">
                  <p>{selectedPlace.name}</p>
                  <p>{selectedPlace.nota}</p>
                </div>
                <div className={`w-full`}>
                  <div className={`w-full`}>
                    {selectedPlace.fotos && selectedPlace.fotos.length > 0 ? (
                      selectedPlace.fotos.length > 1 ? (
                        <Swiper
                          slidesPerView={1}
                          pagination={{ clickable: true }}
                          modules={[Navigation, Pagination]}
                          effect="coverflow"
                          loop={selectedPlace.fotos.length > 1}
                          className="w-full"
                        >
                          {selectedPlace.fotos.map((foto, index) => (
                            <SwiperSlide
                              key={index}
                              className="flex justify-center items-center"
                            >
                              <img
                                className="xl:w-3/4"
                                src={foto}
                                alt={`Slide ${index + 1}`}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      ) : (
                        <div className="flex justify-center items-center">
                          <img
                            className="xl:w-3/4"
                            src={selectedPlace.fotos[0]}
                            alt="Imagem do lugar"
                          />
                        </div>
                      )
                    ) : (
                      <div className="flex justify-center items-center">
                        <p>Sem imagens disponíveis.</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="xl:px-[13%]">
                  <div>
                    <p>{selectedPlace.desc}</p>
                    <h2>Contato: {selectedPlace.telefone}</h2>
                  </div>
                </div>
                <div className="pb-6 flex justify-center">
                  <Mapa place={selectedPlace} />
                </div>
              </div>
            )}
          </Box>
        </Modal>

        {/* modal de edicao */}
        <Modal
          open={editModalOpen}
          onClose={handleEditClose}
          className="flex justify-center items-center"
        >
          <Box>
            {editedPlace && (
              <Box
                className={`${styles.borderInside} bg-white p-6 rounded-lg`}
              >
                <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-4">Editar Local</h2>

                  <input
                    name="name"
                    value={editedPlace.name || ""}
                    onChange={handleEditChange}
                    placeholder="Nome do Local"
                    className={`${styles.input} w-full`}
                  />

                  <textarea
                    name="desc"
                    value={editedPlace.desc || ""}
                    onChange={handleEditChange}
                    placeholder="Descrição"
                    className={`${styles.input} w-full h-24`}
                  />

                  <input
                    name="telefone"
                    value={editedPlace.telefone || ""}
                    onChange={handleEditChange}
                    placeholder="Telefone"
                    className={`${styles.input} w-full`}
                  />

                  <input
                    name="nota"
                    value={editedPlace.nota || ""}
                    onChange={handleEditChange}
                    placeholder="Nota"
                    className={`${styles.input} w-full`}
                  />

                  <div>
                    <label className="block mb-2">Fotos</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="mb-4"
                    />

                    <div className="flex flex-wrap gap-2">
                      {editedPlace.fotos &&
                        editedPlace.fotos.map((foto, index) => (
                          <div key={index} className="relative">
                            <img
                              src={foto}
                              alt={`Foto ${index + 1}`}
                              className="w-24 h-24 object-cover"
                            />
                            <button
                              onClick={() => handleRemovePhoto(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                            >
                              X
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={handleEditClose}
                      className="bg-gray-300 text-black px-4 py-2 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </Box>
            )}
          </Box>
        </Modal>
        {/* fim modal de edicao */}
      </div>
      <div className={`h-5/6 flex flex-col ${styles.center}`}>
        <div className="m-8">
          <div className="relative">
            <div className="absolute inset-y-0 flex items-center pl-3">
              <img src="/icons8-search.svg" alt="Search_icon" />
            </div>
            <input
              type="text"
              id="search"
              className={`${styles.input}`}
              placeholder="Places..."
              value={search}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={`${styles.border}`}>
          <div className={`${styles.mainContainer}`}>
            <ul className={`${styles.card}`}>
              {filteredPlaces.length === 0 ? (
                <h1 className={`${styles.h1}`}>
                  Não há resultados que correspondam à sua pesquisa
                </h1>
              ) : (
                filteredPlaces.map((item, index) => (
                  <li key={index} className="relative group">
                    <div
                      className={`${styles.img} ${styles.zoom} flex items-end`}
                      style={{
                        backgroundImage: `url(${item.img})`,
                      }}
                      onClick={() => handleOpen(item)}
                    >
                      <h1 className={`${styles.cardH1}`}>{item.name}</h1>
                    </div>
                    {localStorage.getItem("role") === "Admin" && (
                      <button
                        onClick={() => handleEditOpen(item)}
                        className="absolute top-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✏️
                      </button>
                    )}
                  </li>

                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
