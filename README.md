
# GEARBOX SUPPLY

Welcome to the **GEARBOX SUPPLY** Website repository!  
This guide will help you set up and run the project on your local machine.

## Prerequisites

Before cloning the repository, ensure the following tools are installed on your computer:

1. **Git**: Download and install Git from [Git Downloads](https://git-scm.com/downloads) if not already installed.
2. **Node.js and npm**: Download and install the latest stable version of Node.js (which includes npm) from [Node.js Official Website](https://nodejs.org/).

Verify installation by running the following commands in your terminal:

```bash
node -v
npm -v
```

These commands should return the installed versions of Node.js and npm.

## Cloning the Repository

Follow these steps to clone the repository to your local machine:

1. Open a terminal (Command Prompt, PowerShell, or any terminal of your choice).
2. Navigate to the directory where you want to clone the repository:

    ```bash
    cd path/to/your/directory
    ```

3. Clone the repository using Git:

    ```bash
    git clone https://github.com/vishnumuthyalu/errorlist-autoparts-website.git
    ```

### Alternative:

If you are using **VS Code** or **IntelliJ** as your preferred IDE, you can directly clone through the IDE interface using the same URL.

- [VS Code Git Integration](https://code.visualstudio.com/docs/sourcecontrol/intro-to-git)
- [IntelliJ Git Integration](https://blog.jetbrains.com/idea/2020/10/clone-a-project-from-github/)

## Installing Dependencies

Once the repository is cloned, follow these steps to install the required dependencies:

1. Navigate to the project directory:

    ```bash
    cd errorlist-autoparts-website
    ```

2. Install all the dependencies listed in the `package.json` file:

    ```bash
    npm install
    ```

## Running the Project Locally

To run the project on your local machine:

1. Start the React development server:

    ```bash
    npm start
    ```

2. By default, the app will open automatically in your default web browser.  
   If it does not, open a browser and navigate to:

    ```text
    http://localhost:3000
    ```

## Notes

- Ensure that no other application is using **port 3000** on your machine.  
  If the port is in use, React will prompt you to use a different port.
- If you encounter issues during setup or while running the app, double-check the installed versions of Node.js and npm to ensure compatibility.

## Troubleshooting

If you encounter any issues:

1. Delete the `node_modules` folder and `package-lock.json` file, then reinstall dependencies:

    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```

2. Clear the npm cache:

    ```bash
    npm cache clean --force
    ```

3. Restart the development server.

## For Further Questions and Enquiries

Feel free to reach out to the following team members for assistance:

- **Ria James**: [ria.james@my.utsa.edu](mailto:ria.james@my.utsa.edu)
- **Connor Haubrich**: [connor.haubrich@my.utsa.edu](mailto:connor.haubrich@my.utsa.edu)
- **Thanush Koshekay**: [thanush.koshekay@my.utsa.edu](mailto:thanush.koshekay@my.utsa.edu)
- **Vishnu Muthyalu**: [vishnu.muthyalu@my.utsa.edu](mailto:vishnu.muthyalu@my.utsa.edu)
- **Austin Barthel**: [barthelaus@gmail.com](mailto:barthelaus@gmail.com)
- **Kosisochukwu Mogekwu**: [kosimogs@gmail.com](mailto:kosimogs@gmail.com)
