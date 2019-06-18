import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Button, Icon, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import CardText from './components/CardText';
import { clientStoreActions } from '../store/client';
import { SocketApi } from '../api';

const styles = makeStyles({
  indicatorCard: {
    width: '300px',
    height: '400px',
    padding: '1em',
    display: 'grid',
    gridTemplateRows: '15% 75% 15%',
    boxSizing: 'border-box',
  },
  indicatorTitle: {
    marginBottom: '0.75em',
  },
  descriptionText: {
    textAlign: 'left',
    padding: '0 0.5em',
    marginBottom: '0.5em',
  },
  buttonContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  activeUnhappy: {
    color: 'red !important',
  },
  activeNeutral: {
    color: 'orange !important',
  },
  activeHappy: {
    color: 'green !important',
  },
});

export const VotingHealthIndicatorCard = ({
  indicator, textAwesome, textCrap, sessionId, clientId,
}) => {
  const classes = styles();
  const [activeButton, setActiveButton] = useState(-1);

  const handleClick = (vote, button) => (e) => {
    e.preventDefault();
    setActiveButton(button);
    SocketApi.submitVote(sessionId, clientId, { indicator, vote });
  };

  return (
    <Paper className={classes.indicatorCard}>
      <header className={classes.indicatorTitle}>
        <Typography variant="h5"> {indicator} </Typography>
      </header>
      <section>
        <CardText text={textAwesome} variant="good" />
        <CardText text={textCrap} variant="bad" />
      </section>
      <footer className={classes.buttonContainer}>
        <Button className={activeButton === 0 ? classes.activeUnhappy : ''} onClick={handleClick('unhappy', 0)} href="#">
          <Icon>sentiment_very_dissatisfied</Icon>
        </Button>
        <Button className={activeButton === 1 ? classes.activeNeutral : ''} onClick={handleClick('neutral', 1)} href="#">
          <Icon>sentiment_neutral</Icon>
        </Button>
        <Button className={activeButton === 2 ? classes.activeHappy : ''} onClick={handleClick('happy', 2)} href="#">
          <Icon>sentiment_very_satisfied</Icon>
        </Button>
      </footer>
    </Paper>
  );
};

VotingHealthIndicatorCard.propTypes = {
  indicator: PropTypes.string.isRequired,
  textAwesome: PropTypes.string.isRequired,
  textCrap: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  sessionId: state.clientStoreReducer.session.id,
  clientId: state.clientStoreReducer.client.id,
});

export default connect(mapStateToProps)(VotingHealthIndicatorCard);