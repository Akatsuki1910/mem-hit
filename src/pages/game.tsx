import type { NextPage } from 'next'
import styles from '../styles/Game.module.scss'
import MemTap from './game/index'

const Game: NextPage = () => {
  const onElementLoaded = (element: HTMLCanvasElement) => {
    if (!element) return
    const memTap = new MemTap(element)
    memTap.start()
  }

  return (
    <div className={styles.game}>
      <canvas ref={onElementLoaded} className={styles.canvas}></canvas>
    </div>
  )
}

export default Game
