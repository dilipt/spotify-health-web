/* eslint-disable max-len */
export const initialState = {
  indicatorVotes: {},
};

const adminStoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE_SUBMITTED': {
      const unhappyChange = action.value === 'unhappy' ? 1 : 0;
      const neutralChange = action.value === 'neutral' ? 1 : 0;
      const happyChange = action.value === 'happy' ? 1 : 0;

      const votes = state.indicatorVotes;
      return {
        ...state,
        indicatorVotes: Object.assign({}, votes, {
          [action.indicator]: {
            indicator: action.indicator,
            unhappyVotes: unhappyChange + (votes[action.indicator] ? votes[action.indicator].unhappyVotes : 0),
            neutralVotes: neutralChange + (votes[action.indicator] ? votes[action.indicator].neutralVotes : 0),
            happyVotes: happyChange + (votes[action.indicator] ? votes[action.indicator].happyVotes : 0),
          },
        }),
      };
    }
    default:
      console.log(`Unknown action: ${JSON.stringify(action)}`);
      return state;
  }
};

export default adminStoreReducer;