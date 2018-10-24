[![Build Status](https://travis-ci.com/carpppa/sijoitussimulaattori-app.svg?token=xQqx3oEyeT4LX1PHsDTx&branch=master)](https://travis-ci.com/carpppa/sijoitussimulaattori-app)

# sijoitussimulaattori-app

## Getting started

(For further information of the following, see the [React Native: Getting Started -guide](https://facebook.github.io/react-native/docs/getting-started))

### macOS and Linux

Prerequisities:

- Node (v8.3 or higher)
- Homebrew (macOS only)

Install Watchman and the React Native CLI:

- `brew install watchman` (recommended, macOS only)
- `npm install -g react-native-cli`
- `npm install`

#### Android on macOS/Linux

Prerequisities:

- Java SE Development Kit (JDK v8 or higher)

Follow the instructions in the [React Native: Android development environment -guide](https://facebook.github.io/react-native/docs/getting-started#android-development-environment) to install and set up Android studio and the required environment. **Note that** you might need to select the correct tab (_Building Projects with Native Code_) and _Development_ and _Target_ operating systems from the top of the site for the link to work and to see the correct instructions.

After setting up Android Studio, in order to run the app on an AVD (Android Virtual Device), follow the [instructions](https://facebook.github.io/react-native/docs/getting-started#preparing-the-android-device) on the same page below. **Note that** to run the app on an AVD, the AVD must provide the Oreo API Level 26, x86_64 ABI image with an Android 8.0 target.

To build the app and run it on an AVD:

- launch the AVD
- run `react-native run-android`

Tips for using the AVD:

- Double-tap R on keyboard: reload (refreshes the entire app, loses app state)
- `cmd+M`: display develper menu
- Enable Hot Reloading (in developer menu) for refreshing app on file changes without losing the app state

#### iOS (macOS only)

Prerequisities:

- Xcode (v9.4 or higher)
- Command Line Tools (latest version; in Xcode: Preferences -> Locations)

To build and run the app in the iOS Simulator:

- `react-native run-ios`

If you encounter build errors, the following might help:

- check the Command Line Tools version
- start the iOS Simulator
- restart the build (again)

Tips for the iOS Simulator:

- `cmd+R`: reload (refreshes the entire app, loses app state)
- `cmd+D`: display develper menu
- Enable Hot Reloading (in developer menu) for refreshing app on file changes without losing the app state

To run on device, see instructions in the [React Native: Running on Device -guide](https://facebook.github.io/react-native/docs/running-on-device).

### Windows

Prerequisities:

- Chocolatey (for installing Node, React Native, Java SE Development Kit (JDK), and Python 2)

Install the dependencies using command prompt (requires administrator rights: right click Command Prompt and select "Run as Administrator"):

- `choco install -y nodejs.install python2 jdk8`
- `npm install -g react-native-cli`
- `npm install`

#### Android on Windows

Prerequisities:

- Java SE Development Kit (JDK v8 or higher)

Follow the instructions in the [React Native: Android development environment -guide](https://facebook.github.io/react-native/docs/getting-started#android-development-environment) to install and set up Android studio and the required environment. **Note that** you might need to select the correct tab (_Building Projects with Native Code_) and _Development_ and _Target_ operating systems from the top of the site for the link to work and to see the correct instructions.

After setting up Android Studio, in order to run the app on an AVD (Android Virtual Device), follow the [instructions](https://facebook.github.io/react-native/docs/getting-started#preparing-the-android-device) on the same page below. **Note that** to run the app on an AVD, the AVD must provide the Oreo API Level 26, x86_64 ABI image with an Android 8.0 target.

To build the app and run it on an AVD:

- launch the AVD
- run `react-native run-android`

Tips for using the AVD:

- Double-tap R on keyboard: reload (refreshes the entire app, loses app state)
- `ctrl+M`: display develper menu
- Enable Hot Reloading (in developer menu) for refreshing app on file changes without losing the app state

## Running the app

### Android Virtual Device

- Start any compatible AVD
- Run `npm start`

### iOS Simulator (macOS)

Run the following in Terminal:

- `open -a Simulator`
- `npm start`

## Tests

The project uses Jest testing framework.

- `npm test` to run tests once
- `npm run test:watch` to run tests in watch mode

## VS Code

If developing with Visual Studio Code, install the following plugins:

- React Native Tools
- EditorConfig for VS Code
- Prettier - Code formatter
- TypeScript Hero
