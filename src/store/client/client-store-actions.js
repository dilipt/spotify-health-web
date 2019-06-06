import { ServerApi, SocketApi } from '../../api';
import store from '..';

const displayHealthIndicator = ({ indicator, textAwesome, textCrap }) => ({
  type: 'SHOW_HEALTH_INDICATOR',
  indicator,
  textAwesome,
  textCrap,
});

const submitVote = ({ indicator, vote }) => (dispatch) => {
  const sessionId = store.getState().clientStoreReducer.session.id;
  const clientId = store.getState().clientStoreReducer.client.id;
  SocketApi.submitVote(sessionId, clientId, { indicator, vote });
  dispatch({
    type: 'SUBMIT_VOTE_DONE',
    indicator,
    vote,
  });
};

const registerClientToSession = sessionId => async (dispatch) => {
  const client = await ServerApi.registerClient(sessionId);
  SocketApi.initSocket(sessionId);
  dispatch({
    type: 'CLIENT_REGISTERED',
    sessionId,
    clientId: client.id,
  });
};

const retrieveHealthIndicators = sessionId => async (dispatch) => {
  // TODO: handle incorrect session ID
  const indicators = await ServerApi.retrieveHealthIndicators(sessionId);
  dispatch({
    type: 'SHOW_INDICATORS',
    indicators,
  });
};

export default {
  displayHealthIndicator,
  submitVote,
  registerClientToSession,
  retrieveHealthIndicators,
};
