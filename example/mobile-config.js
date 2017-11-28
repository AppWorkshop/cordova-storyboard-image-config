// This section sets up some basic app metadata, the entire section is optional.
App.info({
  id: 'net.appworkshop.app.example.launchstoryboard',
  name: 'launchstoryboard',
  description: 'Demo launch storyboards in meteor',
  author: 'The App Workshop Pty Ltd',
  email: 'mike@appworkshop.net',
  website: 'https://appworkshop.net'
});

// Add custom tags for a particular PhoneGap/Cordova plugin to the end of the
// generated config.xml. 

App.appendToConfig(`
<platform name="ios"> 
    <config-file platform="ios" target="*-Info.plist" parent="NSPhotoLibraryUsageDescription">
      <string>Allows you to attach pictures to forms.</string>
    </config-file>
    <config-file platform="ios" target="*-Info.plist" parent="NSCameraUsageDescription">
      <string>Allows you to attach pictures to forms.</string>
    </config-file>
    <config-file platform="ios" target="*-Info.plist" parent="NSPhotoLibraryAddUsageDescription">
      <string>Allows you to save pictures in your photo library.</string>
    </config-file>
    <config-file platform="ios" target="*-Info.plist" parent="NSLocationWhenInUseUsageDescription">
      <string>Allows you to attach geotagged pictures to forms.</string>
    </config-file>
    <config-file platform="ios" target="*-Info.plist" parent="NSContactsUsageDescription">
      <string>Allows you to add contact details from your address book to forms.</string>
    </config-file>
    <config-file platform="ios" target="*-Info.plist" parent="UILaunchStoryboardName">
      <string>CDVLaunchScreen</string>
    </config-file>
</platform>
`);
