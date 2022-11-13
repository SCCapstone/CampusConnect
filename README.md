# What is Campus Connect?
Please see [Project Description](https://github.com/SCCapstone/DemBoyz/wiki/Project-Description).
This should explain everything :)
# External Requirements  

Please install these:  

* [Chocolatey](https://chocolatey.org/)
* [Android Studio](https://developer.android.com/studio/?gclid=Cj0KCQjw48OaBhDWARIsAMd966BoOMVQjUYhO10I007JqCvPPxr56bouBmRMC7uWc9cM0kiCxhZh8_4aAuHkEALw_wcB&gclsrc=aw.ds)
* [JDK](https://www.oracle.com/java/technologies/downloads/)
* [Node.js](https://nodejs.org/en/)

# Setup and Running 
1. Clone Repo
2. Follow instructions to setup react native cli here https://reactnative.dev/docs/environment-setup
3. Install Dependencies<pre><code>npm install @react-navigation/native
npm install react-native-dropdown-picker
npm install react-navigation
npm install react-native-screens react-native-safe-area-context
npm install --save @react-native-firebase/app
npm install --save @react-native-firebase/auth
npm install @react-navigation/drawer</code></pre>
4. Run the code<pre><code>npx react-native run-android</code></pre>

All the source files for the project are in the "src" folder

# Coding
Create separate ".js" files for each bundle of screens (related screens). Create separate styles for each screen as well. They can be imported manually at the top. When you're done with your screen, you can add it to the "App.js" stack navigator and it will be registered within the app. Look at "Login.js" for an example of how to navigate through the different screens.  

The next screen that needs to be made is the "RegistrationScreen" in a file called "Registration.js" which  will allow users to add a short bio, update their profile pic, and choose their major upon account creation.  

Then there needs to be a "HomeScreen" which will be wrapped in a "NavigationContainer" and actually have a bunch of other screens attached to it.

We also need to figure out how to handle firebase all throughout the app. Whether that be a single JavaScript file with all of the firebase functions put into one, or scattering it throughout the app. 

# Pictures
<img width="308" alt="Screenshot 2022-10-13 030609" src="https://user-images.githubusercontent.com/13265359/195525883-f8516174-19ba-4d06-b23e-0d691c276bfb.png"><img width="240" alt="Screenshot 2022-11-09 at 11 08 38 AM" src="https://user-images.githubusercontent.com/13265359/200881610-5a6748e1-6307-42f0-a9f6-27d897be052b.png">

# Deployment
We will publish an apk onto github.
# Testing

## Testing Technology
## Running Tests

# Authors  
Erik - erikc@email.sc.edu  
Coby - cobya@email.sc.edu  
Neekon - nsarmadi@email.sc.edu  
Timothy - tkranz@email.sc.edu  
Chase - chasema@email.sc.edu  
