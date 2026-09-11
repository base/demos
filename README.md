![Base](logo.webp)

# Base Demo Applications

A repository of demo applications that utilize Base and Coinbase Developer Platform products.

<!-- Badge row 1 - status -->

[![GitHub contributors](https://img.shields.io/github/contributors/base/demos)](https://github.com/base/demos/graphs/contributors)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/w/base/demos)](https://github.com/base/demos/graphs/contributors)
[![GitHub Stars](https://img.shields.io/github/stars/base/demos.svg)](https://github.com/base/demos/stargazers)
![GitHub repo size](https://img.shields.io/github/repo-size/base/demos)
[![GitHub](https://img.shields.io/github/license/base/demos?color=blue)](https://github.com/base/demos/blob/master/LICENSE.md)

<!-- Badge row 2 - links and profiles -->

[![Website base.org](https://img.shields.io/website-up-down-green-red/https/base.org.svg)](https://base.org)
[![Blog](https://img.shields.io/badge/blog-up-green)](https://base.mirror.xyz/)
[![Docs](https://img.shields.io/badge/docs-up-green)](https://docs.base.org/)
[![Discord](https://img.shields.io/discord/1067165013397213286?label=discord)](https://base.org/discord)
[![Twitter Base](https://img.shields.io/twitter/follow/Base?style=social)](https://twitter.com/Base)

<!-- Badge row 3 - detailed status -->

[![GitHub pull requests by-label](https://img.shields.io/github/issues-pr-raw/base/demos)](https://github.com/base/demos/pulls)
[![GitHub Issues](https://img.shields.io/github/issues-raw/base/demos.svg)](https://github.com/base/demos/issues)

## Overview

This repository contains focused example applications demonstrating Base
protocol and agent capabilities. Each top-level demo is independently runnable.

The **200ms demo** is built around Base's Denim upgrade. Denim reduces the
canonical block interval from two seconds to 200 milliseconds, producing five
canonical blocks per second. The demo turns that protocol improvement into a
product experience: stablecoin transfers settle quickly enough to feel like a
continuous stream of money rather than a sequence of isolated payments.

## Available Demos

| Demo Name | Type | Location | Description |
|-----------|------|----------|-------------|
| **Trading Agent** | Agents | `agents/trading-agent/` | CLI that scaffolds a fully configured LangChain trading agent on Base from a plain-English strategy |
| **200ms demo** | Protocol demo | [`200ms-demo/`](200ms-demo/) | Demonstrates how Denim's 200ms canonical blocks enable new real-time use cases by streaming USDV through actual onchain transfers |

## Getting Started

1. Clone this repository
2. Navigate to the specific demo directory you want to explore
3. Follow the README instructions in each demo directory

## Requirements

- Follow the requirements in each demo's README.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the terms of the included LICENSE file.

---

[Coinbase Developer Platform]: https://portal.cdp.coinbase.com
[Base]: https://base.org
