# Marzipano Vue Viewer

This project provides a robust, reusable Vue 3 wrapper for the [Marzipano.js](https://www.marzipano.net/) 360-degree media viewer. It is organized as an npm workspace monorepo, where the core plugin resides in a workspace package and the root application acts as a documentation and example hub designed to be deployed to GitHub Pages.

## Features

*   **360-Degree Image Viewing:** Smooth and interactive panoramic image viewing.
*   **Hotspot Navigation:** Link between different scenes using configurable hotspots.
*   **Informational Hotspots:** Display text, titles, and custom components for points of interest.
*   **Auto-Rotation:** Automatically rotate the view for a cinematic experience.
*   **Configurable Data Source:** Load scene data from a local JavaScript configuration file or remote cloud sources.
*   **Customizable UI:** Control the visibility and styles of UI elements like fullscreen and navigation buttons out-of-the-box.

## Project Structure

The project is structured as an npm workspace monorepo:

*   `src/`: The main application directory, powered by Vite and Vue Router. This acts as the documentation site and example playground.
    *   `src/views/`: Contains the main layout views (Home, Documentation, Examples).
    *   `src/views/examples/`: Contains specific usage examples (e.g., Basic Viewer, Multiple Viewers) that demonstrate how to implement the plugin.
*   `plugins/@greener-games/vue-marzipano/`: The dedicated workspace package containing the actual Vue 3 plugin. This is what you would build and publish to a registry.
    *   `src/Views/MarzipanoViewer.vue`: The core, reusable viewer component.
    *   `src/composables/useMarzipano.ts`: The core composable managing state.

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/Greener-Games/marzipano-vue-viewer.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd marzipano-vue-viewer
    ```
3.  Install all dependencies (this automatically links the workspace packages):
    ```sh
    npm install
    ```

## Development

To start the documentation and example site locally (which dynamically consumes the local plugin):

```sh
npm run dev
```

Visit the local URL (usually `http://localhost:5173`) to view the documentation, explore examples, and see the plugin in action.

## Building

The project uses npm workspaces to build both the plugin library and the documentation app.

```sh
npm run build
```

This command will:
1. Build the `@greener-games/vue-marzipano` plugin (generating `dist/` inside the plugin folder with TypeScript declarations and compiled output).
2. Build the main application (generating `dist/` in the root folder, ready for deployment to GitHub Pages).

## Configuration

Configuration for the examples (scenes, hotspots, button visibility) is driven by standard JSON/JS objects. For the main examples, data is loaded from `src/data/data.js`. The plugin expects a `data` prop conforming to the `MarzipanoData` interface defined in `plugins/@greener-games/vue-marzipano/src/types.ts`.
