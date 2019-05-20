/**
 * @license
 * Copyright (c) 2019, ITChef <https://github.com/itchef/>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Command, flags} from '@oclif/command'
import * as path from 'path'

import Dir from '../utils/dir.util'
import File from '../utils/file.util'
import Git from '../utils/git.util'

export default class New extends Command {
  static description = 'To generate a new ra-cli project'

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

    if (projectName) {
      const rootDir = path.join(__dirname, '../../')
      const tempDir = path.join(rootDir, '.tmp')
      const tmp = new Dir(tempDir).clean().make().cd()
      Git.Clone('itchef', 'rg', 'packages')
      const templateDir = path.join(tempDir, 'packages/templates')
      const templatesPathByName: any = {}
      new Dir(templateDir).read().forEach(name => {
        templatesPathByName[name] = path.join(templateDir, name)
      })
      const projectDir = path.join(rootDir, projectName)
      Dir.copy(templatesPathByName['base-react'], projectDir)
      const packageJsonPath = path.join(rootDir, projectName, 'package.json')
      new File(packageJsonPath)
        .read()
        .update('name', projectName)
        .write()
      new Dir(projectDir)
        .clean('.git')
        .cd()
        .execute(() => {
          Git.init()
          Git.add({flag: 'all'})
          Git.commit('Initial commit.')
        })
      tmp.clean()
    }
  }
}
