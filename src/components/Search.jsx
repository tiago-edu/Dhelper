import React from 'react'
import { styles } from "../utils/styles";
export const Search = () => {
  return (
    <div>
        <div className="relative">
          <div className="absolute inset-y-0 flex items-center pl-3">
            <img src="/icons8-search.svg" alt="Search_icon" />
          </div>
          <input
            type="search"
            id="search"
            className={`${styles.input}`}
            placeholder="Places..."
          />
          <button type="submit" className={`${styles.button}`}>
            Search
          </button>
        </div>
      </div>
  )
}

export default Search