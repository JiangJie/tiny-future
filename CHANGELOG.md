# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-07-31

### Changed

- Prefer using `Promise.withResolvers` to create Promise (with fallback for older environments)
- Upgrade development dependencies

### Fixed

- Update installation section of README

## [1.0.0] - 2024-08-02

### Added

- Initial release
- `Future<T>` class for resolving or rejecting a Promise outside its executor
- Support for both CJS and ESM module formats
- TypeScript type definitions

[1.1.0]: https://github.com/JiangJie/tiny-future/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/JiangJie/tiny-future/releases/tag/v1.0.0
