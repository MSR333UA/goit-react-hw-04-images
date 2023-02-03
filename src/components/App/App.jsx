import { useEffect, useState } from 'react';

// import { ToastContainer, toast } from 'react-toastify';
import { getImages } from '../../services/api';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { AppWrap } from './App.styled';
import { Button } from 'components/Button/Button';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [bigImage, setBigImage] = useState('');

  // state = {
  //   search: '',
  //   images: [],
  //   error: null,
  //   isLoading: false,
  //   page: 1,
  //   bigImage: '',
  // };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    // this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      // this.setState({ isLoading: true });
      try {
        const photos = await getImages(search, page);
        setImages(prevImages => [...prevImages, ...photos.data.hits]);
      } catch (error) {
        alert(`🐷 Something went wrong ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    if (search) loadImages();
  }, [page, search]);

  // componentDidUpdate(_, prevState) {
  //   if (
  //     prevState.page !== this.state.page ||
  //     prevState.search !== this.state.search
  //   ) {
  //     this.loadImages();
  //   }
  // }
  // const loadImages = async () => {
  //   setIsLoading(true);
  //   // this.setState({ isLoading: true });
  //   try {
  //     const photos = await getImages(this.state.search, this.state.page);
  //     this.setState({
  //       images: [...this.state.images, ...photos.data.hits],
  //     });
  //   } catch (error) {
  //     this.setState({ error });
  //     alert(`Something went wrong ${error}`);
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // };

  const toggleModal = largeImageURL => {
    setBigImage(largeImageURL || '');
  };
  // toggleModal = largeImageURL => {
  //   this.setState(({ showModal, bigImage }) => ({
  //     bigImage: largeImageURL,
  //   }));
  // };

  // const showModal = largeImageURL => {
  //   setBigImage(largeImageURL);
  // };

  // const closeModal = () => {
  //   setBigImage(null);
  // };

  const handleSubmit = async search => {
    setSearch(search);
    setPage(1);
    setImages([]);
    window.scrollTo({ top: 10, behavior: 'smooth' });
  };

  return (
    <AppWrap>
      <SearchBar onSubmit={handleSubmit} />

      {isLoading && <Loader />}

      {images && <ImageGallery images={images} onClick={toggleModal} />}
      {/* {console.log(bigImage)} */}
      {bigImage && <Modal img={bigImage} onClick={toggleModal} />}
      {images.length !== 0 && <Button nextPage={loadMore} />}
    </AppWrap>
  );
};
