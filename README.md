# What is Campus Connect?
Campus Connect is a cross-platform chat and social media app developed by USC students, for USC students. Join your friends. Talk about classes. And just have a good time in general!

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
<p float="left">
<img width="189" alt="Screenshot_20230217_120551_50" src="https://user-images.githubusercontent.com/13265359/219555233-07702c84-05c2-4efd-a82a-11e2ecf69777.png">
<img width="193" alt="Screenshot_20230217_120645_50" src="https://user-images.githubusercontent.com/13265359/219555237-69f2c3e0-2734-4add-91b2-b269de5bcf28.png">
<img width="194" alt="Screenshot_20230217_120709_50" src="https://user-images.githubusercontent.com/13265359/219555239-135df328-1383-4cd1-89c7-3539f0d72c8a.png">
<img width="193" alt="Screenshot_2023-02-26_184122_5sdsdsdsds" src="https://user-images.githubusercontent.com/13265359/221444567-f4b08674-8638-479c-9c73-7e0da7104ff3.png">
<img width="193" alt="Screenshot_2023-02-26_184122_5sdsdsdsds" src="https://user-images.githubusercontent.com/13265359/221444775-4f74bec0-9c11-4674-85c9-b9c69db96066.png">
<img width="194" alt="Screenshot_20230217_120957_50" src="https://user-images.githubusercontent.com/13265359/219555244-16127b83-a5ca-4d8f-800f-bd61513c521d.png">
<img width="192" alt="Screenshot_20230217_121638_50" src="https://user-images.githubusercontent.com/13265359/219555509-0b5c117d-8337-4c37-8d38-dc762c80dca6.png">
<img width="195" alt="Screenshot_20230217_122011_50" src="https://user-images.githubusercontent.com/13265359/219556068-76f8905e-27b9-4ca1-b76f-5d5f4893739e.png">
<img width="197" alt="Screenshot_20230217_011628_50" src="https://user-images.githubusercontent.com/13265359/219564357-e4415aee-e316-46bb-84d9-504e7a8a78bf.png">
<img width="194" alt="Screenshot_20230217_120634_50" src="https://user-images.githubusercontent.com/13265359/219555234-ce4f516d-0cf4-42c6-9a9b-087842b91018.png">


And Much More!

</p>


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
