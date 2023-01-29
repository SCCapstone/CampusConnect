# What is Campus Connect?
Campus Connect is a cross-platform chat and social media app developed by USC students, for USC students. 

# Hardware Requirements
This dev environment is very intensive and will require a modern computer with at least 20gb of free space, 16gb of ram, and a 4 or more core processor from the past few years. 

iOS Development requires a Macintosh Computer.

We recommend a beefy desktop computer for Android Development and an M1 Mac for iOS development. 

# External Requirements  

Please install these:  

* [Chocolatey](https://chocolatey.org/)
* [Android Studio](https://developer.android.com/studio/?gclid=Cj0KCQjw48OaBhDWARIsAMd966BoOMVQjUYhO10I007JqCvPPxr56bouBmRMC7uWc9cM0kiCxhZh8_4aAuHkEALw_wcB&gclsrc=aw.ds)
* [JDK](https://www.oracle.com/java/technologies/downloads/)
* [Node.js](https://nodejs.org/en/)

# Setup and Running 
1. Clone Repo
2. Follow instructions to setup react native cli here https://reactnative.dev/docs/environment-setup
3. Install Dependencies<pre><code>npm install [^1]</code></pre>
4. Run the code<pre><code>npx react-native run-android</code></pre>

All the source files for the project are in the "src" folder


# Coding
Create separate ".js" files for each screen. Screens can be added to the HomeScreen drawer when they are done. Messing with other parts of the app can be dangerous. Styles should go into the styles folder. 

# Pictures
<img width="308" alt="Screenshot 2022-10-13 030609" src="https://user-images.githubusercontent.com/13265359/195525883-f8516174-19ba-4d06-b23e-0d691c276bfb.png"><img width="240" alt="Screenshot 2022-11-09 at 11 08 38 AM" src="https://user-images.githubusercontent.com/13265359/200881610-5a6748e1-6307-42f0-a9f6-27d897be052b.png">

# Deployment
We will publish an apk/ipa onto github.
# Testing

## Testing Technology
We are using jest and detox to test our software. Several unit tests, as well as functional tests will be available for code review.

Jest unit tests are located in ```__tests__``` and behavioral tests are located in ```e2e```
## Running Tests
### Unit Tests
Run ```npm test``` from the root directory to run the unit tests.

### Behavioural Tests
Detox behavioral tests can be run by performing the following steps:
1. Run  ```npm start``` in a separate terminal window.
2. Compile the debug binary with ```detox build --configuration android.emu.debug``` [^2]
3. Run the tests with ```detox test --configuration android.emu.debug```

Note: If it crashes or doesn't work, just repeat the steps a few million times, because react native just "works" that way.

# Authors  
Erik - erikc@email.sc.edu  
Coby - cobya@email.sc.edu  
Neekon - nsarmadi@email.sc.edu  
Timothy - tkranz@email.sc.edu  
Chase - chasema@email.sc.edu  


[^1]: It is now recommended to run npm install instead of npm update as running an update could break the project this late in the game.
[^2]: This command does not work on Mac OS at the moment. You will have to compile manually if you know how.
