# What is Campus Connect?
Campus Connect is a cross-platform chat and social media app developed by USC students, for USC students. Join your friends. Talk about classes. Post your favorite links. Whatever!
<table>
  <tr>
    <td><img width="200" alt="Screenshot 2023-04-23 at 1 59 27 PM" src="https://user-images.githubusercontent.com/13265359/233856773-75f9787c-0016-4380-b786-3f35246bde9a.png"></td>
    <td><img width="200" alt="Screenshot 2023-04-23 at 1 57 33 PM" src="https://user-images.githubusercontent.com/13265359/233856731-313acf20-c518-4829-b699-bb882ba8fb19.png"></td>
    <td><img width="190" alt="Screenshot_2023-03-25_150521asdasdasdasdasdasdasdasdasdasd_50" src="https://user-images.githubusercontent.com/13265359/227736574-e89381bf-e18e-47c2-8770-09b861c402b2.png"></td>
    <td><img width="210" alt="Screenshot 2023-04-23 at 2 02 20 PM" src="https://user-images.githubusercontent.com/13265359/233856890-c608dbd3-05a2-41ee-a380-728ecc996de2.png"></td>
  </tr>
  <tr>
    <td><img width="193" alt="Screenshot_2023-02-26_184122_5sdsdsdsds" src="https://user-images.githubusercontent.com/13265359/221444775-4f74bec0-9c11-4674-85c9-b9c69db96066.png"></td>
    <td><img width="201" alt="Screenshot 2023-04-23 at 2 07 52 PM" src="https://user-images.githubusercontent.com/13265359/233857141-521d3805-643f-484b-8c31-d46f3659cbf0.png"></td>
    <td><img width="192" alt="Screenshot_20230217_121638_50" src="https://user-images.githubusercontent.com/13265359/219555509-0b5c117d-8337-4c37-8d38-dc762c80dca6.png"></td>
    <td><img width="195" alt="Screenshot_20230217_122011_50" src="https://user-images.githubusercontent.com/13265359/219556068-76f8905e-27b9-4ca1-b76f-5d5f4893739e.png"></td>
  </tr>
  <tr>
    <td><img width="200" alt="Screenshot 2023-04-23 at 2 00 50 PM" src="https://user-images.githubusercontent.com/13265359/233856837-1c4e0a6b-3c51-4aff-8711-398a6fb0f576.png"></td>
    <td><img width="197" alt="Screenshot_20230217_011628_50" src="https://user-images.githubusercontent.com/13265359/219564357-e4415aee-e316-46bb-84d9-504e7a8a78bf.png"></td>
    <td><img width="200" alt="Screenshot 2023-04-23 at 2 18 52 PM" src="https://user-images.githubusercontent.com/13265359/233857739-e87250ca-308b-4575-b678-25ac23e5ca7c.png"></td>
    <td colspan="3"></td>
  </tr>
</table>

# Hardware Requirements
This dev environment is very intensive and will require a modern computer with at least 20gb of free space, 16gb of ram, and a 4 or more core processor from the past few years. 

iOS Development requires a Macintosh Computer.

We recommend a beefy desktop computer for Android Development and an M1 Mac for iOS development. 

# Setup and Running 
1. Clone Repo
2. Follow instructions to setup react native cli here https://reactnative.dev/docs/environment-setup
3. Install Dependencies<pre><code>npm update</code></pre>
4. Run the code<pre><code>npx react-native run-android</code></pre>

All the source files for the project are in the "src" folder



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
1. Follow these [steps](https://wix.github.io/Detox/docs/introduction/getting-started)
2. Run  ```npm start``` in a separate terminal window.
3. Compile the debug binary with ```detox build --configuration android.emu.debug``` [^2]
4. Run the tests with ```detox test --configuration android.emu.debug```

# Authors  
Erik - erikc@email.sc.edu  
Coby - cobya@email.sc.edu  
Neekon - nsarmadi@email.sc.edu  
Timothy - tkranz@email.sc.edu  
Chase - chasema@email.sc.edu  



[^2]: This command does not work on Mac OS at the moment. You will have to compile manually if you know how.
