import React from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon/index';
import State from './State';

const styles = {
  container: {
    width: '100%',
    height: '2em',
    backgroundColor: 'hsl(0, 0%, 30%)',
    color: 'hsl(0, 0%, 90%)',
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
};

export const ProgressSelector = (props) => {
  const { classes, onStateChange } = props;

  return (
    <React.Fragment>
      <section className={classes.container}>
        <span className={classes.breadCrumbs}>
          Admin Panel
        </span>
        <Icon>chevron_right</Icon>
        <span className={classes.breadCrumbs} onClick={onStateChange(State.menu)}>
          Selection
        </span>
        <Icon>chevron_right</Icon>
        <span className={classes.breadCrumbs} onClick={onStateChange(State.voting)}>
          Voting
        </span>
        <Icon>chevron_right</Icon>
        <span className={classes.breadCrumbs} onClick={onStateChange(State.summary)}>
          Summary
        </span>
      </section>
    </React.Fragment>
  );
};

ProgressSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  onStateChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProgressSelector);
