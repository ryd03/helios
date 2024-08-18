Helios Installation:


1) clone the respository using git clone
2) cd mobileapp
3) npm install
4) make sure you have installed both Expo CLI and Amplify CLI globally
   npm install -g expo-cli
   npm install -g @aws-amplify/cli (make sure to have it configured)

5) This is the app Id of the app we created using amplify studio it was created with the following aws account 'ryd03@mail.aub.edu'
   amplify pull --appId drxxrb55444e1 --envName dev
   ![image_2024-08-18_22-25-07](https://github.com/user-attachments/assets/e0eef515-e9f5-4463-a2e7-55e5065cd2d0)


7) You are now ready to launch the app !
   Download Expo Go on your mobile device
   run 'npx expo start' (make sure you are in the mobileapp directory)
   Using your phone's camera, scan the QR code that shows up once you start expo
