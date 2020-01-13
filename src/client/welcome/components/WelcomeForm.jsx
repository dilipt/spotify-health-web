import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import Theme from 'Theme';
import UserCache, { Account } from '../../mixin/user-cache';
import { clientStoreActions } from '../../../store/client';

const styles = makeStyles({
  section: {
    color: Theme.BLACK,
    boxSizing: 'border-box',
    padding: Theme.SPACING,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '60px auto 50px',
    gridTemplateAreas: `
      'blurb'
      'form'
      'actions'
    `,
    alignItems: 'center',
    height: '100%',
  },
  intro: {
    gridArea: 'blurb',
    textAlign: 'left',
  },
  sectionForm: {
    gridArea: 'form',
  },
  textField: {
    marginBottom: Theme.SPACING,
    width: '100%',
    fontSize: '0.9rem',
  },
  buttonContainer: {
    gridArea: 'actions',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: '100px',
    color: Theme.WHITE,
    backgroundColor: Theme.GREEN,
    '&:hover': {
      backgroundColor: Theme.GREEN_DARKER,
    },
    '& span': {
      fontWeight: 500,
    },
  },
});

const WelcomeForm = ({ forwardLink }) => {
  const classes = styles();
  const account = UserCache.getAccountDetails();
  const dispatch = useDispatch();
  const [firstName, updateFirstName] = useState(account.firstname);
  const [surname, updateSurname] = useState(account.surname);
  const [alias, updateAlias] = useState(account.alias);
  const [formSubmitted, updateFormSubmitted] = useState(false);

  const handleChange = update => (event) => {
    update(event.target.value);
  };

  const handleSubmit = async () => {
    const updatedAccount = new Account(firstName, surname, alias, account.id);
    UserCache.setAccountDetails(updatedAccount);

    dispatch(clientStoreActions.setUsername(updatedAccount.getUsername()));

    const sessionId = forwardLink.split('session=')[1];
    await dispatch(clientStoreActions.registerClientToSession({
      sessionId,
      username: updatedAccount.getUsername(),
    }));
    updateFormSubmitted(true);
  };

  return ((() => {
    if (formSubmitted) {
      return <Redirect to={`/clients/voting${forwardLink}`} />;
    }
    return (
      <section className={classes.section}>
        <div>
          <p className={classes.intro}>
            Welcome to your team’s health check. Before we
            get started please let your facilitator who you are. You may
            opt for an alias instead if you wish to remain anonymous.
          </p>
        </div>
        <form className={classes.sectionForm} noValidate>
          <TextField
            label="First Name"
            className={classes.textField}
            value={firstName || ''}
            onChange={handleChange(updateFirstName)}
            margin="normal"
          />
          <TextField
            label="Surname"
            className={classes.textField}
            value={surname || ''}
            onChange={handleChange(updateSurname)}
            margin="normal"
          />
          <span>OR</span>
          <TextField
            label="Alias (Optional)"
            className={classes.textField}
            value={alias || ''}
            onChange={handleChange(updateAlias)}
            margin="normal"
          />
        </form>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="contained"
            color="green"
            href="#"
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </div>
      </section>
    );
  })());
};

WelcomeForm.propTypes = {
  forwardLink: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default WelcomeForm;
