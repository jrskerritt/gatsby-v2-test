import React from 'react';
import PropTypes from 'prop-types';

const BlogCard = props => (
  <div className="blog-content__card">
    <a href={props.url}>
      <img
        className="blog-content__card__image lazy"
        data-src={props.imageUrl}
        alt={props.title}
      />
      <div className="blog-content__card__desc">
        <span className="pxl-text-xs">ARTICLES</span>
        <div
          className="blog-content__card__title"
          dangerouslySetInnerHTML={{ __html: props.title }}
        />
        <div
          className="blog-content__card__excerpt pxl-text-xs"
          dangerouslySetInnerHTML={{ __html: props.description }}
        />
      </div>
    </a>
  </div>
);

BlogCard.propTypes = {
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string
};

BlogCard.defaultProps = {
  description: '',
  imageUrl: '',
  title: 'This is the Title',
  url: ''
};

export default BlogCard;
