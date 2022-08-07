import * as PIXI from 'pixi.js'
import { Common } from '../common'

export default class Title {
  b: PIXI.Graphics

  constructor() {
    this.b = new PIXI.Graphics()
    this.b.beginFill(0xff0000)
    this.b.drawCircle(Common.width / 2, Common.height / 2, 30)
    this.b.endFill()
    this.b.interactive = true
    this.b.buttonMode = true
    this.b.on('click', this.onClick.bind(this))
    Common.stage.addChild(this.b)
  }

  onClick() {
    Common.music.pp()
  }
}
