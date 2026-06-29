# Internationalization (i18n)

## Overview

This project uses `next-intl` for translations.

The source locale is Spanish (`es`) and all translation files are stored in:

```text
messages/
├── es.json
├── en.json
└── ...
```

Spanish is the source of truth. New translation keys must always be added to `messages/es.json` first.

---

## Translation File Structure

Translations should be organized by feature or component using nested objects.

Example:

```json
{
    "Footer": {
        "copyright": "Copyright © 2026 Maranatha San Cristóbal"
    }
}
```

Usage:

```tsx
const i18n = useTranslations("Footer");

<p>{i18n("copyright")}</p>;
```

Nested values are accessed using dot notation:

```json
{
    "Header": {
        "navbar": {
            "about": "Sobre Nosotros"
        }
    }
}
```

```tsx
const i18n = useTranslations("Header");

i18n("navbar.about");
```

---

## Adding New Translations

Always add new keys to `messages/es.json`.

Example:

```json
{
    "Footer": {
        "links": {
            "faq": "Preguntas Frecuentes"
        }
    }
}
```

Do not manually edit other locale files unless a custom translation is required.

---

## Syncing Translation Files

After modifying `messages/es.json`, run:

```bash
bun i18n
```

This synchronizes the structure across all locale files.

Missing keys are added with empty values.

---

## Automatic Translation

To automatically translate missing values:

```bash
bun i18n:translate
```

This command:

1. Reads `messages/es.json`.
2. Finds missing or empty translations in other locales.
3. Translates them using Google Translate.
4. Preserves existing translations.
5. Writes the updated locale files.

Example:

```bash
bun i18n:translate
```

Output:

```text
🌐 en: "Aviso Legal" → "Legal Notice"
🌐 en: "Política de Privacidad" → "Privacy Policy"
✓ Synced en.json
✨ Done
```

---

## Rules

### Do

* Add new content to `messages/es.json`.
* Use descriptive keys.
* Group translations by component or feature.
* Run `bun i18n:translate` after adding new keys.

### Don't

* Hardcode user-facing text in components.
* Use translation keys as actual content.
* Modify generated translations unless a manual correction is needed.

Bad:

```tsx
<p>About Us</p>
```

Good:

```tsx
<p>{i18n("about")}</p>
```

---

## Naming Conventions

Prefer semantic names:

```json
{
    "Footer": {
        "copyright": "",
        "privacyPolicy": "",
        "terms": ""
    }
}
```

Avoid:

```json
{
    "Footer": {
        "text1": "",
        "text2": "",
        "text3": ""
    }
}
```

---

## Source Locale

The source locale is:

```text
es
```

All translations originate from Spanish and are generated from the content defined in `messages/es.json`.

## Available Commands

| Command | Description |
|----------|-------------|
| bun i18n:sync | Synchronize locale structure without translating |
| bun i18n:translate | Synchronize locale structure and translate missing values |
