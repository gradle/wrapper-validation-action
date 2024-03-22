# Release

* starting on `main`
* `npm clean-install`
* `npm run github_ci_all`
* if `action/index.js` has changed, commit and push the changes, then wait for CI to finish
* `git tag v2.x.y && git push --tags` with the actual version number
* `git tag -f -a v2 && git push -f --tags`
* go to https://github.com/gradle/wrapper-validation-action/releases
  * edit and publish the now drafted `v2` release
  * create a new release from the new full version number `v2.x.y`, list the fixed issues and publish the release
* go to https://github.com/marketplace/actions/gradle-wrapper-validation
  * verify that it displays the latest README
  * verify that the version dropdown displays the new version
