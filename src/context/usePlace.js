import { useContext } from "react";
import { PlaceContext } from "./PlaceContext";

export function useStock() {
  return useContext(PlaceContext);
}
