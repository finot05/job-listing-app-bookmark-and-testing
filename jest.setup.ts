import '@testing-library/jest-dom';
import 'whatwg-fetch';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
}));

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: () => ({ data: null, status: "unauthenticated" }),
  getSession: jest.fn().mockResolvedValue(null),
}));
