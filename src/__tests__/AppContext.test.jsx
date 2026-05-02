import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useContext } from 'react';
import { AppContext, AppProvider } from '../context/AppContext';

// A simple test component to consume the context
const TestComponent = () => {
  const { theme, toggleTheme, language, toggleLanguage, isFirstTimeVoter, setIsFirstTimeVoter } = useContext(AppContext);
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="language">{language}</span>
      <span data-testid="voter-status">{isFirstTimeVoter ? 'first-time' : 'experienced'}</span>
      <button onClick={toggleTheme} data-testid="toggle-theme">Toggle Theme</button>
      <button onClick={toggleLanguage} data-testid="toggle-language">Toggle Language</button>
      <button onClick={() => setIsFirstTimeVoter(true)} data-testid="set-first-time">Set First Time</button>
    </div>
  );
};

describe('AppContext', () => {
  it('provides default values correctly', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(screen.getByTestId('language')).toHaveTextContent('en');
    expect(screen.getByTestId('voter-status')).toHaveTextContent('experienced');
  });

  it('toggles theme correctly', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const button = screen.getByTestId('toggle-theme');
    fireEvent.click(button);
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    
    // Check if the html element got the attribute
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    
    fireEvent.click(button);
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('toggles language correctly', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const button = screen.getByTestId('toggle-language');
    fireEvent.click(button);
    expect(screen.getByTestId('language')).toHaveTextContent('es');
    fireEvent.click(button);
    expect(screen.getByTestId('language')).toHaveTextContent('en');
  });

  it('updates first time voter status', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const button = screen.getByTestId('set-first-time');
    fireEvent.click(button);
    expect(screen.getByTestId('voter-status')).toHaveTextContent('first-time');
  });
});
