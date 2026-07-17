# Event Planner App 

## Overview

Each task includes:
- **Description** — what needs to be done
- **Implementation notes** — technical guidance and key details
- **Acceptance criteria** — how to verify the task is complete

The structure follows the original delivery order:
- left sidebar
- top header with navigation and view switcher
- main calendar area
- login and register screens
- event CRUD
- mini calendar and upcoming events
- optional drag-and-drop and resize as bonus features

Backend integration timeline:
- **Week 1** — API contract alignment
- **Week 2** — `GET /events` with static data
- **Week 3** — full event CRUD
- **Week 4** — filtering or sorting
- **Week 5** — authentication endpoints

---

# Week 1 — Setup, Layout, and API Contract Alignment

## Part 1 — Project Initialization and Base Setup

### Task 1 — Initialize the project
**Description**  
Create the frontend project using Vite, React, and TypeScript, and remove unnecessary starter content.

**Implementation notes**  
- Create a new Vite project with the React + TypeScript template.
- Remove demo assets, unused styles, and sample components.
- Keep the initial entry structure minimal and clean.
- Confirm the app starts successfully before adding more tools.

**Acceptance criteria**  
- Project is created successfully.
- Starter boilerplate is removed.
- Development server runs without errors.
- No unused starter components remain.

### Task 2 — Install core dependencies
**Description**  
Install the main libraries required for routing, styling, forms, validation, data fetching, and state management.

**Implementation notes**  
- Install React Router for navigation.
- Install Tailwind CSS for styling.
- Install Radix UI for accessible primitives.
- Install React Hook Form and Zod for form handling and validation.
- Install TanStack Query for server state.
- Install Zustand for shared client state if needed.
- Install ESLint and Prettier for code quality.

**Acceptance criteria**  
- All required libraries are installed.
- No package installation errors remain.
- The app still runs after dependency installation.

### Task 3 — Configure project tooling
**Description**  
Configure the base development tools so the project has a stable technical foundation.

**Implementation notes**  
- Configure Tailwind and ensure utility classes compile correctly.
- Configure ESLint rules and Prettier formatting.
- Add any TypeScript path aliases 
- Verify formatting and linting can run locally.

**Acceptance criteria**  
- Tailwind classes work in the app.
- ESLint runs without configuration issues.
- Prettier formats files correctly.
- TypeScript compiles without configuration errors.

### Task 4 — Create the project structure
**Description**  
Prepare the folder structure that will support feature development during the internship.

**Implementation notes**  
- Create folders such as `assets`, `components`, `pages`, `routes`, `services`, `schemas`, `store`, `types`, and `utils`.
- Keep naming consistent and future-proof.
- Avoid deeply nesting folders too early.

**Acceptance criteria**  
- Folder structure exists and matches project conventions.
- Files are organized logically.
- Team members can identify where new code should go.

### Task 5 — Create the initial pages and routes
**Description**  
Set up the route-level pages and the base navigation structure.

**Implementation notes**  
- Create `LoginPage`, `RegisterPage`, and `CalendarPage`.
- Configure routes for `/login`, `/register`, and `/calendar`.
- Wrap the app with Router and Query providers.
- Add minimal placeholder content to confirm navigation works.

**Acceptance criteria**  
- Routes are accessible.
- Navigation between pages works.
- No route errors appear in the console.
- App providers are configured correctly.

## Part 2 — Dashboard Layout and Static UI Foundation

### Task 1 — Build the main dashboard shell
**Description**  
Create the  page layout using a sidebar, header, and main content area.

**Implementation notes**  
- Use a three-part layout structure.
- Keep the layout readable on standard desktop widths.
- Focus on spacing and proportions before interactivity.

**Acceptance criteria**  
- Sidebar, header, and main area are visible.
- Layout proportions resemble the reference design.
- Main regions are clearly separated.

### Task 2 — Create the left sidebar
**Description**  
Build the sidebar container and its static sections.

**Implementation notes**  
- Add a branding or title area.
- Add a placeholder mini-calendar block.
- Add an upcoming events section with placeholder items.
- Keep the sidebar structure modular for later reuse.

**Acceptance criteria**  
- Sidebar includes a branding area.
- Placeholder mini calendar is present.
- Upcoming events section is visible.

### Task 3 — Create the top header
**Description**  
Build the header section with placeholder navigation controls and view-switching controls.

**Implementation notes**  
- Add previous, next, and today buttons.
- Add Day, Week, and Month switcher buttons.
- Add a placeholder search field if it exists in the reference layout.
- Focus on layout, not functionality yet.

**Acceptance criteria**  
- Header contains all expected controls.
- Controls are aligned and visually readable.
- Layout resembles the reference design.

### Task 4 — Create the static calendar container
**Description**  
Add the main calendar content block using static placeholders.

**Implementation notes**  
- Use boxes, borders, and spacing to resemble the future calendar area.
- Keep enough visual structure so the app already feels like a calendar dashboard.
- Use reusable layout components where helpful.

**Acceptance criteria**  
- Main calendar area is clearly visible.
- Spacing and borders are consistent.
- Static layout provides a good base for Week 2.

---

# Week 2 — Calendar Navigation, Views, and Initial API Integration

## Part 1 — Calendar State and Header Interaction

### Task 1 — Define calendar state
**Description**  
Create the state required to manage the current date and selected view.

**Implementation notes**  
- Add state for the current date.
- Add state for the selected view: `day`, `week`, or `month`.
- Decide whether this state belongs in component state or a shared store.

**Acceptance criteria**  
- Date state exists.
- View state exists.
- State location is documented and consistent.

### Task 2 — Implement header button behavior
**Description**  
Make the previous, next, and today buttons update calendar state correctly.

**Implementation notes**  
- Previous should move by one day, one week, or one month depending on view.
- Next should mirror that logic.
- Today should reset to the real current date.
- Keep the logic centralized in utility or helper functions where possible.

**Acceptance criteria**  
- Previous updates the visible date range correctly.
- Next updates the visible date range correctly.
- Today resets the calendar state to the current date.

### Task 3 — Implement the view switcher
**Description**  
Allow users to switch between day, week, and month views.

**Implementation notes**  
- Connect the view buttons to the selected view state.
- Add active styles to the selected button.
- Keep the switcher ready to control conditional rendering in the next part.

**Acceptance criteria**  
- Clicking a view button updates the selected view.
- Active styling is visible.
- Only one view is active at a time.

### Task 4 — Build date utility helpers
**Description**  
Create reusable utilities for date calculations and formatting.

**Implementation notes**  
- Add helpers for formatting labels.
- Add helpers for start and end of week.
- Add helpers for generating current week dates.
- Add helpers for generating month grids.
- Prefer pure functions that are easy to test.

**Acceptance criteria**  
- Utility functions support current view calculations.
- Header labels render correctly.
- Functions are reusable across views.

### Task 5 — Connect the first events endpoint
**Description**  
Set up the first backend integration using `GET /events`.

**Implementation notes**  
- Create an event service function.
- Configure TanStack Query for event fetching.
- Verify the response shape matches the agreed contract.
- Start with static or seed backend data.

**Acceptance criteria**  
- `GET /events` returns data in the frontend.
- Query integration works without runtime errors.
- Event response shape is confirmed.

## Part 2 — Build Week 

### Task 1 — Build the Week View structure
**Description**  
Create the week view using one column per day and a time column on the left.

**Implementation notes**  
- Generate seven visible day columns.
- Add hourly or half-hour rows.
- Render time labels in a separate reusable column.
- Highlight the current day.

**Acceptance criteria**  
- Week view shows 7 day columns.
- Time labels are visible.
- Current day can be distinguished visually.

### [SKIP] Task 2 — Build the Day View structure
**Description**  
Create the day view by adapting the week view into a single-day layout.

**Implementation notes**  
- Reuse shared grid logic from the week view.
- Keep time labels aligned.
- Preserve visual consistency across views.

**Acceptance criteria**  
- Day view shows one visible day.
- Time slots are displayed correctly.
- Shared logic is reused where practical.

### [SKIP] Task 3 — Build the Month View structure
**Description**  
Create the month grid using full weeks and a 7-column layout.

**Implementation notes**  
- Render a complete month grid.
- Include leading and trailing days if necessary.
- Ensure date labels align to the selected month.

**Acceptance criteria**  
- Month view shows a complete calendar grid.
- Layout uses 7 columns.
- Date cells match the selected month.

### [SKIP] Task 4 — Connect view rendering to state
**Description**  
Use the selected calendar state to render the correct calendar view.

**Implementation notes**  
- Conditionally render `DayGrid`, `WeekGrid`, or `MonthGrid`.
- Keep shared props consistent.
- Ensure labels update correctly when switching views.

**Acceptance criteria**  
- Switching the view updates the rendered calendar.
- Date labels remain accurate.
- No stale state appears after switching.

---

# Week 3 — Events, Sidebar, and Event CRUD Integration

## Part 1 — Event Model, Calendar Rendering, and CRUD Integration

### Task 1 — Confirm and apply the event model
**Description**  
Ensure the frontend uses the backend event shape as the source of truth.

**Implementation notes**  
- Confirm required event fields such as `id`, `title`, `description`, `category`, `start`, `end`, and `color`.
- Remove unnecessary local mocks.
- Normalize date parsing if needed.

**Acceptance criteria**  
- Event type is confirmed.
- Backend event data is the main source.
- Local mock reliance is minimized.

### Task 2 — Fetch and manage event data
**Description**  
Use TanStack Query to fetch event data for the calendar.

**Implementation notes**  
- Add query hooks for events.
- Handle loading and empty states lightly if needed.
- Keep query keys predictable for later invalidation.

**Acceptance criteria**  
- Event data loads successfully.
- Query state is stable.
- Event data is available to calendar views.

### Task 3 — Create the EventCard component
**Description**  
Build the reusable visual representation of an event.

**Implementation notes**  
- Display title, time range, and color indication.
- Keep styling compact and readable.
- Make the component reusable across views if possible.

**Acceptance criteria**  
- Event cards render correctly.
- Required event information is visible.
- Cards are reusable and easy to style.

### Task 4 — Render events in the Week views
**Description**  
Place each event in the correct time and date position inside the calendar.

**Implementation notes**  
- Filter events by visible date range.
- Compute the target day column from the event date.
- Compute vertical placement from the start time.
- Compute height from event duration.

**Acceptance criteria**  
- Events appear in the correct day column.
- Vertical position reflects start time.
- Height reflects duration.

### Task 5 — Implement create, update, and delete services
**Description**  
Connect the frontend to the backend CRUD endpoints.

**Implementation notes**  
- Add `POST /events`, `PUT /events/:id`, and `DELETE /events/:id` service functions.
- Use mutation hooks.
- Invalidate or refresh relevant event queries after changes.

**Acceptance criteria**  
- Create request works.
- Update request works.
- Delete request works.
- Calendar refreshes after each mutation.

### Task 6 — Build the Add Event flow
**Description**  
Allow users to create new events through a form.

**Implementation notes**  
- Build a basic form with required fields.
- Map form values to `EventPayload`.
- Validate obvious required values.

**Acceptance criteria**  
- User can submit a new event.
- Created event appears after refresh or invalidation.
- Payload shape matches backend expectations.

### Task 7 — Build the Edit and Delete flow
**Description**  
Allow users to update and remove existing events.

**Implementation notes**  
- Populate the edit form from an existing event.
- Connect delete actions to the backend.
- Keep the UI state synchronized after changes.

**Acceptance criteria**  
- Existing events can be edited.
- Existing events can be deleted.
- UI updates correctly after changes.

## Part 2 — Sidebar: Upcoming Events and Mini Calendar

### Task 1 — Build the upcoming events list
**Description**  
Create the sidebar list that shows future events in a useful order.

**Implementation notes**  
- Sort events chronologically.
- Group them into Today, Tomorrow, and Upcoming.
- Build a reusable sidebar item component.

**Acceptance criteria**  
- Events are grouped correctly.
- Events are ordered chronologically.
- Sidebar items show title, date/time, and color.

### Task 2 — Build the mini calendar
**Description**  
Create the compact monthly calendar displayed in the sidebar.

**Implementation notes**  
- Render a small month grid.
- Highlight the current date.
- Highlight the selected date.
- Keep it visually compact and readable.

**Acceptance criteria**  
- Mini calendar shows the current month.
- Current and selected date states are visible.
- Grid is readable and aligned.

### Task 3 — Synchronize sidebar and main calendar state
**Description**  
Ensure the mini calendar and main calendar stay connected.

**Implementation notes**  
- Clicking a mini calendar date should update the main calendar date.
- Changing the main view date should update sidebar selection.
- Ensure event CRUD updates both calendar and sidebar views.

**Acceptance criteria**  
- Mini calendar click updates the main calendar.
- Main calendar changes update sidebar selection.
- Sidebar reflects created, updated, and deleted events.

---

# Week 4 — Filtering, Sorting, and Calendar Data Refinement

## Part 1 — Frontend Filtering, Sorting, and View-Based Data Handling

### Task 1 — Review filtering and sorting behavior
**Description**  
Confirm which filtering and sorting responsibilities belong to the backend and which remain in the frontend.

**Implementation notes**  
- Review backend support for query parameters or sorted responses.
- Decide on a consistent responsibility split.
- Document any assumptions.

**Acceptance criteria**  
- Team agrees on filtering strategy.
- Event request behavior is clearly defined.

### Task 2 — Update event fetching for visible ranges
**Description**  
Request only the event data needed for the active view when appropriate.

**Implementation notes**  
- Support date-range query parameters if the backend accepts them.
- Keep event requests aligned with the visible day, week, or month.
- Avoid duplicating filtering logic in too many places.

**Acceptance criteria**  
- Active view shows relevant events only.
- Event fetching remains predictable.
- Date-range behavior is consistent.

### Task 3 — Refactor repeated date logic
**Description**  
Move duplicated filtering and sorting logic into utilities or shared helpers.

**Implementation notes**  
- Extract repeated date comparisons.
- Extract reusable event-sorting helpers.
- Keep view-level components focused on rendering.

**Acceptance criteria**  
- Repeated date logic is reduced.
- Helpers are reused across views and sidebar.
- Code is easier to maintain.

### Task 4 — Improve empty states and consistency
**Description**  
Ensure the UI behaves cleanly when no events are available for the selected range.

**Implementation notes**  
- Add empty-state messaging to calendar views.
- Add empty-state messaging to sidebar sections if needed.
- Re-test synchronization after filtering changes.

**Acceptance criteria**  
- Empty states appear when appropriate.
- No broken UI appears when event lists are empty.
- Sidebar and main calendar remain synchronized.

## Part 2 — Event Form Refinement and UX Improvements

### Task 1 — Improve form layout and clarity
**Description**  
Refine the Add/Edit event form so it is easier to understand and use.

**Implementation notes**  
- Group related fields together.
- Improve labels and spacing.
- Make date and time inputs easier to read.

**Acceptance criteria**  
- Form layout is clearer.
- Labels are understandable.
- Inputs are easy to use.

### Task 2 — Ensure payload consistency
**Description**  
Verify that form output matches backend expectations exactly.

**Implementation notes**  
- Confirm category values match the backend contract.
- Add color selection if required.
- Re-check payload formatting before submit.

**Acceptance criteria**  
- Submitted data matches backend format.
- No category mismatches remain.
- Color values are handled correctly.

### Task 3 — Improve mutation feedback
**Description**  
Make create, update, and delete actions more understandable for users.

**Implementation notes**  
- Add visible success feedback.
- Add clear error feedback.
- Reset forms correctly after submit or cancel.

**Acceptance criteria**  
- Success messages are visible.
- Error messages are visible.
- Form reset behavior is stable.

---

# Week 5 — Authentication Integration

## Part 1 — Login and Register API Integration

### Task 1 — Create auth service functions
**Description**  
Connect the frontend authentication pages to the backend authentication endpoints.

**Implementation notes**  
- Add service functions for `POST /auth/login`, `POST /auth/register`, and `GET /auth/me`.
- Keep auth response typing explicit.
- Handle token extraction consistently.

**Acceptance criteria**  
- Auth service functions exist.
- Auth responses are typed correctly.
- No endpoint mapping confusion remains.

### Task 2 — Implement login and register flows
**Description**  
Connect the forms to the backend and handle success and failure states.

**Implementation notes**  
- Wire the login form to the login endpoint.
- Wire the register form to the register endpoint.
- Show clear feedback for invalid credentials or registration errors.

**Acceptance criteria**  
- User can log in.
- User can register.
- Failed requests show clear feedback.

### Task 3 — Store and restore authentication state
**Description**  
Persist the user session and restore it on refresh.

**Implementation notes**  
- Store the token after successful login.
- Store or derive the current user.
- Call `GET /auth/me` on app reload to restore the session.

**Acceptance criteria**  
- Token is stored after login.
- Session can be restored on refresh.
- Current user state is available.

### Task 4 — Protect application routes
**Description**  
Restrict access to calendar functionality unless the user is authenticated.

**Implementation notes**  
- Redirect unauthenticated users away from protected pages.
- Redirect authenticated users to the calendar after login.
- Add a route guard or protected layout wrapper.

**Acceptance criteria**  
- Protected routes are not accessible without authentication.
- Successful login redirects correctly.
- Auth flow is consistent across refreshes.

## Part 2 — Auth-Aware Event Loading and User Flow

### Task 1 — Add auth-aware event requests
**Description**  
Ensure event requests include authentication where required.

**Implementation notes**  
- Attach the auth token to event requests.
- Centralize request configuration if possible.
- Re-test all event endpoints after auth is added.

**Acceptance criteria**  
- Authenticated users can load events.
- Unauthorized users cannot access protected event data.
- CRUD requests still work.

### Task 2 — Validate the full authenticated flow
**Description**  
Test the complete user path from authentication into the calendar dashboard.

**Implementation notes**  
- Test login, route access, event loading, and event CRUD.
- Test logout if implemented.
- Check that calendar/sidebar synchronization still holds.

**Acceptance criteria**  
- Full login-to-dashboard flow works.
- CRUD remains stable after auth integration.
- Session-aware routing behaves correctly.

### Task 3 — Improve loading and session fallback states
**Description**  
Handle cases where authentication is still loading, missing, or expired.

**Implementation notes**  
- Show a loading state while auth status is being checked.
- Show fallback UI when the session is invalid or missing.
- Avoid flashing protected content before auth resolves.

**Acceptance criteria**  
- Auth loading state appears when needed.
- Expired or missing sessions are handled gracefully.
- Protected content is not briefly exposed.

---

# Bonus Week 6 — Finalization, Testing, and Submission

## Part 1 — UI Completion, Error Handling, and Consistency

### Task 1 — Review all implemented screens
**Description**  
Audit the app screens and verify visual and structural consistency.

**Implementation notes**  
- Review Login, Register, Calendar Dashboard, and Event Form/Modal.
- Compare layout and spacing against the reference design.
- Check active states, readability, and alignment.

**Acceptance criteria**  
- All main screens are complete.
- Visual consistency is improved.
- No major layout issues remain.

### Task 2 — Improve validation and error handling
**Description**  
Adapt the frontend to the backend’s final validation and error response behavior.

**Implementation notes**  
- Surface backend validation errors inside forms.
- Add or improve request error states.
- Keep messages understandable and close to the relevant input or action.

**Acceptance criteria**  
- Validation messages appear correctly.
- Request failures are visible in the UI.
- Error handling is consistent across forms and data requests.

### Task 3 — Improve loading and empty states
**Description**  
Ensure the app behaves cleanly while loading data and when no data exists.

**Implementation notes**  
- Add loading states to screens with API activity.
- Add empty-state messages for calendar and sidebar sections.
- Check that states do not conflict with one another.

**Acceptance criteria**  
- Loading indicators appear where needed.
- Empty states appear where needed.
- UI remains understandable in all major states.

### Task 4 — Refactor and clean up the codebase
**Description**  
Reduce duplication and improve maintainability before final delivery.

**Implementation notes**  
- Refactor repeated logic.
- Clean up component naming.
- Simplify complex sections where possible.

**Acceptance criteria**  
- Duplicated logic is reduced.
- File naming is more consistent.
- Project structure feels cleaner.

## Part 2 — Final Testing, Bug Fixing, and Submission Preparation

### Task 1 — Test the full user flow
**Description**  
Verify the complete project flow from registration to event management.

**Implementation notes**  
- Test register, login, dashboard access, create event, edit event, delete event, and refresh behavior.
- Test calendar and sidebar updates after each action.

**Acceptance criteria**  
- Core user flow works without major issues.
- Event changes remain visible after refresh.
- Calendar and sidebar stay synchronized.

### Task 2 — Test all calendar views and navigation
**Description**  
Verify date navigation and view switching across the entire calendar.

**Implementation notes**  
- Test Day, Week, and Month views.
- Test Previous, Next, and Today buttons.
- Check edge cases around month boundaries.

**Acceptance criteria**  
- All views render correctly.
- Navigation behaves correctly.
- No major date calculation bugs remain.

### Task 3 — Test invalid and failing scenarios
**Description**  
Ensure the app behaves correctly when user input or backend behavior is invalid.

**Implementation notes**  
- Test invalid form inputs.
- Test backend validation failures.
- Test failed API responses.

**Acceptance criteria**  
- Invalid input is handled visibly.
- API failures are handled visibly.
- App remains stable after errors.

### Task 4 — Prepare the project for submission
**Description**  
Finalize documentation and remove unnecessary development leftovers.

**Implementation notes**  
- Remove dead code, unused files, and debug logs.
- Ensure formatting is consistent.
- Prepare a README with project description, setup steps, tech stack, and scripts.

**Acceptance criteria**  
- Repository is clean.
- README is complete.
- Project is ready for submission.

---

# Bonus Week — Advanced Calendar Interactions

## Part 1 — Drag-and-Drop Interaction

### Task 1 — Set up drag-and-drop support
**Description**  
Prepare the calendar for direct event movement inside Day and Week views.

**Implementation notes**  
- Choose a drag-and-drop library such as `dnd-kit`.
- Identify which calendar areas should be draggable and droppable.
- Keep the first implementation limited and reliable.

**Acceptance criteria**  
- Drag-and-drop library is integrated.
- Calendar accepts draggable event cards.
- Droppable areas are identified correctly.

### Task 2 — Update event timing from drag actions
**Description**  
Translate drop position into updated event date and time values.

**Implementation notes**  
- Compute the new day and time from the drop target.
- Update the event locally for immediate UI feedback.
- Persist the change with the backend.

**Acceptance criteria**  
- Dragging changes the event position visually.
- Updated start and end times are computed correctly.
- Changes persist after refresh.

### Task 3 — Re-test synchronization after movement
**Description**  
Verify that moved events stay correct everywhere in the application.

**Implementation notes**  
- Re-test main calendar rendering.
- Re-test sidebar ordering and grouping.
- Check movement across days as well as within one day.

**Acceptance criteria**  
- Sidebar reflects moved events correctly.
- Main calendar stays accurate after movement.
- No stale event positions remain.

## Part 2 — Resize Interaction

### Task 1 — Add resize handles to event cards
**Description**  
Allow events to be resized to change their duration.

**Implementation notes**  
- Add handles to the bottom, or both top and bottom if desired.
- Keep the resize interaction visually clear.
- Prevent obviously invalid resize states.

**Acceptance criteria**  
- Resize handles are visible.
- Resize interaction is usable.
- Invalid resize behavior is controlled.

### Task 2 — Update duration from resize actions
**Description**  
Convert resize movement into updated event duration values.

**Implementation notes**  
- Compute the new end time, and start time if top-resize is supported.
- Update the UI while resizing.
- Persist the new duration through the backend.

**Acceptance criteria**  
- Resizing changes duration visually.
- New timing is saved correctly.
- Changes remain after refresh.

### Task 3 — Re-test event rendering and sidebar updates
**Description**  
Verify that resized events stay accurate in all parts of the app.

**Implementation notes**  
- Re-check calendar placement after resize.
- Re-check sidebar event timing and ordering.
- Confirm no layout regressions appear.

**Acceptance criteria**  
- Calendar reflects updated durations correctly.
- Sidebar reflects updated times correctly.
- No rendering bugs appear after resize.

---

# Final Requirements

Interns must deliver:
- React frontend
- Backend API integration
- Day, Week, and Month calendar views
- Event CRUD
- Sidebar with mini calendar and upcoming events
- Authentication integration
- Final testing and project documentation

Optional bonus:
- Drag-and-drop
- Resize functionality


# Evaluation Criteria

## Core
- Layout implementation
- Calendar functionality
- Event rendering
- CRUD operations
- Backend integration
- Authentication integration
- Testing quality

## Advanced
- Sidebar synchronization
- Code quality
- Drag-and-drop
- Resize interaction


# Important Notes

- Follow the implementation order strictly.
- Do not skip foundational tasks.
- Prioritize functionality before polish.
- Leave advanced interaction features for the end.
- Keep the structure close to the reference design.


# Optional Future Improvements

- Event filtering UI
- Search
- Dark mode

