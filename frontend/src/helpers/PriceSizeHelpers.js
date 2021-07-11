import {
  SIZE_LARGE_PRICE,
  SIZE_MEDIUM_PRICE,
  SIZE_SMALL_PRICE,
} from "../constants/priceConstants";

/**
 * Determine the price of the product based on the size ordered.
 * @param {*} size
 * @returns price of the product
 */
export const determinePrice = (size) => {
  let price = 0;
  switch (size) {
    case "sm":
      price = SIZE_SMALL_PRICE;
      break;
    case "med":
      price = SIZE_MEDIUM_PRICE;
      break;
    case "lg":
      price = SIZE_LARGE_PRICE;
      break;
    default:
      console.error("invalid size");
  }

  return price;
};

/**
 * Determine the size of ordered based on the price
 * @param {*} price
 * @returns size of the product user ordered
 */
export const determineSize = (price) => {
  let size = "";

  switch (price) {
    case SIZE_SMALL_PRICE:
      size = "sm";
      break;
    case SIZE_MEDIUM_PRICE:
      size = "med";
      break;
    case SIZE_LARGE_PRICE:
      size = "lg";
      break;
    default:
      console.error("invalid price");
  }

  return size;
};

/**
 * Function add an ending zero to calculated price after rounding
 * @param {*} num
 * @returns
 */
export const addZeroAtEnd = (price) => {
  return (Math.round(price * 100) / 100).toFixed(2);
};
