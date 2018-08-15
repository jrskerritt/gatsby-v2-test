import React from 'react';
import PropTypes from 'prop-types';
import BlogCard from './BlogCard';
import * as WordPressAPI from '../api/WordPressAPI';
import lazyLoadImages from '../lazyLoadImages';

export default class BlogContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    };
  }

  componentWillMount() {
    const { maxCards, blogCategory } = this.props;
    let url = 'https://www.payscale.com/career-news/wp-json/wp/v2/posts';

    if (blogCategory) {
      url += `?categories=${blogCategory}`;
    }

    WordPressAPI.getBlogPostInfo(blogCategory, url, maxCards)
      .then(cards => { this.setState({ cards }); });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.cards) {
      return;
    }

    if (this.state.cards.length > 0 && (!prevState.cards || prevState.cards.length === 0)) {
      const images = document.querySelectorAll('.blog-content img');
      lazyLoadImages(images);
    }
  }

  render() {
    const cards = this.state.cards ? this.state.cards.map((card, index) => (
      <BlogCard
        imageUrl={card.img}
        title={card.title}
        description={card.excerpt}
        url={card.url}
        key={index}
      />
    )) : null;

    return (
      <div className="blog-content">
        <h2 className="blog-content__title">Related Articles</h2>
        <div className="blog-content__cards">{cards}</div>
      </div>
    );
  }
}

BlogContent.propTypes = {
  blogCategory: PropTypes.number, 
  maxCards: PropTypes.number
};

BlogContent.defaultProps = {
  maxCards: 3
};