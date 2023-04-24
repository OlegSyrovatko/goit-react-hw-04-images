import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { SearchHeader, Form, Button, Input } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchHeader>
      <Form onSubmit={handleSubmit}>
        <Button type="submit"></Button>

        <Input
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={query}
          required
        />
      </Form>
    </SearchHeader>
  );
};
export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
