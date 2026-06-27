import styles from "@/app/styles/ForYou.module.css";
import skeletonStyles from "@/app/styles/SkeletonLoadingStates.module.css";

export default function ForYouLoading() {
  return (
    <div className={styles.row}>
      <div className={styles.container}>
        <div className={styles["for-you__title"]}>Selected just for you</div>
        <div className={skeletonStyles["selected__book--image-skeleton"]} />

        <div className={styles["for-you__title"]}>Recommended For You</div>
        <div className={styles["for-you__sub--title"]}>
          We think you&apos;ll like these
        </div>
        <div className={styles["for-you__recommended--books"]}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={skeletonStyles["for-you__recommended--books-link--skeleton"]}
            />
          ))}
        </div>

        <div className={styles["for-you__title"]}>Suggested Books</div>
        <div className={styles["for-you__sub--title"]}>
          Browse these curated lists
        </div>
        <div className={styles["for-you__recommended--books"]}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={skeletonStyles["for-you__recommended--books-link--skeleton"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
