import React from "react";
import Nav from "../components/Nav";
import { styles } from "../utils/styles";
const Contact = () => {
  return (
    <div>
      <Nav />
      <div className={`h-5/6 w-screen ${styles.rowCenter}`}>
        <div
          className={`${styles.border} ${styles.rowCenter} items-center sm:w-1/3  min-w-1/5 h-full p-6 sm:p-12  gap-4 sm:gap-12 bg-white mb-10`}

        >
          <div className={`${styles.column} text-black w-4/5 gap-2`}>
            <h2 className="text-center text-xl font-black">Contato</h2>
            <label htmlFor="">Email</label>
            <input
            type="email"
            id="email"
            className={`${styles.input} pl-2`}
            placeholder="example@gmail.com"
          />
            <label htmlFor="">Name</label>
            <input
            type="search"
            id="search"
            className={`${styles.input} pl-2`}
            placeholder="Tiago Arruda"
          />
            <label htmlFor="">Message</label>
            <textarea name="message" id="message" className="block p-2.5 w-full text-sm text-gray-900  rounded-lg dark:bg-gray-700  dark:placeholder-gray-400" placeholder="Write your thoughts here..."></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
