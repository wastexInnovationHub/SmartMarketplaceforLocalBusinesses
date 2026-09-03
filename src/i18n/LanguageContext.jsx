import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import translations from './translations'

const LanguageContext = createContext(null)

const LANGUAGE_STORAGE_KEY = 'jamiiMarketLanguage'

function getInitialLanguage() {
  const storedLanguage = localStorage.getItem(
    LANGUAGE_STORAGE_KEY
  )

  if (storedLanguage === 'sw') {
    return 'sw'
  }

  return 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      language
    )

    document.documentElement.lang = language
  }, [language])

  const changeLanguage = (newLanguage) => {
    if (!translations[newLanguage]) {
      return
    }

    setLanguage(newLanguage)
  }

  const toggleLanguage = () => {
    setLanguage((currentLanguage) =>
      currentLanguage === 'en' ? 'sw' : 'en'
    )
  }

  const translate = (section, key) => {
    return (
      translations[language]?.[section]?.[key] ||
      translations.en?.[section]?.[key] ||
      key
    )
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage: changeLanguage,
      toggleLanguage,
      t: translate,
      isEnglish: language === 'en',
      isSwahili: language === 'sw',
    }),
    [language]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error(
      'useLanguage must be used inside LanguageProvider'
    )
  }

  return context
}

