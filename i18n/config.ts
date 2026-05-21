export const rtlLocales = ['ar']

export const isRtlLocale = (locale: string): boolean => {
	return rtlLocales.includes(locale)
}
