import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import SmartAssistant from '../components/SmartAssistant';
import { AppContext } from '../context/AppContext';

// Mock framer-motion to avoid animation issues in jsdom
vi.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef(({ children, ...props }, ref) => {
        // Filter out motion-specific props
        const { initial, animate, exit, transition, ...validProps } = props;
        return <div ref={ref} {...validProps}>{children}</div>;
      }),
    },
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});

// Mock @google/genai
vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(() => {
      return {
        models: {
          generateContent: vi.fn().mockResolvedValue({
            text: "This is a mocked AI response."
          })
        }
      };
    })
  };
});

// Provide a mock context
const MockProvider = ({ children }) => (
  <AppContext.Provider value={{ language: 'en' }}>
    {children}
  </AppContext.Provider>
);

describe('SmartAssistant', () => {
  beforeEach(() => {
    // Set a dummy API key using localStorage directly
    localStorage.setItem('geminiApiKey', 'dummy-key');
  });

  it('renders the floating action button by default', () => {
    render(
      <MockProvider>
        <SmartAssistant />
      </MockProvider>
    );
    
    const fab = screen.getByLabelText('Open Smart Assistant');
    expect(fab).toBeInTheDocument();
  });

  it('opens the chat window when FAB is clicked', () => {
    render(
      <MockProvider>
        <SmartAssistant />
      </MockProvider>
    );
    
    const fab = screen.getByLabelText('Open Smart Assistant');
    fireEvent.click(fab);
    
    // The chat window should now be visible
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Election Assistant')).toBeInTheDocument();
  });

});
