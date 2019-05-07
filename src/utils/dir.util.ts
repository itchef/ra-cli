import {execSync} from 'child_process'
import * as FS from 'fs'

export default class Dir {
  public static copy(src: string, destination: string) {
    execSync(`cp -r ${src} ${destination}`)
  }
  private _dirName: string

  constructor(dirName: string) {
    this._dirName = dirName
  }

  make(): Dir {
    FS.mkdirSync(this._dirName)
    return new Dir(this._dirName)
  }

  cd(): Dir {
    process.chdir(this._dirName)
    return this
  }

  goBack(): Dir {
    process.chdir('../')
    return this
  }

  read() {
    return FS.readdirSync(this._dirName)
  }

  clean() {
    FS.existsSync(this._dirName) && execSync(`rm -r ${this._dirName}`)
    return this
  }
}
