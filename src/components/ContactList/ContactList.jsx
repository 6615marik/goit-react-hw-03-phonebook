import css from './ContactList.module.css';
import PropTypes from 'prop-types';
export const ContactList = ({ contacts, onRemove, children }) => {
  return (
    <div className={css.card}>
      {children}
      <ul className={css.list}>
        {contacts.length === 0 ? null : (
          <>
            {contacts.map(({ id, name, number }) => {
              return (
                <li key={id} className={css.iteam}>
                  <p>
                    <span>{name} : </span>
                    {number}
                  </p>
                  <button
                    className={css.btn}
                    onClick={() => {
                      onRemove(id);
                    }}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
};
ContactList.propTypes = {
  contact: PropTypes.arrayOf(PropTypes.string),
  onRemove: PropTypes.func,
  children: PropTypes.node,
};
