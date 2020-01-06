<p align="center">
  <a href="https://github.com/eskatos/gradle-wrapper-check/actions"><img alt="gradle-wrapper-check status" src="https://github.com/eskatos/gradle-wrapper-check/workflows/build-test/badge.svg"></a>
</p>

# Validates Gradle Wrapper JARs

This action validates the checksums of [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html) JAR files present in the source tree and fails if unknown Gradle Wrapper JAR files are found.

## Usage

Simply add this action to your workflow **before** running any Gradle build:  

```yaml
uses: eskatos/gradle-wrapper-check@releases/v1
```
