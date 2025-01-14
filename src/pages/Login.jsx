import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice"; // Assumindo que você tem um action para login no Redux
import { styles } from "../utils/styles";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
  };


  const [isLoading, setIsLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  try {
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/");
    } else {
      setError(resultAction.payload || "Erro ao efetuar login.");
    }
  } catch (error) {
    setError("Erro ao tentar efetuar login. Tente novamente.");
  } finally {
    setIsLoading(false);
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
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
