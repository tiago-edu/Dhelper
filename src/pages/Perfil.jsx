import React from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";

const Perfil = () => {
  return (
    <div>
      <Nav />
      <div class="px-16">
        <div class="p-8 bg-white shadow mt-24 rounded-xl">
          <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>
            <div class="relative">
              <div class="  mx-auto absolute inset-x-0 top-0 -mt-24 flex items-center justify-center ">
                <img
                  src="https://picsum.photos/180/180"
                  className="rounded-[100px]  mb-10"
                  alt="Ranyel_Perfil"
                />
              </div>
            </div>
          </div>

          <div class="mt-36  text-center border-b pb-12">
            <h1 class="text-4xl font-medium text-gray-700">
              Tiago Moreira, <span class="font-light text-gray-500">19</span>
            </h1>
            <p class="font-light text-gray-600 mt-3">Curitiba, Paraná</p>

            
          </div>

          <div class="mt-12 flex flex-col justify-center">
            <p class="text-gray-600 text-center font-light lg:px-16">
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
            </p>
            <Link to="/login" className={`text-indigo-500 py-2 px-4 font-medium mt-4 text-center`}>Exit</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
