import React, { useState } from "react";
import Nav from "../components/Nav";
import { styles } from "../utils/styles";
import { places } from "../utils/constants";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css";
import 'swiper/swiper-bundle.css';
import 'swiper/css/effect-coverflow';
const Home = () => {


  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

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
'1'
  const filteredPlaces = places
    .flat()
    .filter((item) => item.name?.toLowerCase().includes(search?.toLowerCase()));

  function getGoogleMapsUrl(placeId) {
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBlgn1_G6GzE48Tg_uuf9ZhfTjy8gbZbt0&q=place_id:${placeId}`;
  }

  function Mapa({ place }) {
    const url = getGoogleMapsUrl(place?.placeId);
    return (
      <iframe
        width="450"
        height="250"
        frameborder="0"
        referrerpolicy="no-referrer-when-downgrade"
        src={url}
      ></iframe>
    );
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
            className={`${styles.borderInside} flex  items-center h-3/4 w-1/2 bg-white text-black`}
          >
            {selectedPlace && (
              <div className={`${styles.column} w-full`}>
                <div className={`w-1/2`}>
                  <Typography
                    sx={{ fontFamily: "Open Sans", fontWeight: "800" }}
                    variant="h6"
                  >
                    {selectedPlace.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Open Sans",
                      fontWeight: "800",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {selectedPlace.nota}
                    <svg
                      width="20" // Ajuste a largura conforme necessário
                      height="20"
                      viewBox="0 0 15 15"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ verticalAlign: "middle", marginLeft: "4px" }}
                    >
                      <path
                        d="M5.48279 0.313927L6.61067 2.70364C6.6891 2.86984 6.84075 2.98501 7.01618 3.01162L9.5383 3.39485C9.9801 3.46203 10.1564 4.02958 9.8368 4.35523L8.0118 6.21535C7.88497 6.34469 7.82698 6.53118 7.85702 6.71375L8.28777 9.34033C8.36328 9.80035 7.90145 10.1511 7.50637 9.93405L5.25063 8.69405C5.09376 8.60789 4.90624 8.60789 4.74937 8.69405L2.49363 9.93405C2.09855 10.1513 1.63672 9.80035 1.71223 9.34033L2.14298 6.71375C2.17302 6.53118 2.11503 6.34469 1.9882 6.21535L0.163203 4.35523C-0.156365 4.02936 0.019898 3.46182 0.461702 3.39485L2.98382 3.01162C3.15925 2.98501 3.3109 2.86984 3.38933 2.70364L4.51721 0.313927C4.71454 -0.104642 5.28525 -0.104642 5.48279 0.313927Z"
                        style={{ verticalAlign: "middle" }}
                      ></path>
                    </svg>
                  </Typography>
                </div>
                <div className={`w-full`}>
                  <Swiper
                      slidesPerView={3}
                      navigation={true}
                      pagination={true}
                      modules={[Navigation, EffectCoverflow, Pagination]}
                      effect="coverflow" 
                      loop={true}
                      className='bg-gray-200 my-8'
                      
                      
                    >
                      {selectedPlace.fotos.map((foto, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={foto}
                            alt={`Slide ${index + 1}`}
                            
                          />
                         
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>


                <div className={`h-1/2 flex-row flex`}>
                  <Typography
                    className='w-1/2'
                    sx={{ fontFamily: "Open Sans", fontWeight: "600" }}
                    
                  >
                    {selectedPlace.desc}
                    <h2>Contato: {selectedPlace.telefone}</h2>
                  </Typography>
                  {/* Renderizar apenas o mapa do local selecionado */}
                  <Mapa place={selectedPlace}/>
                </div>
              </div>
            )}
          </Box>
        </Modal>
      </div>
      <div className={`h-5/6 mb-10 flex flex-col ${styles.center}`}>
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
                    className={`${styles.img} ${styles.zoom}`}
                    style={{backgroundImage: `url(${item.img})`}}
                    onClick={() => handleOpen(item)}
                  >
                    <h1 className={`font-namePlace font-extrabold text-2xl`}>
                      {item.name}
                    </h1>
                  </div>
                </li>
              ))
            )}
          </ul>
        
          <div className={`${styles.center} gap-4 m-4`}>
            <button type="button" className={`${styles.arrowButton}`}>
              <img src="left-arrow.png" alt="left-arrow" className="p-2" />
            </button>
            <button type="button" className={`${styles.arrowButton}`}>
              <img src="right-arrow.png" alt="right-arrow" className="p-2" />
            </button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
