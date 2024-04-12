> [!IMPORTANT]
> As of `v3` this action has been superceded by `gradle/actions/wrapper-validation`.
> Any workflow that uses `gradle/wrapper-validation-action@v3` will transparently delegate to `gradle/actions/wrapper-validation@v3`.
>
> Users are encouraged to update their workflows, replacing:
> ```
> uses: gradle/wrapper-validation-action@v3
> ```
>
> with
> ```
> uses: gradle/actions/wrapper-validation@v3
> ```
>
> See the [wrapper-validation documentation](https://github.com/gradle/actions/tree/main/wrapper-validation) for up-to-date documentation for `gradle/actions/wrapper-validation`. 

# Gradle Wrapper Validation Action

This action validates the checksums of _all_ [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html) JAR files present in the repository and fails if any unknown Gradle Wrapper JAR files are found.

The action should be run in the root of the repository, as it will recursively search for any files named `gradle-wrapper.jar`.

### Example workflow

```yaml
name: "Validate Gradle Wrapper"
on: [push, pull_request]

jobs:
  validation:
    name: "Validation"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: gradle/wrapper-validation-action@v3
```

As of `v3`, the `gradle/wrapper-validation-action` action delegates to `gradle/actions/wrapper-validation` with the same version.
Configuration and usage of these actions is identical for releases with the same version number.

See the [full wrapper-validation documentation](https://github.com/gradle/actions/tree/main/wrapper-validation) for more details. 
