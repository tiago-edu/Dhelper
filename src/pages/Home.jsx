import React from "react";
import Nav from "../components/Nav";
import { styles } from "../utils/styles";
import { places } from "../utils/constants";
const Home = () => {
  return (
    <>
      <Nav />
      <div className={`h-5/6 mb-10 ${styles.center}`}>
        <div className={`${styles.border} w-10/12 bg-white h-full`}>
          <ul className={`flex justify-center flex-wrap`}>
            {places.map((item) => (
              <li key={item.place}>
                <div
                  className={`${styles.columnCenter} ${styles.zoom} ${styles.border} gap-4 m-4 w-64 h-48 dark:bg-gray-700`}
                >
                  <img
                    src={item.place}
                    alt=""
                    className="border-none rounded-xl px-4"
                  />
                  <h3>Museu de arte Sp</h3>
                </div>
              </li>
            ))}
          </ul>
          <div className={`${styles.center} gap-4 m-4`}>
          <button type="button" class={`${styles.arrowButton}`}><img src="left-arrow.png" alt="left-arrow" className="p-2"/></button>
          <button type="button" class={`${styles.arrowButton}`}><img src="right-arrow.png" alt="right-arrow" className="p-2"/></button>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
