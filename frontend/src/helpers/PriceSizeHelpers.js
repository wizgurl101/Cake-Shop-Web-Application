import {
  SIZE_LARGE_ABBREVIATION,
  SIZE_LARGE_PRICE,
  SIZE_MEDIUM_ABBREVIATION,
  SIZE_MEDIUM_PRICE,
  SIZE_SMALL_ABBREVIATION,
  SIZE_SMALL_PRICE,
} from "../constants/priceConstants";

/**
 * Determine the price of the product based on the size ordered.
 * @param {*} size
 * @returns price of the product
 */
export const determinePrice = (size) => {
  switch (size) {
    case SIZE_SMALL_ABBREVIATION:
      return SIZE_SMALL_PRICE;
    case SIZE_MEDIUM_ABBREVIATION:
      return SIZE_MEDIUM_PRICE;
    case SIZE_LARGE_ABBREVIATION:
      return SIZE_LARGE_PRICE;
    default:
      return 0;
  }
};

/**
 * Determine the size of ordered based on the price
 * @param {*} price
 * @returns size of the product user ordered
 */
export const determineSize = (price) => {
  switch (price) {
    case SIZE_SMALL_PRICE:
      return SIZE_SMALL_ABBREVIATION;
    case SIZE_MEDIUM_PRICE:
      return SIZE_MEDIUM_ABBREVIATION;
    case SIZE_LARGE_PRICE:
      return SIZE_LARGE_ABBREVIATION;
    default:
      return "";
  }
};

/**
 * Function add an ending zero to calculated price after rounding
 * @param {*} num
 * @returns
 */
export const addZeroAtEnd = (price) => {
  return (Math.round(price * 100) / 100).toFixed(2);
};
