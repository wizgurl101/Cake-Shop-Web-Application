import React from 'react';
import PropTypes from 'prop-types';

// TODO remove ts-ignore and refactor

/**
 * Rating component display 5-stars rating system
 * @param {*} param0
 * @returns
 */
// @ts-ignore
const Rating: React.FC = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span>
        <i style={{ color }} className={value >= 1 ? 'fas fa-star' : value >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
      </span>
      <span>
        <i style={{ color }} className={value >= 2 ? 'fas fa-star' : value >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
      </span>
      <span>
        <i style={{ color }} className={value >= 3 ? 'fas fa-star' : value >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
      </span>
      <span>
        <i style={{ color }} className={value >= 4 ? 'fas fa-star' : value >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
      </span>
      <span>
        <i style={{ color }} className={value >= 5 ? 'fas fa-star' : value >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
      </span>
      <span>{text ? text : ''}</span>
    </div>
  );
};

// set default color for star icon
Rating.defaultProps = { color: '#f8e825' };

// check data type for props variable
Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating;
