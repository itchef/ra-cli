import {execSync} from 'child_process'

const GITHUB_URL = 'https://github.com/'

type EMPTY_STRING = ''
const Git = {
  Clone: (owner: string, repo: string, dir?: any | EMPTY_STRING) => {
    const url = GITHUB_URL + owner + '/' + repo + '.git'
    const command = `git clone ${url} ${dir}`
    execSync(command)
  },
  init: () => {
    const command = 'git init'
    execSync(command)
  },
  add: (option: any) => {
    const command = (option.flag === 'all') ? 'git add .' : 'git add'
    execSync(command)
  },
  commit: (message: string) => {
    const command = `git commit -m '${message}'`
    execSync(command)
  }
}

export default Git
