import React from 'react'
import styles from './Loading.module.css';

export default function Loading() {
  return (
    
    <>
    <div className="container">
    <div className=" vh-100 d-flex justify-content-center align-items-center">
    <div>
    <div className={`${styles.wrapper}`}>
    <div className={` ${styles.circle}`}></div>
    <div className={` ${styles.circle}`}></div>
    <div className={` ${styles.circle}`}></div>
    <div className={` ${styles.shadow}`}></div>
    <div className={` ${styles.shadow}`}></div>
    <div className={` ${styles.shadow}`}></div>
</div>
    </div>
    </div>
    </div>
    </>
  )
}
