# Requirements Document

## Introduction

The To-Do List Life Dashboard is a client-side web application built as a small student project. It displays a personalized greeting with the current date and time, a 25-minute focus timer, a to-do list with add, edit, complete, delete, and sort features, and quick-access buttons for favorite websites. All data is stored in the browser's Local Storage. The project uses plain HTML, a single CSS file, and a single vanilla JavaScript file with no frameworks, no backend, and no test setup.

## Glossary

- **Dashboard**: The main application interface.
- **Greeting**: The date, time, and time-of-day welcome message.
- **Focus_Timer**: The 25-minute countdown timer.
- **Task**: A single to-do item with a description and completion status.
- **Quick_Link**: A button that opens a favorite website in a new tab.
- **Local_Storage**: The browser's Web Storage API for client-side persistence.
- **Modern_Browser**: A current version of Chrome, Firefox, Edge, or Safari.

## Requirements

### Requirement 1: Greeting

**User Story:** As a user, I want to see the current date, time, and a time-of-day greeting, so that I have a welcome when I open the dashboard.

#### Acceptance Criteria

1. THE Dashboard SHALL display the current date and time in the Greeting.
2. WHILE the current time falls within a time-of-day period, THE Dashboard SHALL display the corresponding greeting: "Good morning" for 05:00 to 11:59, "Good afternoon" for 12:00 to 16:59, "Good evening" for 17:00 to 21:59, and "Good night" for 22:00 to 04:59.
3. WHILE the Dashboard is open, THE Dashboard SHALL update the displayed time automatically every second.

### Requirement 2: Custom Name in Greeting

**User Story:** As a user, I want to enter my name and have it appear in the greeting, so that the dashboard feels personalized to me.

#### Acceptance Criteria

1. WHEN a user enters a name, THE Dashboard SHALL display the name in the Greeting after the time-of-day greeting.
2. WHEN a user enters a name, THE Dashboard SHALL store the name in Local_Storage.
3. WHEN the Dashboard is loaded and Local_Storage contains a stored name, THE Dashboard SHALL display the stored name in the Greeting.

### Requirement 3: Focus Timer

**User Story:** As a user, I want a 25-minute focus timer, so that I can manage my work sessions.

#### Acceptance Criteria

1. THE Dashboard SHALL display a Focus_Timer set to 25 minutes.
2. WHEN a user clicks Start, THE Focus_Timer SHALL count down from 25 minutes to zero.
3. WHEN a user clicks Stop, THE Focus_Timer SHALL pause the countdown.
4. WHEN a user clicks Reset, THE Focus_Timer SHALL reset the countdown to 25 minutes.

### Requirement 4: To-Do List

**User Story:** As a user, I want to manage a to-do list, so that I can track the tasks I need to complete.

#### Acceptance Criteria

1. WHEN a user adds a Task, THE Dashboard SHALL store the Task in Local_Storage and display the Task in the list.
2. WHEN a user edits a Task, THE Dashboard SHALL update the Task in Local_Storage and display the updated Task.
3. WHEN a user marks a Task as complete, THE Dashboard SHALL update the completion status and display the Task with a completion indicator.
4. WHEN a user deletes a Task, THE Dashboard SHALL remove the Task from Local_Storage and from the displayed list.

### Requirement 5: Prevent Duplicate Tasks

**User Story:** As a user, I want to be warned when I add a duplicate task, so that I avoid task clutter.

#### Acceptance Criteria

1. WHEN a user adds a Task whose text matches an existing Task ignoring case, THEN THE Dashboard SHALL reject the Task and display a warning message.
2. THE Dashboard SHALL compare Task text case-insensitively when checking for duplicates.

### Requirement 6: Sort Tasks

**User Story:** As a user, I want to sort my tasks, so that I can view them in a useful order.

#### Acceptance Criteria

1. WHEN a user selects to sort Tasks by completion status, THE Dashboard SHALL display incomplete Tasks and completed Tasks grouped separately.
2. WHEN a user selects to sort Tasks alphabetically, THE Dashboard SHALL display the Tasks ordered alphabetically by their text.

### Requirement 7: Quick Links

**User Story:** As a user, I want quick-access buttons for my favorite websites, so that I can open them quickly.

#### Acceptance Criteria

1. WHEN a user adds a Quick_Link, THE Dashboard SHALL store the Quick_Link in Local_Storage and display the Quick_Link as a button.
2. WHEN a user clicks a Quick_Link, THE Dashboard SHALL open the linked website in a new browser tab.
3. WHEN a user deletes a Quick_Link, THE Dashboard SHALL remove the Quick_Link from Local_Storage and from the displayed buttons.

### Requirement 8: Constraints

**User Story:** As a developer, I want a clean technology stack and structure, so that the project is easy to maintain and runs in any modern browser.

#### Acceptance Criteria

1. THE Project SHALL use only vanilla HTML, CSS, and JavaScript without any frameworks or backend, and SHALL contain exactly one CSS file in the `css/` folder and exactly one JavaScript file in the `js/` folder.
2. THE Dashboard SHALL store all data exclusively in Local_Storage.
3. THE Dashboard SHALL be compatible with Chrome, Firefox, Edge, and Safari.
4. THE Dashboard SHALL present a clean, minimalist, responsive interface.
