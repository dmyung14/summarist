import React from "react";
import styles from "@/app/styles/Search.module.css";
import { IoMdSearch } from "react-icons/io";

const Search = () => {
  return (
    <div className={styles.search__background}>
      <div className={styles.search__wrapper}>
        <div className={styles.search__content}>
          <div className={styles.search}>
            <div className={styles["search__input--wrapper"]}>
              <input
                className={styles.search__input}
                type="text"
                placeholder="Search for books"
              />
              <div className={styles.search__icon}>
                <IoMdSearch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
