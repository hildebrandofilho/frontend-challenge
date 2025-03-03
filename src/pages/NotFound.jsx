import React from "react";
import styles from './restaurant.module.css';

function NotFound() {
  return (
    <div className={styles.containerNotFound}>
      <h2 className={styles.headingNotFound}>Page Not Found</h2>
    </div>
  );
}

export { NotFound };