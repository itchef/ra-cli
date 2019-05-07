import {Command, flags} from '@oclif/command'
import * as path from 'path'

import Dir from '../utils/dir.util'
import File from '../utils/file.util'
import Git from '../utils/git.util'

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
      Dir.copy(templatesPathByName['base-react'], path.join(rootDir, projectName))
      const packageJsonPath = path.join(rootDir, projectName, 'package.json')
      new File(packageJsonPath)
        .read()
        .update('name', projectName)
        .write()
      tmp.clean()
    }
  }
}
