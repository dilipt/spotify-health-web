import { shallow } from 'enzyme';
import React from 'react';
import { ClientSessionPage } from './ClientSessionPage';
import HealthIndicatorCard from '../heath-indicators/HealthIndicatorCard';

describe('SessionsPage component', () => {
  test('render page', () => {
    const wrapper = shallow(
      <ClientSessionPage classes={{ header: '', main: '' }} cards={[]} />,
    );
    expect(wrapper.find('header').text()).toContain('Client Session');
    expect(wrapper.find(HealthIndicatorCard).length).toBe(0);
  });

  test('can render indicators if card present', () => {
    const wrapper = shallow(
      <ClientSessionPage
        classes={{ header: '', main: '' }}
        cards={[{ indicator: 'a', textAwesome: 'awesome', textCrappy: 'crappy' }]}
      />,
    );

    expect(wrapper.find(HealthIndicatorCard).length).toBe(1);
  });
});
