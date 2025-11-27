# Internationalization (i18n) Setup

This project uses `react-i18next` for internationalization support.

## Configuration

- **Default Language**: Hebrew (`he`)
- **Fallback Language**: English (`en`)
- **RTL Support**: Automatically sets `document.documentElement.dir` to `rtl` for Hebrew and `ltr` for English
- **Language Detection**: Uses localStorage and browser navigator language

## Files Structure

```
src/
├── i18n.ts                    # i18n configuration
├── locales/
│   ├── he.json               # Hebrew translations
│   ├── en.json               # English translations
│   └── README.md             # This file
└── components/
    └── LanguageSwitcher/     # Language switcher component
        ├── LanguageSwitcher.tsx
        └── LanguageSwitcher.scss
```

## Usage

### Using translations in components

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('common.loading')}</p>
    </div>
  );
};
```

### Changing language programmatically

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  
  return (
    <button onClick={() => changeLanguage('en')}>
      Switch to English
    </button>
  );
};
```

## Translation Keys Structure

The translation files are organized in nested objects:

```json
{
  "common": {
    "welcome": "ברוכים הבאים",
    "login": "התחברות",
    "logout": "התנתקות"
  },
  "navigation": {
    "home": "בית",
    "requests": "בקשות"
  },
  "forms": {
    "required": "שדה חובה",
    "invalidEmail": "כתובת אימייל לא תקינה"
  }
}
```

## Adding New Translations

1. Add the key-value pair to both `he.json` and `en.json`
2. Use the key in your component with `t('key.path')`
3. The language switcher will automatically update the UI

## Language Switcher

The language switcher component is available globally and can be used anywhere in the app:

```tsx
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';

// Use in any component
<LanguageSwitcher />
```
