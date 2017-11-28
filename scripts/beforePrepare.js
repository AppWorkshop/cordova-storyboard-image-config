module.exports = function (context) {
  /*
  In plist:

    <key>UILaunchStoryboardName</key>
    <string>CDVLaunchScreen</string>

  Then CDVLaunchScreen.storyboard already refers to LaunchStoryboard.imageset.
  */
  console.log('meteor-storyboard-image-config');
  var fs = context.requireCordovaModule('fs');
  var path = context.requireCordovaModule('path');
  var _ = context.requireCordovaModule('lodash');
  var cordova_util = context.requireCordovaModule('cordova-lib/src/cordova/util.js');
  var ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser;
  var projectRoot = context.opts.projectRoot;
  var xml2js = require('xml2js');
  var parseString = xml2js.parseString;
  var cordova_util = require('cordova-lib/src/cordova/util');
  var projectRoot = cordova_util.isCordova(process.cwd());
  var projectXmlFile = cordova_util.projectConfig(projectRoot);
  var projectPlatforms = cordova_util.listPlatforms(projectRoot);

  // cordova project config
  var configXml = cordova_util.projectConfig(projectRoot);
  var config = new ConfigParser(configXml);
  var projectName = config.name();

  // iOS project config
  var iOSPath = path.join(context.opts.projectRoot, 'platforms', 'ios');
  var launchStoryboardDestination = path.join(iOSPath, projectName, "Images.xcassets"); // destination

  // Launch Storyboard source
  var launchStoryboardSource = path.join(projectRoot, "resources", "LaunchStoryboard.imageset"); // source

  // simple fn to reduce repeated boilerplate
  function logAndRethrowError(err) {
    if (err) {
      console.log("ERROR:");
      console.error(err);
      throw err;
    }
  }

  function copyFileSync(source, target) {
    var targetFile = target;
    //if target is a directory a new file with the same name will be created
    if (fs.existsSync(target)) {
      if (fs.lstatSync(target).isDirectory()) {
        targetFile = path.join(target, path.basename(source));
      }
    }
    fs.writeFileSync(targetFile, fs.readFileSync(source));
  }

  function copyFolderRecursiveSync(source, target) {
    var files = [];
    //check if folder needs to be created or integrated
    var targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }

    //copy
    if (fs.lstatSync(source).isDirectory()) {
      files = fs.readdirSync(source);
      files.forEach(function (file) {
        var curSource = path.join(source, file);
        if (fs.lstatSync(curSource).isDirectory()) {
          copyFolderRecursiveSync(curSource, targetFolder);
        } else {
          copyFileSync(curSource, targetFolder);
        }
      });
    }
  }

  // do we have a storyboard images folder?
  fs.stat(launchStoryboardSource, function (err, stats) {
    if (!err) {
      copyFolderRecursiveSync(launchStoryboardSource, launchStoryboardDestination);
    } else {
      console.error("No launch storyboard source found; you can add an asset catalog for the launch screen storyboard at cordova-build-override/LaunchStoryboard.imageset");
      process.exit(1);
    }
  });

}