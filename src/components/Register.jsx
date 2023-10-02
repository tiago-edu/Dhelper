import React from "react";
import { styles } from "../utils/styles";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div class="w-full flex justify-center items-center h-screen">
      <div
        class={`${styles.columnCenter} w-[430px] border p-8 rounded-lg shadow-xl bg-white m-4`}
      >
        <h1 class={`${styles.h1}`}>Cadastre-se</h1>
        <img src="/Logo dhelper.png" alt="Logo" class={`w-32 h-32 mb-4`} />
        <form action="" class={`${styles.columnCenter} gap-y-4`}>
          <div class="w-full">
            <label htmlFor="username" class={`${styles.label}`}>
              Usuário
            </label>
            <input type="text" id="username" class={`${styles.input}`} />
          </div>
          <div class="w-full">
            <label htmlFor="email" class={`${styles.label}`}>
              Email
            </label>
            <input type="text" id="email" class={`${styles.input}`} />
          </div>
          <div class="w-full">
            <label htmlFor="password" class={`${styles.label}`}>
              Senha
            </label>
            <input type="password" id="password" class={`${styles.input}`} />
          </div>
          <Link
            to="/"
            class={`${styles.center} bg-blue-500 hover:bg-blue-600 text-white hover:text-white font-semibold py-2 mt-2 rounded-md w-full`}
          >
            Cadastrar-se
          </Link>
          <p class="text-sm text-gray-600 mt-2">
            Já possui uma conta?{" "}
            <Link to="/login" class="text-blue-500">
              Clique aqui!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
