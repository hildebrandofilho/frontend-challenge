import React from "react";
import { Oval } from 'react-loader-spinner';
import styles from '../components.module.css';

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Loading({ className, ...props } = {}) {
  return (
    <div className={cn(styles.loadingContainer, className)} {...props}>
      <Oval
        height={100}
        width={100}
        color="#EEEEEE"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#F8F9FA"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}

export { Loading };