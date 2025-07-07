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

export function apalah() {
  const list_types = [
    {
      name: 'grass',
      weak_point: 0
    },
    {
      name: 'bug',
      weak_point: 0
    },
  ]

  const pokemon_types = [
    {
      name: 'grass',
      ddf: [
        {
          name: 'bug'
        },
        {
          name: 'flying'
        },
        {
          name: 'poison'
        },
        {
          name: 'fire'
        },
        {
          name: 'ice'
        },
      ],
      hdf: [
        {
          name: 'ground'
        },
        {
          name: 'water'
        },
        {
          name: 'grass'
        },
        {
          name: 'electric'
        },
      ]
    },
    {
      name: 'poison',
      ddf: [
        {
          name: 'ground'
        },
        {
          name: 'psychic'
        },
      ],
      hdf: [
        {
          name: 'fighting'
        },
        {
          name: 'poison'
        },
        {
          name: 'bug'
        },
        {
          name: 'grass'
        },
        {
          name: 'fairy'
        },
      ]
    },
  ]

  list_types.forEach((type, i_type) => {
    if(type.name === 'grass') {
      let weakPoint = 1
      pokemon_types.forEach(p_type => {
        const ddf_type = p_type.ddf.filter(hdf => hdf.name == type.name).length
        const hdf_type = p_type.hdf.filter(hdf => hdf.name == type.name).length

        let ddf_point = 0
        let hdf_point = 0

        if(ddf_type > 0){
          ddf_point = 2
        }

        if (hdf_type > 0) {
          hdf_point = 0.5
        }
        const weakCalc = ddf_point + hdf_point

        weakPoint = weakPoint * weakCalc
      });

      list_types[i_type].weak_point = weakPoint
    }
  });

  return list_types
}