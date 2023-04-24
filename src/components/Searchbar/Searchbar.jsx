import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchHeader, Form, Button, Input } from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <SearchHeader>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit"></Button>

          <Input
            onChange={this.handleChange}
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
  }
}
export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
