# Release

* starting on `main`
* `npm install`
* `npm run all`
* Commit and push any changes to the `dist` directory. Wait for CI.
* `git tag v1.0.x && git push --tags` with the actual version number
* `git tag -f -a v1 && git push -f --tags`
* go to https://github.com/gradle/wrapper-validation-action/releases
  * edit and publish the now drafted `v1` release
  * create a new release from the new full version number `v1.0.x`, list the fixed issues and publish the release
* go to https://github.com/marketplace/actions/gradle-wrapper-validation
  * verify that it displays the latest README
  * verify that the version dropdown displays the new version
