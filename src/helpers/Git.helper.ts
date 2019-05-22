/*
 * @license
 *  Copyright (c) 2019, ITChef <https://github.com/itchef/>
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import Git from '../utils/git.util'

const initialCommit = () => {
  Git.init()
  Git.add({flag: 'all'})
  Git.commit('Initial commit.')
}
const GitHelper = {
  initialCommit
}

export default GitHelper
