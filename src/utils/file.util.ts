/**
 * @license
 * Copyright (c) 2019, ITChef <https://github.com/itchef/>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FS from 'fs'
import * as Path from 'path'

export default class File {
  private _path: string
  private _extension: string
  private _data: string | undefined
  private _JSON_EXTENSION = '.json'

  constructor(path: string, data?: string) {
    this._path = path
    this._data = data
    this._extension = Path.extname(this._path)
  }

  read(): File {
    const data = FS.readFileSync(this._path, 'utf-8')
    if (this._extension === this._JSON_EXTENSION) {
      return new File(this._path, JSON.parse(data))
    }
    return new File(this._path, data)
  }

  update(key: string, value: string): File {
    if (this._extension === this._JSON_EXTENSION && this._data !== undefined) {
      this._data[key] = value
    }
    return this
  }

  write(path?: string) {
    let writablePath = this._path
    if (path) {
      writablePath = path
    }
    const data = (this._extension === this._JSON_EXTENSION)
      ? JSON.stringify(this._data, null, 4) : this._data
    FS.writeFileSync(writablePath, data)
  }
}
