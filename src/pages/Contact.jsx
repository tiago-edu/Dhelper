import React, { useState } from "react";
import emailjs from "emailjs-com";
import Nav from "../components/Nav";
import { styles } from "../utils/styles";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendEmail();
  };
  const serviceID = "service_pf7fxjx"; // Substitua pelo seu Service ID
  const templateID = "template_8o66gim"; // Substitua pelo seu Template ID
  const userID = "on1rTk9TSp8E9nd58"; // Seu User ID

  const sendEmail = () => {
    const templateParams = {
      from_name: name,
      from_email: email,
      to_email: "dhelperapi@skelt.com.br",
      message,
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then(() => {
        alert("Mensagem enviada com sucesso!");
        setEmail("");
        setName("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Erro ao enviar o e-mail:", error);
        alert("Erro ao enviar a mensagem.");
      });
  };

  return (
    <div>
      <Nav />
      <div className={`h-5/6 w-screen ${styles.rowCenter}`}>
        <div
          className={`${styles.border} ${styles.rowCenter} items-center sm:w-1/3 min-w-1/5 h-full p-6 sm:p-12 gap-4 sm:gap-12 bg-white mb-10`}
        >
          <div className={`${styles.column} text-black w-4/5 gap-2`}>
            <h2 className="text-center text-xl font-black">Contato</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className={`${styles.input} pl-2`}
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className={`${styles.input} pl-2`}
                placeholder="Tiago Arruda"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg"
                placeholder="Write your thoughts here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className={`${styles.center} bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 mt-2 rounded-md w-full`}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
