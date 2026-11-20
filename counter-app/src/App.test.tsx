import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

function expectCount(value: number) {
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(`Count: ${value}`);
}

function click(label: 'Increment' | 'Decrement' | 'Reset') {
  fireEvent.click(screen.getByRole('button', { name: label }));
}

describe('Counter application: behavior and state transitions', () => {
  test('TC-001: initializes count at zero', () => {
    render(<App />);
    expectCount(0);
  });

  test('TC-002: increments once from zero', () => {
    render(<App />);
    click('Increment');
    expectCount(1);
  });

  test('TC-003: decrements once from zero', () => {
    render(<App />);
    click('Decrement');
    expectCount(-1);
  });

  test('TC-004: mixed multi-action sequence updates the same state', () => {
    render(<App />);
    click('Increment');
    click('Increment');
    click('Decrement');
    expectCount(1);
  });

  test('TC-005: decrementing twice allows negative values', () => {
    render(<App />);
    click('Decrement');
    click('Decrement');
    expectCount(-2);
  });

  test('TC-006: reset returns a positive count to zero', () => {
    render(<App />);
    click('Increment');
    click('Increment');
    click('Reset');
    expectCount(0);
  });

  test('TC-007: repeated reset keeps the counter at zero', () => {
    render(<App />);
    click('Reset');
    click('Reset');
    expectCount(0);
  });

  test('TC-008: reset from a negative count, then increment, behaves correctly', () => {
    render(<App />);
    click('Decrement');
    click('Reset');
    click('Increment');
    expectCount(1);
  });
});
