# Angular Project Setup with Nx

This README provides instructions for setting up and running an Angular project using Nx workspace on macOS.

## Prerequisites

- macOS operating system
- Terminal application

## Setup Instructions

### 1a. Node.js Installation (Homebrew)

1. Install Homebrew (if not already installed):

   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Install Node.js using Homebrew:

   ```
   brew install node
   ```

3. Verify the installation:
   ```
   node --version
   npm --version
   ```

### 1b. Node.js Installation (Node.js Website)

1. Install Homebrew (if not already installed):

   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Install Node.js using Homebrew:

   ```
   brew install node
   ```

3. Verify the installation:
   ```
   node --version
   npm --version
   ```

### 2. Install Angular CLI

Install the Angular CLI globally:

```
npm install -g @angular/cli
```

### 3. Create an Nx Workspace

1. Install the Nx CLI globally:

   ```
   npm install -g nx
   ```

2. Create a new Nx workspace:

   ```
   npx create-nx-workspace@latest your-workspace-name
   ```

   Follow the prompts to set up your workspace. Choose "Angular" when asked about the type of application.

#### Why use Nx Workspace?

Nx workspace offers several advantages for Angular development:

- **Monorepo Support**: Manage multiple applications and libraries in a single repository.
- **Powerful CLI**: Nx extends the Angular CLI with additional commands for better productivity.
- **Smart Rebuilds**: Nx only rebuilds what's necessary, saving time on large projects.
- **Code Sharing**: Easily share code between applications in the same workspace.
- **Built-in Testing Tools**: Comes with Jest and Cypress configured out of the box.
- **Automatic Dependency Graph**: Visualize your project structure and dependencies.

### 4. Package Installation

Navigate to your project directory and install dependencies:

```
cd your-workspace-name
npm install --legacy-peer-deps
```

### 5. Start the Nx Server

To run your Angular application:

```
nx serve dgrocery-ui
```

or

```
npx nx serve dgrocery-ui
```

Addinationally you can run your application throught NX consle vs code extension.
