# Meteor Cordova iOS Storyboard Image Config

Copies files and config for iOS storyboard launch images.

### Installation

Meteor: 

```
meteor add cordova:cordova-storyboard-image-config@1.0.0
```

Cordova:

```
cordova plugin add cordova-storyboard-image-config@1.0.0
```

### Configuration

See the [example](./example/) folder for an example meteor project

1. Add the plugin to your project.</li>
2. (if using meteor) copy the `cordova-build-override` folder into your meteor project.</li>
3. (if using cordova) copy the `cordova-build-override/resources/` folder into your cordova project root.</li>
4. Put the appropriate images in place of those in `[cordova-build-override/]resources/LaunchStoryboard.imageset`.
      See [here](https://github.com/apache/cordova-plugin-splashscreen#designing-launch-storyboard-images) for more information.
    </li>
5. Edit `[cordova-build-override/]resources/LaunchStoryboard.imageset/Contents.json` accordingly.
    </li>
6. (if using meteor) Add the following to your `mobile-config.js` 

  ```js
  App.appendToConfig(`
    <platform name="ios"> 
        <config-file platform="ios" target="*-Info.plist">
          <key>UILaunchStoryboardName</key>
          <string>CDVLaunchScreen</string>
        </config-file>
    </platform>
  `);
  ```

7. (if using cordova) Add the following to your config.xml :

  ```xml
  <platform name="ios"> 
      <config-file platform="ios" target="*-Info.plist">
        <key>UILaunchStoryboardName</key>
        <string>CDVLaunchScreen</string>
      </config-file>
  </platform>
  ```
