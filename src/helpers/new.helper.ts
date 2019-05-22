/**
 * @license
 *  Copyright (c) 2019, ITChef <https://github.com/itchef/>
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import * as path from 'path'

import Dir from '../utils/dir.util'
import File from '../utils/file.util'

const getTemplatesPathsByName = (templateDir: string) => {
  const templatesPathByName: any = {}
  new Dir(templateDir).read().forEach(name => {
    templatesPathByName[name] = path.join(templateDir, name)
  })
  return templatesPathByName
}

const updatePackageJson = (packageJsonPath: string, projectName: string) => {
  new File(packageJsonPath)
    .read()
    .update('name', projectName)
    .write()
}

const copyBaseReact = (templateDir: string, rootDir: string, projectName: string) => {
  const templatesPathByName = getTemplatesPathsByName(templateDir)
  const projectDir = path.join(rootDir, projectName)
  Dir.copy(templatesPathByName['base-react'], projectDir)
  return projectDir
}

const NewHelper = {
  updatePackageJson,
  copyBaseReact,
}

export default NewHelper
