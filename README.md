# Marzipano Vue Viewer

This project is a web application for viewing 360-degree panoramic images, built with [Vue.js](https://vuejs.org/) and [Marzipano.js](https://www.marzipano.net/). It provides a simple and configurable way to create interactive 360-degree image galleries.

## Features

*   **360-Degree Image Viewing:** Smooth and interactive panoramic image viewing.
*   **Hotspot Navigation:** Link between different scenes using hotspots.
*   **Informational Hotspots:** Display text and titles for points of interest.
*   **Auto-Rotation:** Automatically rotate the view for a cinematic experience.
*   **Configurable Data Source:** Load scene data from a local file or a cloud provider.
*   **Customizable UI:** Control the visibility of UI elements like fullscreen and navigation buttons.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/marzipano-vue-viewer.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd marzipano-vue-viewer
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Development Server

To start the development server, run the following command:

```sh
npm run dev
```

This will start a local server, and you can view the application in your browser at the URL provided in the console (usually `http://localhost:5173`).

## Building for Production

To create a production-ready build of the application, run:

```sh
npm run build
```

The optimized and minified files will be generated in the `dist/` directory.

## Project Structure

The project is organized into two main parts: the main application and a reusable Vue component for Marzipano.

*   `src/`: This directory contains the main application logic.
    *   `App.vue`: The root Vue component that integrates the Marzipano viewer.
    *   `main.ts`: The entry point of the Vue application.
    *   `data/data.js`: The local data source for scenes and settings.
*   `src/VueMarzipano/`: This directory contains the reusable `@greener-games/vue-marzipano` component. It's a self-contained package that wraps the Marzipano.js library.
    *   `src/Views/MarzipanoViewer.vue`: The core viewer component.
    *   `package.json`: Defines the dependencies and metadata for the component.

## Configuration

The panoramic scenes, hotspots, and settings are configured in the `src/data/data.js` file.

### Scenes

The `scenes` array contains objects, each representing a 360-degree image. You can define the image source, initial view parameters, and hotspots for each scene.

### Hotspots

There are two types of hotspots:

*   `linkHotspots`: Create links to navigate to other scenes.
*   `infoHotspots`: Display a title and text when clicked.

### Settings

The `settings` object allows you to configure the viewer's behavior, such as the mouse view mode, auto-rotation, and which control buttons are visible.
