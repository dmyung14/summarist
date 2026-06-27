import styles from "@/app/styles/BookId.module.css";
import skeletonStyles from "@/app/styles/SkeletonLoadingStates.module.css";

export default function BookLoading() {
  return (
    <div className={styles.row}>
      <div className={styles.container}>
        <div className={styles.inner__wrapper}>
          <div className={styles.inner__book}>
            {/* Title */}
            <div className={skeletonStyles["skeleton__line"]} style={{ width: "65%", height: "38px" }} />
            {/* Author */}
            <div className={skeletonStyles["skeleton__line"]} style={{ width: "35%", height: "22px" }} />
            {/* Subtitle */}
            <div className={skeletonStyles["skeleton__line"]} style={{ width: "50%", height: "24px" }} />
            {/* Stats wrapper */}
            <div className={skeletonStyles["skeleton__line"]} style={{ width: "100%", height: "80px", marginBottom: "24px" }} />
            {/* Read / Listen buttons */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
              <div className={skeletonStyles["skeleton__line"]} style={{ width: "144px", height: "48px", marginBottom: 0 }} />
              <div className={skeletonStyles["skeleton__line"]} style={{ width: "144px", height: "48px", marginBottom: 0 }} />
            </div>
            {/* Add to library */}
            <div className={skeletonStyles["skeleton__line"]} style={{ width: "180px", height: "28px", marginBottom: "40px" }} />
            {/* "What's it about?" heading */}
            <div className={skeletonStyles["skeleton__line"]} style={{ width: "200px", height: "22px" }} />
            {/* Tags */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <div className={skeletonStyles["skeleton__line"]} style={{ width: "100px", height: "48px", marginBottom: 0 }} />
              <div className={skeletonStyles["skeleton__line"]} style={{ width: "100px", height: "48px", marginBottom: 0 }} />
            </div>
            {/* Book description */}
            <div className={skeletonStyles["skeleton__line"]} style={{ width: "100%", height: "180px" }} />
            {/* "About the author" heading */}
            <div className={skeletonStyles["skeleton__line"]} style={{ width: "200px", height: "22px" }} />
            {/* Author description */}
            <div className={skeletonStyles["skeleton__line"]} style={{ width: "100%", height: "180px", marginBottom: 0 }} />
          </div>
          <div className={styles["inner-book--img-wrapper"]}>
            <figure className={styles["book__image--wrapper"]}>
              <div className={skeletonStyles["book__detail--image-skeleton"]} />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
