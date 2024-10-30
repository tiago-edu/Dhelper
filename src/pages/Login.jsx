import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice"; // Assumindo que você tem um action para login no Redux
import { styles } from "../utils/styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpa erros anteriores

    try {
      const resultAction = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/");
      } else {
        setError(resultAction.payload || "Erro ao efetuar login.");
      }
    } catch (error) {
      setError("Erro ao tentar efetuar login. Tente novamente.");
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div
        className={`${styles.columnCenter} w-[430px] border p-8 m-4 rounded-lg shadow-xl bg-white`}
      >
        <h1 className={`${styles.h1}`}>Login</h1>
        <img src="/Logo dhelper.png" alt="Logo" className="w-32 h-32 mb-4" />
        <form
          onSubmit={handleLogin}
          className={`${styles.columnCenter} gap-y-4`}
        >
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
            Login
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <p className="text-sm text-gray-600 mt-2">
            Não possui uma conta?{" "}
            <Link to="/register" className="text-blue-500">
              Registre-se!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
