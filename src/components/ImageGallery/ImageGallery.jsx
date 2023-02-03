import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryUl } from './ImageGallery.styled';
import PropTypes from 'prop-types';

import { useEffect, useRef } from 'react';

export const ImageGallery = ({ images, onClick }) => {
  const listRef = useRef(true);
  //  listRef = createRef();

  useEffect(() => {
    const count = listRef?.current.children?.length;
    if (count > 12) {
      scroll(listRef.current);
    }
  }, [images]);

  const scroll = elem => {
    const { height } = elem.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  };

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (snapshot) {
  //     window.scrollTo({ top: snapshot, behavior: 'smooth' });
  //   }
  // }
  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   if (prevProps.images.length < this.props.images.length) {
  //     const list = this.listRef.current;
  //     return list.scrollHeight - list.scrollTop;
  //   }
  //   return null;
  // }

  return (
    <ImageGalleryUl ref={listRef}>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            // ref={arr.length - 12 === id ? imagesItemRef : null}
            tags={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClickItem={() => {
              onClick(largeImageURL);
            }}
          />
        );
      })}
    </ImageGalleryUl>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
