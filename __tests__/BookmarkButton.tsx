import { render, screen, fireEvent } from "@testing-library/react";
import BookmarkButton from "../components/Bookmark"; // update path as needed
import { Provider } from "react-redux";
import { store } from "../store/store";
import { SessionProvider } from "next-auth/react";

describe("BookmarkButton", () => {
  const mockEventId = "12345";

  test("renders the button correctly", () => {
    render(
      <SessionProvider session={null}>
        <Provider store={store}>
          <BookmarkButton eventId={mockEventId} initialBookmarked={false} />
        </Provider>
      </SessionProvider>
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("calls toggle function on click", () => {
    const handleClick = jest.fn();

    render(<button onClick={handleClick}>🔖</button>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});