// global.d.ts
import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R = void> {
      toBeInTheDocument(): R;
      toHaveBeenCalledTimes(expected: number): R;
      // Add other matchers if needed
    }
  }
}
