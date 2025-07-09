export function decimetersToFeetInches(decimeters: number): string {
  // 1 decimeter = 0.1 meters
  const meters = decimeters * 0.1;

  // 1 meter = 3.28084 feet
  const totalFeet = meters * 3.28084;

  // Get the whole number of feet
  const feet = Math.floor(totalFeet);

  // Get the remaining decimal part for inches
  const decimalFeet = totalFeet - feet;

  // 1 foot = 12 inches
  const inches = Math.round(decimalFeet * 12);

  // Handle cases where inches might round up to 12
  if (inches === 12) {
    return `${feet + 1}'00"`;
  } else {
    // Format inches to always have two digits
    const formattedInches = inches < 10 ? `0${inches}` : `${inches}`;
    return `${feet}'${formattedInches}"`;
  }
}

export function decimetersToMeters(decimeters: number): string {
  // 1 decimeter = 0.1 meters
  const meter = decimeters * 0.1;
  return meter.toFixed(1);
}

export function hectogramsToKilograms(hectograms: number): string {
  // 1 hectogram = 0.1 kilograms
  const kilograms = hectograms * 0.1;
  return kilograms.toFixed(1);
}

export function hectogramsToPounds(hectograms: number): string {
  // 1 hectogram = 0.220462 pounds (approximately)
  const pounds = hectograms * 0.220462;
  return pounds.toFixed(1);
}