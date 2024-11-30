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
import { fetchPlaces } from "../redux/placesSlice";

const Home = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

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

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredPlaces = Array.isArray(places)
    ? places.filter((item) =>
        item.name?.toLowerCase().includes(search?.toLowerCase())
      )
    : [];

  function getGoogleMapsUrl(placeId) {
    return `https://www.google.com/maps/embed/v1/place?key=SEU_GOOGLE_MAPS_API_KEY&q=place_id:${placeId}`;
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
                  <li key={index}>
                    <div
                      className={`${styles.img} ${styles.zoom} flex items-end`}
                      style={{
                        backgroundImage: `url(${item.img})`,
                      }}
                      onClick={() => handleOpen(item)}
                    >
                      <h1 className={`${styles.cardH1}`}>{item.name}</h1>
                    </div>
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
