[![Actions Status](https://github.com/S0ldierBoy/frontend-project-11/workflows/hexlet-check/badge.svg)](https://github.com/S0ldierBoy/frontend-project-11/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/4fdce5c3056f7937166b/maintainability)](https://codeclimate.com/github/S0ldierBoy/frontend-project-11/maintainability)
[![Node CI](https://github.com/S0ldierBoy/frontend-project-11/actions/workflows/nodejs.yml/badge.svg)](https://github.com/S0ldierBoy/frontend-project-11/actions/workflows/nodejs.yml)

# RSS Aggregator

RSS Aggregator is a web application for reading RSS feeds, allowing users to conveniently collect and view updates from various sources in one place. The application automatically checks for updates in the feeds and displays new posts, helping you stay up-to-date with the latest content without the need to visit each site individually.

## Особенности:

- **Ease of Use:** Add RSS feed URLs, and the aggregator will automatically load and display new posts.
- **Automatic Updates:** The application checks for updates every 5 seconds, ensuring you don't miss new content.
- **Unread Posts Highlighting:** New and unread posts are highlighted for user convenience.
- **Modal Windows:** View post summaries in a modal window without navigating to an external resource.

## Live Demo

You can try a live demo of the RSS Aggregator on Vercel:

[RSS Aggregator Demo](https://frontend-project-11-one-omega.vercel.app/)

## Installation and Launch

### Prerequisites:

- Node.js version 14 or higher
- npm version 6 or higher

### Installation:

Clone the repository:

```bash
git clone https://github.com/S0ldierBoy/frontend-project-11.git

```

Navigate to the project directory:

```bash
cd frontend-project-11

```

Install dependencies:

```bash
make install

```

## Usage:

### Adding a New RSS Feed:

- Enter the RSS feed URL into the input field and click the "Add" button.
- If the feed is valid and hasn't been added yet, it will appear in the feeds list.

### Viewing Posts:

- Posts from added feeds are displayed in the "Posts" section.
- Unread posts are highlighted in bold.

### Reading Posts:

- Click on the post title to navigate directly to the source.
- Or click the "View" button to open a summary in a modal window.

## Technologies:

- JavaScript (ES6+)
- Webpack: Project bundling.
- Babel: Code transpilation for older browser support.
- Bootstrap: Styling and interface components.
- i18next: Internationalization and localization.
- Axios: HTTP client for requests.
- Lodash: Data manipulation utilities.
- on-change: State change tracking.
