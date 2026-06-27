import React from "react";
import styles from "@/app/styles/SearchLoadingState.module.css";

const SkeletonLoading = () => {
  return (
    <div className={styles["search__books--wrapper"]}>
      {new Array(5).fill(0).map((elem) => (
        <div className={styles.skeleton}></div>
      ))}
    </div>
  );
};

export default SkeletonLoading;
