import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Icon } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Theme from '../../Theme';

const styles = makeStyles({
  container: {
    height: '36px',
    backgroundColor: Theme.BLACK,
    color: Theme.WHITE,
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '1vw',
  },
  breadCrumbs: {
    display: 'inline-block',
    fontWeight: 500,
  },
  active: {
    color: Theme.BLUE,
  },
  userContainer: {
    marginRight: '10px',
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
});

export const Breadcrumb = ({ location }) => {
  const classes = styles();
  const username = useSelector(state => state.clientStoreReducer.username);

  const isActive = (name) => {
    if (location.includes(name)) {
      return [classes.breadCrumbs, classes.active].join(' ');
    }
    return classes.breadCrumbs;
  };

  const showLogin = () => {
    if (username) {
      return (
        <div className={classes.userContainer}>
          <Icon>account_circle</Icon>
          &nbsp;
          <span className={classes.breadCrumbs}>{username}</span>
        </div>
      );
    }
    return (<div />);
  };

  return (
    <section className={classes.container}>
      <span className={classes.breadCrumbs}>
        Member
      </span>
      <Icon>chevron_right</Icon>
      <span className={isActive('welcome')}>
        Welcome
      </span>
      <Icon>chevron_right</Icon>
      <span className={isActive('voting')}>
        Voting
      </span>
      <Icon>chevron_right</Icon>
      <span className={isActive('summary')}>
        Summary
      </span>
      {showLogin()}
    </section>
  );
};

Breadcrumb.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Breadcrumb;
