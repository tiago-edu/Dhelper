import React, { useState } from "react";
import { styles } from "../utils/styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { status, error } = useSelector((state) => state.user);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Criação do objeto com os dados do usuário
    const userData = { name: username, email, password };

    // Despacha a ação de registro
    const resultAction = await dispatch(registerUser(userData));

    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/login");
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div
        className={`${styles.columnCenter} w-[430px] border p-8 rounded-lg shadow-xl bg-white m-4`}
      >
        <h1 className={`${styles.h1}`}>Cadastre-se</h1>
        <img src="/Logo dhelper.png" alt="Logo" className="w-32 h-32 mb-4" />
        <form
          onSubmit={handleRegister}
          className={`${styles.columnCenter} gap-y-4`}
        >
          <div className="w-full">
            <label htmlFor="username" className={`${styles.label}`}>
              Usuário
            </label>
            <input
              type="text"
              id="username"
              className={`${styles.input}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="email" className={`${styles.label}`}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`${styles.input}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="password" className={`${styles.label}`}>
              Senha
            </label>
            <input
              type="password"
              id="password"
              className={`${styles.input}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`${styles.center} bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 mt-2 rounded-md w-full`}
          >
            {status === "loading" ? "Registrando..." : "Cadastrar-se"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <p className="text-sm text-gray-600 mt-2">
            Já possui uma conta?{" "}
            <Link to="/login" className="text-blue-500">
              Clique aqui!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
