/**
 * @license
 * Copyright (c) 2019, ITChef <https://github.com/itchef/>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Command, flags} from '@oclif/command'
import * as path from 'path'

import GitHelper from '../helpers/Git.helper'
import NewHelper from '../helpers/new.helper'
import Dir from '../utils/dir.util'
import Git from '../utils/git.util'
import Logger from '../utils/logger.util'

export default class New extends Command {
  static description = 'To generate a new rg-cli project'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {
      name: 'projectName',
      required: true,
      description: 'Name of your application'
    }
  ]

  async run() {
    const {args} = this.parse(New)
    const projectName = args.projectName

    if (projectName.trim()) {
      const rootDir = path.join(__dirname, '../../')
      const tempDir = path.join(rootDir, '.tmp')
      const tmp = new Dir(tempDir).clean().make().cd()
      Logger.info('Fetch templates.......')
      Git.Clone('itchef', 'rg', 'packages')
      const templateDir = path.join(tempDir, 'packages/templates')
      const packageJsonPath = path.join(rootDir, projectName, 'package.json')
      Logger.info('Creating base app........')
      const projectDir = NewHelper.copyBaseReact(templateDir, rootDir, projectName)
      NewHelper.updatePackageJson(packageJsonPath, projectName)
      new Dir(projectDir)
        .clean('.git')
        .cd()
        .execute(() => {
          Logger.info('Adding initial commit........')
          GitHelper.initialCommit()
        })
      tmp.clean()
    }
  }
}
