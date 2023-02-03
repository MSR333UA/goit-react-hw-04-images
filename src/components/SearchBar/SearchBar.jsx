import { useState } from 'react';
import { ImHipster } from 'react-icons/im';
import { SearchButton } from 'components/Button/Button.styled';

import {
  SearchForm,
  SearchHeader,
  SearchLabel,
  SearchInput,
} from './SearchBar.styled';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => {
  const [searchPhotos, setSearchPhotos] = useState('');
  // state = {
  //   searchPhotos: '',
  // };

  const handleChangeInput = e => {
    setSearchPhotos(e.target.value.toLowerCase());
  };
  // handleChangeInput = e => {
  //   //Відслідковує поле INPUT
  //   this.setState({ searchPhotos: e.target.value.toLowerCase() });
  // };
  //
  //

  const handleSubmit = e => {
    e.preventDefault();
    if (searchPhotos.trim() === '') {
      alert('🐷 Something went wrong!');
      return;
    }
    onSubmit(searchPhotos);
    reset();
  };
  const reset = () => {
    setSearchPhotos('');
  };
  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { searchPhotos } = this.state;
  //   if (searchPhotos.trim() === '') {
  //     alert('🌞 Something went wrong!');
  //     return;
  //   }
  //   this.props.onSubmit(searchPhotos);
  //   this.reset();
  // };
  // reset = () => {
  //   this.setState({ searchPhotos: '' });
  // };

  return (
    <SearchHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchLabel>Search</SearchLabel>
          <ImHipster size="25px" />
        </SearchButton>

        <SearchInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeInput}
          value={searchPhotos}
        />
      </SearchForm>
    </SearchHeader>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
