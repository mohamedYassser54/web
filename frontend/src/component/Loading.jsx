import React from 'react'
import style from './css/Loading.module.css'
function Loading() {
  return (
    <div className={style.Loading}>
      <div className={style.cell}>
  <div className={style.card}>
    <span className={style.flower_loader}>Loading…</span>
  </div>
</div>

    </div>
  )
}

export default Loading
