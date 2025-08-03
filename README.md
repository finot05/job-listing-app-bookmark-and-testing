# Final Task – Bookmark Functionality | Job Listing App
This project enhances a job listing application with a bookmark feature that allows users to save and manage job postings. The feature is implemented with proper user authentication, user feedback, and comprehensive unit and end-to-end testing using Jest and Cypress.

## Features Implemented
- Bookmark toggle button on each job card

- Bookmark and unbookmark functionality with API integration

- Bookmark actions restricted to authenticated users

- Visual feedback via toast notifications

- Unit & component tests using Jest

- End-to-end tests using Cypress


## Screenshots
* Job Listing Landing Page
Shows job listings with a Bookmarks navigation button and Bookmark toggle on each card.
<img width="700" alt="image" src="https://github.com/user-attachments/assets/32807b8a-b1dc-4a4a-9987-3d8a48df3d06" />

* Bookmark Add & Remove (Toaster Messages)
Success toast appears when the bookmark is added or removed.
<img width="700" alt="image" src="https://github.com/user-attachments/assets/5bc306f7-0f8c-4873-9984-f811e495198c" />
<img width="700" alt="image" src="https://github.com/user-attachments/assets/f77e5487-0266-459d-95ae-d0b65d1c0bce" />

* Error Toast (User Not Logged In)
Displays a red error toast when trying to bookmark while logged out.
<img width="700" alt="image" src="https://github.com/user-attachments/assets/268878ad-5f86-436e-8f67-18e77127cc94" />

* Bookmark Page Access Blocked (Not Authenticated)
Shows login button and message when trying to access the Bookmarks page while not logged in.
<img width="700" alt="image" src="https://github.com/user-attachments/assets/867160b5-4b15-46e9-b6d2-ba4af22dfd68" />

* Empty Bookmarks Page
If the user hasn't bookmarked anything yet.
<img width="700" alt="image" src="https://github.com/user-attachments/assets/19257549-78cd-45e6-b248-13f729742acd" />

* Bookmarks Page with Items
Displays all bookmarked jobs for the authenticated user.
<img width="700" alt="image" src="https://github.com/user-attachments/assets/d36e692d-89be-4334-9808-fdcaee6aed06" />

* Jest Unit Tests
All tests pass successfully, covering BookmarkButton, JobCard, and related logic.
<img width="700" alt="image" src="https://github.com/user-attachments/assets/df6de1b8-1bb1-4a4d-aa6d-d51111139288" />

* Cypress E2E Tests
Includes scenarios for bookmark toggling, login restriction, UI behavior, and more.
<img width="700" alt="image" src="https://github.com/user-attachments/assets/bacb20aa-55b2-446c-8ab0-a9b10223c2ee" />

## Testing Overview
✅ Jest Unit Testing
- BookmarkButton component logic
- JobCard rendering behavior
- Bookmark icon state toggle
- Mocking API responses

✅ Cypress E2E Testing
- Bookmarking and unbookmarking jobs
- Handling API status codes (200, 409)
- Verifying toast notifications
- Blocking unauthorized actions
- Checking bookmarks page rendering

## API Endpoints Used
Base URL: https://akil-backend.onrender.com/

Endpoint	            Method	  Description
<hr>
/bookmarks	           GET	    Get all bookmarks for a user
<hr>
/bookmarks/:eventID	   POST	    Add bookmark (Empty body)
<hr>
/bookmarks/:eventID	   DELETE	   Remove bookmark

⚠️ Note: When registering a new user, ensure the role is "user" (lowercase).

## How to Run Locally

1. Clone the repository
```bash
git clone https://github.com/finot05/job-listing-app-bookmark-and-testing.git
```
2. Navigate into the folder
```bash
cd job-listing-app-bookmark-and-testing
```
3. Install dependencies
```bash
npm install
```
4. Run the dev server
```bash
npm run dev
```
5. Run Cypress Tests
```bash
npx cypress open
```
