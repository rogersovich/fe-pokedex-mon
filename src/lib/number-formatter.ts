export function formatNumberWithThousandsSeparator(
  value: number | bigint, // Accepts both number and bigint
  locale: string = 'en-US', // Default to U.S. English for comma separation
  options?: Intl.NumberFormatOptions
): string {
  try {
    return new Intl.NumberFormat(locale, options).format(value);
  } catch (error) {
    console.error("Error formatting number:", error);
    // Fallback to a simpler string conversion if formatting fails
    return value.toString();
  }
}