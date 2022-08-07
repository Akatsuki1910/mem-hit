import * as PIXI from 'pixi.js'
import Music from './music'

export class Common {
  static _w: number
  static _s: number
  static _h: number
  static _st: PIXI.Container
  static _mu: Music

  static set width(w: number) {
    this._w = w
    this._s = this._w / 1920
  }

  static set height(h: number) {
    this._h = h
    this._s = this._h / 1080
  }

  static set scale(s: number) {
    this._s = s
  }

  static set stage(st: PIXI.Container) {
    this._st = st
  }

  static set music(mu: Music) {
    this._mu = mu
  }

  static get width() {
    return this._w / this._s
  }

  static get height() {
    return this._h / this._s
  }

  static get scale() {
    return this._s
  }

  static get stage() {
    return this._st
  }

  static get music() {
    return this._mu
  }
}
