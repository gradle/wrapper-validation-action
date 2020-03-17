# Release

* starting on `master`
* `npm run all`
* `git checkout releases/v1`
* `git merge master`
* `npm prune --production`
* `git add -f node_modules`
  * if changed dependencies `git commit -m Dependencies && git push`
* `git tag v1.0.x && git push --tags` with the actual version number
* `git tag --delete v1 && git push --delete origin v1 && git tag v1 && git push --tags`
* go to https://github.com/gradle/wrapper-validation-action/releases
  * edit and publish the now drafted `v1` release
  * create a new release from the new full version number `v1.0.x`, list the fixed issues and publish the release
* go to https://github.com/marketplace/actions/gradle-wrapper-validation
  * verify that it displays the latest README
  * verify that the version dropdown displays the new version
