import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductDescription.module.css';

const ProductDescription = ({ 
  brand,
  model,
  price,
  cpu,
  ram,
  os,
  displayResolution,
  battery,
  primaryCamera,
  dimentions,
  weight
}) => {
  const cameras = primaryCamera ? (Array.isArray(primaryCamera) ? primaryCamera : [primaryCamera]) : [];
  const operatingSystems = os ? (Array.isArray(os) ? os : [os]) : [];
  const cpus = cpu ? (Array.isArray(cpu) ? cpu : [cpu]) : [];
  const rams = ram ? (Array.isArray(ram) ? ram : [ram]) : [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{brand} {model}</h1>
        {price && <span className={styles.price}>{price}€</span>}
      </div>

      <div className={styles.specs}>
        {(cpus.length > 0 || rams.length > 0 || operatingSystems.length > 0 || displayResolution || battery) && (
          <div className={styles.specGroup}>
            <h2 className={styles.groupTitle}>Características principales</h2>
            <ul className={styles.specList}>
              {cpus.length > 0 && (
                <li className={styles.specItem}>
                  <span className={styles.specLabel}>CPU:</span>
                  <span className={styles.specValue}>
                    {cpus.length === 1 
                      ? cpus[0]
                      : cpus.map((cpu, index) => (
                          <span key={index}>
                            {index > 0 && ' / '}
                            {cpu}
                          </span>
                        ))
                    }
                  </span>
                </li>
              )}
              {rams.length > 0 && (
                <li className={styles.specItem}>
                  <span className={styles.specLabel}>RAM:</span>
                  <span className={styles.specValue}>
                    {rams.length === 1 
                      ? rams[0]
                      : rams.map((ram, index) => (
                          <span key={index}>
                            {index > 0 && ' / '}
                            {ram}
                          </span>
                        ))
                    }
                  </span>
                </li>
              )}
              {operatingSystems.length > 0 && (
                <li className={styles.specItem}>
                  <span className={styles.specLabel}>Sistema Operativo:</span>
                  <span className={styles.specValue}>
                    {operatingSystems.length === 1 
                      ? operatingSystems[0]
                      : operatingSystems.map((os, index) => (
                          <span key={index}>
                            {index > 0 && ' / '}
                            {os}
                          </span>
                        ))
                    }
                  </span>
                </li>
              )}
              {displayResolution && (
                <li className={styles.specItem}>
                  <span className={styles.specLabel}>Resolución:</span>
                  <span className={styles.specValue}>{displayResolution}</span>
                </li>
              )}
              {battery && (
                <li className={styles.specItem}>
                  <span className={styles.specLabel}>Batería:</span>
                  <span className={styles.specValue}>{battery}</span>
                </li>
              )}
            </ul>
          </div>
        )}

        {cameras.length > 0 && (
          <div className={styles.specGroup}>
            <h2 className={styles.groupTitle}>Cámara</h2>
            <ul className={styles.specList}>
              {cameras.length === 1 ? (
                <li className={styles.specItem}>
                  <span className={styles.specLabel}>Cámara:</span>
                  <span className={styles.specValue}>{cameras[0]}</span>
                </li>
              ) : (
                cameras.map((cam, index) => (
                  <li key={index} className={styles.specItem}>
                    <span className={styles.specLabel}>Cámara {index + 1}:</span>
                    <span className={styles.specValue}>{cam}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        {(dimentions || weight) && (
          <div className={styles.specGroup}>
            <h2 className={styles.groupTitle}>Dimensiones</h2>
            <ul className={styles.specList}>
              {dimentions && (
                <li className={styles.specItem}>
                  <span className={styles.specLabel}>Tamaño:</span>
                  <span className={styles.specValue}>{dimentions}</span>
                </li>
              )}
              {weight && (
                <li className={styles.specItem}>
                  <span className={styles.specLabel}>Peso:</span>
                  <span className={styles.specValue}>{weight}</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

ProductDescription.propTypes = {
  brand: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  price: PropTypes.string,
  cpu: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  ram: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  os: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  displayResolution: PropTypes.string,
  battery: PropTypes.string,
  primaryCamera: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  dimentions: PropTypes.string,
  weight: PropTypes.string,
};

export default ProductDescription; 