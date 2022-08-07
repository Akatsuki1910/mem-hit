import * as PIXI from 'pixi.js'

const textStyleDef = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: '40px',
  fill: 'white',
  fontWeight: 'bold',
})

export default function textAdd(
  text: string | number,
  x: number = 0,
  y: number = 0,
  textStyle: PIXI.TextStyle = textStyleDef,
) {
  const textObj = new PIXI.Text(String(text), textStyle)
  textObj.x = x
  textObj.y = y
  return textObj
}
