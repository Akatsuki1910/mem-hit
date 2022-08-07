import * as PIXI from 'pixi.js'
import { Common } from './common'

export default class Sheet {
  private sheet: PIXI.Graphics
  private w: number
  private x: number
  private li: PIXI.Graphics

  constructor(num: number) {
    this.sheet = new PIXI.Graphics()
    this.sheet.beginFill(0x999999)
    this.sheet.alpha = 0.5
    this.w = Common.width / 2 - 10
    const xm = (Common.width - this.w * 2) / 3
    this.x = xm * (num + 1) + this.w * num
    const h = 100
    this.sheet.drawRect(this.x, 100, this.w, Common.height - h)
    this.sheet.endFill()

    Common.stage.addChild(this.sheet)

    const ln = 8
    const lw = 2
    for (let i = 0; i < ln - 1; i++) {
      const li = this.line(
        h + ((this.sheet.height - lw * (ln - 1)) / ln) * (i + 1) + lw * i,
        lw,
      )
      Common.stage.addChild(li)
    }

    for (let i = 0; i < ln; i++) {
      const li = this.line(
        h + ((this.sheet.height - lw * ln) / ln) * (i + 0.5) + lw * i,
        lw,
      )
      li.alpha = 0.5
      Common.stage.addChild(li)
    }

    this.li = this.line(h, lw, 0xff0000)
    Common.stage.addChild(this.li)
  }

  private line(h: number, lw: number, color = 0xffffff) {
    const l = new PIXI.Graphics()
    l.beginFill(color)
    l.drawRect(this.x, h, this.w, lw)
    return l
  }

  public animation(t: number) {
    this.li.position.y = ((t * this.sheet.height) / 8 / 120) % this.sheet.height
  }
}
