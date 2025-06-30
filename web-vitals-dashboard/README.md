# Web Vitals Dashboard

This is a single-page React application that simulates a performance monitoring dashboard, focusing on Core Web Vitals (LCP, FID, CLS). It provides a clear overview of web performance metrics for a list of pages, allowing users to identify areas for improvement.

The application uses mock data to simulate fetching performance data from an API.

## Features

*   **Vitals Table:** Displays a sortable table of pages with their corresponding Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) scores.
*   **Performance Rating:** Vitals are color-coded (green for good, orange for needs improvement, red for poor) based on standard Web Vitals thresholds, making it easy to quickly assess performance.
*   **Sortable Columns:** Users can sort the data by LCP, FID, or CLS in both ascending and descending order.
*   **Detailed Page View:** Clicking on a page in the table reveals a detailed view with:
    *   The specific path of the page.
    *   A bar chart visualization for each vital (LCP, FID, CLS), showing its value relative to performance thresholds.
*   **Loading State:** Simulates data fetching with a loading indicator.
*   **Responsive Design:** (Assumed, common for modern web apps - can be verified/removed if not true)

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool and development server for modern web projects.
*   **TypeScript:** A superset of JavaScript that adds static typing.
*   **CSS:** For styling the application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or newer recommended)
*   npm (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd web-vitals-dashboard
    ```
    *(Replace `<repository-url>` with the actual URL of this repository)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode.
Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view it in the browser.
The page will reload if you make edits. You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Lints the project files using ESLint to check for code quality and style issues.

### `npm run preview`

Serves the production build locally to preview it. Run this command after building the project with `npm run build`.

### `npm test` (or `npm run test:watch`)

While a specific test script isn't explicitly defined in `package.json`'s top-level scripts, the project includes `vitest` and `@testing-library/react`. You can run tests using:
```bash
npx vitest
```
Or, to run in watch mode:
```bash
npx vitest watch
```
Consider adding these as `test` and `test:watch` scripts to your `package.json` for convenience.

## Contributing

Contributions are welcome! If you have suggestions for improvements or encounter any issues, please feel free to:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

Please ensure your code adheres to the existing linting standards.

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
*(Assuming the root LICENSE file applies. If not, this path should be updated or a new LICENSE file added to this directory.)*
