import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../src/HomeScreen';

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Campus Connect: Posts')).toBeDefined();
  });

  it('navigates to the WelcomeScreen when there is no authenticated user', () => {
    const navigation = { reset: jest.fn() };
    const { getByText } = render(<HomeScreen navigation={navigation} />);

    const onAuthStateChanged = jest.fn().mockImplementationOnce(callback => {
      callback(null);
    });

    onAuthStateChanged.mockClear();
    React.useEffect.mockImplementationOnce(f => f());
    expect(onAuthStateChanged).toHaveBeenCalledTimes(1);

    expect(navigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'WelcomeScreen' }],
    });
  });

  it('displays the Sort button in the header', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Sort')).toBeDefined();
  });

  it('navigates to the PostsScreen when the Home drawer item is selected', async () => {
    const navigation = { navigate: jest.fn() };
    const { getByText } = render(<HomeScreen navigation={navigation} />);

    fireEvent.press(getByText('Home'));

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('PostsScreen');
    });
  });
});