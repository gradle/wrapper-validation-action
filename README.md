<p align="center">
  <a href="https://github.com/eskatos/gradle-wrapper-check/actions"><img alt="gradle-wrapper-check status" src="https://github.com/eskatos/gradle-wrapper-check/workflows/build-test/badge.svg"></a>
</p>

# Validates Gradle Wrapper JARs

This action validates the checksums of [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html) JAR files present in the source tree and fails if unknown Gradle Wrapper JAR files are found.

## The Gradle Wrapper Problem in Open Source

The `gradle-wrapper.jar` is a binary blob of executable code that is checked into nearly
[2.8 Million GitHub Repositories](https://github.com/search?l=&q=filename%3Agradle-wrapper.jar&type=Code).

Searching across GitHub you can find many pull requests (PRs) with helpful titles like 'Update to Gradle xxx'.
Many of these PRs are contributed by individuals outside of the organization maintaining the project.

Many maintainers are incredibly grateful for these kinds of contributions as it takes an item off of their backlog.
We assume that most maintainers do not consider the security implications of accepting the Gradle Wrapper binary from an external contributors.
There is a certain amount of blind trust open source maintainers have.
Further compounding the issue is that maintainers are most often greeted in these PRs with a diff to the `gradle-wrapper.jar` that looks like this.

![Screen Shot 2020-01-07 at 12 26 07 PM](https://user-images.githubusercontent.com/1323708/71915219-477d7780-3149-11ea-9254-90c80dbffb0a.png)

A fairly simple social engineering supply chain attack against open source would be contribute a helpful “Updated to Gradle xxx” PR that contains malicious code hidden inside this binary JAR.
A malicious `gradle-wrapper.jar` could execute, download, or install arbitrary code while otherwise behaving like a completely normal `gradle-wrapper.jar`.

This problem is unique to open source and doesn’t normally impact companies with closed source and pre-vetted employees.

## Solution

We have created a simple GitHub Action that can be applied to any GitHub repository.
This GitHub Action will do one simple task:
verify that any and all `gradle-wrapper.jar` files in the repository match the SHA-256 checksums of any of our official releases.

If any are found that do not match the SHA-256 checksums of our official releases, the action will fail.

## Usage

Simply add this action to your workflow **before** running any Gradle build:  

```yaml
uses: eskatos/gradle-wrapper-check@releases/v1
```

## Reporting Failures

If this GitHub action fails because a `gradle-wrapper.jar` doesn't match one of our published SHA-256 checksums,
we highly recommend that you reach out to us at [security@gradle.com](mailto:security@gradle.com).

If you're curious and want to explore what the differences are between the `gradle-wrapper.jar` in your possession
and one of our valid release, you can compare them using this online utility: [DiffScope](https://try.diffoscope.org/).
Regardless of what you find, we still kindly request that you reach out to us and let us know about any issues you encountered.
