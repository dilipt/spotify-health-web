import adminStoreReducer from './admin-store-reducer';
import adminStoreActions from './admin-store-actions';
import { ServerApi } from '../../api';

jest.mock('../../api');

describe('health indicator reducer', () => {
  test('initial state', () => {
    const action = { type: 'dummy action' };

    expect(adminStoreReducer(undefined, action)).toEqual({
      clients: {},
      voteTally: {},
      previousVotes: new Map(),
      session: {
        id: undefined,
        link: 'Retrieving...',
      },
    });
  });

  test('vote submitted', () => {
    const action = adminStoreActions.voteSubmitted({ indicator: 'indicate here', value: 'happy', client: 'user123' });

    const state = adminStoreReducer(undefined, action);
    expect(state.voteTally).toEqual({
      'indicate here': {
        indicator: 'indicate here',
        unhappyVotes: 0,
        neutralVotes: 0,
        happyVotes: 1,
      },
    });

    expect(state.previousVotes).toEqual(new Map([['user123 - indicate here', 'happy']]));
  });

  test('correctly identifies when client changes his vote', () => {
    const action1 = adminStoreActions.voteSubmitted({ indicator: 'indicate here', value: 'happy', client: 'user123' });
    const action2 = adminStoreActions.voteSubmitted({
      indicator: 'indicate here',
      value: 'neutral',
      client: 'user123',
    });

    const state = adminStoreReducer(adminStoreReducer(undefined, action1), action2);
    expect(state.voteTally).toEqual({
      'indicate here': {
        indicator: 'indicate here',
        unhappyVotes: 0,
        neutralVotes: 1,
        happyVotes: 0,
      },
    });

    expect(state.previousVotes).toEqual(new Map([['user123 - indicate here', 'neutral']]));
  });

  test('session registered', async () => {
    const dispatchSpy = jest.fn();
    ServerApi.createSession.mockImplementation(async () => ({
      sessionId: 'session id',
      indicators: [{ name: 'abc' }, { name: 'xyz' }],
    }));

    await (adminStoreActions.registerSession()(dispatchSpy));
    const reducerAction = dispatchSpy.mock.calls[0][0];

    expect(adminStoreReducer(undefined, reducerAction).session).toEqual({
      id: 'session id',
      link: 'http://localhost:/clients/welcome?session=session id',
    });

    expect(adminStoreReducer(undefined, reducerAction).voteTally).toEqual({
      abc: {
        indicator: 'abc',
        happyVotes: 0,
        neutralVotes: 0,
        unhappyVotes: 0,
      },
      xyz: {
        indicator: 'xyz',
        happyVotes: 0,
        neutralVotes: 0,
        unhappyVotes: 0,
      },
    });
  });
});
