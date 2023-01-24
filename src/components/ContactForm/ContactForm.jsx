import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  state = INITIAL_STATE;

  handleChangeForm = ({ target }) => {
    // console.log(target);
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    const { onAdd } = this.props;

    const isValidatedForm = this.validateForm();

    if (!isValidatedForm) return;
    onAdd({ id: nanoid(), name, number });
    this.resetForm();
  };

  validateForm = () => {
    const { name, number } = this.state;
    const { onCheck } = this.props;
    if (!name || !number) {
      alert(`${name} is already in contacts`);
      return false;
    }
    return onCheck(name);
  };

  resetForm = () => this.setState(INITIAL_STATE);

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit} className={css.form}>
        <label className={css.input_label} htmlFor="name">
          {' '}
          Name
        </label>
        <input
          className={css.input_text}
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={this.handleChangeForm}
          placeholder="Alex"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label className={css.input_label} htmlFor="number">
          {' '}
          Number
        </label>
        <input
          className={css.input_text}
          type="tel"
          name="number"
          id="number"
          value={number}
          onChange={this.handleChangeForm}
          placeholder="+38 066 155 22 255"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={css.btn} type="submit" onClick={() => {}}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.proTypes = {
  onAdd: PropTypes.string.isRequired,
  onCheck: PropTypes.string.isRequired,
};
