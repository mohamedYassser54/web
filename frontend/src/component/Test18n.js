import { Fragment } from 'react'
import { useTranslation } from 'react-i18next';



const Test18n = () => {
const { t, i18n } = useTranslation();

const changeEn = () =>{
    i18n.changeLanguage('en')
}
const changeFr = () =>{
    i18n.changeLanguage('ar')
}

  return (
    <Fragment>
      <div>
        <button onClick={changeEn}>EN</button>
        <button onClick={changeFr}>AR</button>
      </div>
      
    </Fragment>
  )
}

export default Test18n
