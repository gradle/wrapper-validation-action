# Release

* starting on `main`
* `npm clean-install`
* `npm run all`
* verify that `dist/index.js` matches `action/index.js`
* if not, commit and push the changes, then wait for CI to finish
* `git tag v1.0.x && git push --tags` with the actual version number
* `git tag -f -a v1 && git push -f --tags`
* go to https://github.com/gradle/wrapper-validation-action/releases
  * edit and publish the now drafted `v1` release
  * create a new release from the new full version number `v1.0.x`, list the fixed issues and publish the release
* go to https://github.com/marketplace/actions/gradle-wrapper-validation
  * verify that it displays the latest README
  * verify that the version dropdown displays the new version
