import { createContext, useContext, useEffect, useState } from 'react'
import translations from './translations'

const LanguageContext = createContext(null)

const LANGUAGE_KEY = 'jamiiMarketLanguage'

const getInitialLanguage = () => {
const savedLanguage = localStorage.getItem(LANGUAGE_KEY)

if (savedLanguage === 'sw') {
return 'sw'
}

return 'en'
}

const getNestedValue = (object, path) => {
return path.split('.').reduce((current, key) => {
return current?.[key]
}, object)
}

export function LanguageProvider({ children }) {
const [language, setLanguage] = useState(getInitialLanguage)

useEffect(() => {
localStorage.setItem(LANGUAGE_KEY, language)


document.documentElement.lang =
  language === 'sw' ? 'sw' : 'en'


}, [language])

const changeLanguage = (newLanguage) => {
if (newLanguage !== 'en' && newLanguage !== 'sw') {
return
}


setLanguage(newLanguage)


}

const toggleLanguage = () => {
setLanguage((currentLanguage) =>
currentLanguage === 'en' ? 'sw' : 'en',
)
}

const translate = (section, key) => {
const currentTranslation = getNestedValue(
translations?.[language]?.[section],
key,
)


if (currentTranslation !== undefined) {
  return currentTranslation
}

const englishTranslation = getNestedValue(
  translations?.en?.[section],
  key,
)

if (englishTranslation !== undefined) {
  return englishTranslation
}

return key

}

const t = (key, fallback = key) => {
const currentLanguageTranslations =
translations?.[language]


const englishTranslations =
  translations?.en

for (const section of Object.keys(
  currentLanguageTranslations || {},
)) {
  const value = getNestedValue(
    currentLanguageTranslations[section],
    key,
  )

  if (value !== undefined) {
    return value
  }
}

for (const section of Object.keys(
  englishTranslations || {},
)) {
  const value = getNestedValue(
    englishTranslations[section],
    key,
  )

  if (value !== undefined) {
    return value
  }
}

return fallback

}

return (
<LanguageContext.Provider
value={{
language,
changeLanguage,
toggleLanguage,
translate,
t,
}}
>
{children}
</LanguageContext.Provider>
)
}

export function useLanguage() {
const context = useContext(LanguageContext)

if (!context) {
throw new Error('useLanguage must be used inside LanguageProvider')
}

return context
}
