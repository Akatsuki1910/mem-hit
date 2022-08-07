import * as PIXI from 'pixi.js'
import { Container } from 'pixi.js'
import { Common } from './common'
import soundShader from './glsl/sound.frag'
import sounddefinitionShader from './glsl/sounddefinition.frag'
import soundmainShader from './glsl/soundmain.frag'
import Music from './music'
import Sheet from './sheet'
import textAdd from './text'

export default class MemTap {
  renderer: PIXI.AbstractRenderer
  time1: number
  time2: number
  sheet1: Sheet
  sheet2: Sheet
  tempo: number
  text: PIXI.Text

  constructor(view: HTMLCanvasElement) {
    Common.stage = new Container()

    this.setWH()

    this.renderer = PIXI.autoDetectRenderer({
      width: Common._w,
      height: Common._h,
      antialias: true,
      autoDensity: true,
      view,
    })

    this.setSize()

    window.onresize = () => {
      this.setSize()
    }

    this.sheet1 = new Sheet(0)
    this.sheet2 = new Sheet(1)

    this.time1 = 0
    this.time2 = 0

    this.tempo = 120
    this.text = textAdd(`BPM:${this.tempo}`)
    Common.stage.addChild(this.text)

    Common.music = new Music()

    const ss = sounddefinitionShader + '\n' + soundShader + soundmainShader
    Common.music.setFrag(ss)
    Common.music.duration = 60 / this.tempo

    window.addEventListener('keydown', (e) => this.keyDown(e))
    window.addEventListener('keyup', (e) => this.keyUp(e))

    const b = new PIXI.Graphics()
    b.beginFill(0xff0000)
    b.drawCircle(Common.width / 2, Common.height / 2, 30)
    b.endFill()
    b.interactive = true
    b.buttonMode = true
    b.on('click', () => Common.music.pp())
    Common.stage.addChild(b)
  }

  keyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') {
      this.tempo++
    }

    if (e.key === 'ArrowDown') {
      this.tempo--
    }

    this.text.text = `BPM:${this.tempo}`
    Common.music.duration = 60 / this.tempo
  }

  keyUp(e: KeyboardEvent) {}

  private setWH() {
    let width = window.innerWidth
    let height = window.innerHeight

    const w = (height * 9) / 16
    const h = (width * 16) / 9

    if (w > width) {
      height = h
    } else if (h > height) {
      width = w
    }

    Common.width = width
    Common.height = height
  }

  private setSize() {
    this.setWH()
    this.renderer.resize(Common._w, Common._h)
    this.renderer.resolution = window.devicePixelRatio
      ? window.devicePixelRatio
      : 1

    Common.stage.scale.set(Common.scale, Common.scale)
  }

  public start() {
    // Common.music.pp()
    this.animation()
  }

  private animation() {
    requestAnimationFrame(this.animation.bind(this))
    this.renderer.render(Common.stage)
    this.sheet1.animation(this.time1)
    this.sheet2.animation(this.time2)
    this.time1 += this.tempo / 60
    this.time2 += this.tempo / 60
  }
}
