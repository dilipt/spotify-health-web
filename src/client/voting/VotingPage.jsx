import React, { useEffect } from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import VotingHealthIndicatorCard from './components/VotingHealthIndicatorCard';
import { clientStoreActions } from '../../store/client';
import Theme from '../../Theme';

const styles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
    gridAutoRows: '420px',
    gridRowGap: Theme.SPACING,
    justifyItems: 'center',
    alignItems: 'center',
    marginBottom: 'auto',
  },
  progress: {
    color: Theme.BLUE,
  },
});

export const VotingPage = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const cards = useSelector(state => state.clientStoreReducer.cards);
  const session = useSelector(state => state.clientStoreReducer.session);

  useEffect(() => {
    dispatch(clientStoreActions.retrieveHealthIndicators({
      sessionId: session.id,
      passkey: session.passkey
    }));
  }, [dispatch, session]);

  const showCards = () => cards.map(card => (
    <VotingHealthIndicatorCard
      key={card.name}
      indicator={card.name}
      textAwesome={card.textAwesome}
      textCrap={card.textCrap}
    />
  ));

  return (
    <article className={classes.container}>
      {(() => {
        if (!cards || cards.length === 0) {
          return (<CircularProgress className={classes.progress} />);
        }
        return showCards();
      })()}
    </article>
  );
};

VotingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
};

export default VotingPage;
