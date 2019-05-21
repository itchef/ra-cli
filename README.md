rg-cli
======

A cli tool to generate react app

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
* [License](#license)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @itchef/rg-cli
$ rg COMMAND
running command...
$ rg (-v|--version|version)
@itchef/rg-cli/0.0.1-1 darwin-x64 node-v11.5.0
$ rg --help [COMMAND]
USAGE
  $ rg COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`rg help [COMMAND]`](#rg-help-command)
* [`rg new PROJECTNAME`](#rg-new-projectname)

## `rg help [COMMAND]`

display help for rg

```
USAGE
  $ rg help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `rg new PROJECTNAME`

To generate a new rg-cli project

```
USAGE
  $ rg new PROJECTNAME

ARGUMENTS
  PROJECTNAME  Name of your application

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/new.ts](https://github.com/ITChef/rg-cli/blob/v0.0.1-1/src/commands/new.ts)_
<!-- commandsstop -->

# License
### The MIT License
