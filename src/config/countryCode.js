let countryCode = {
  "CN": [13, "CHINA", "CN"],
  "US": [11, "UNITED STATES", "US"],
  "JP": [13, "JAPAN", "JP"],
  "CA": [11, "CANADA", "US"],
  "MX": [11, "MEXICO", "US"],
  "DE": [13, "GERMANY", "JP"],
  "GB": [13, "UNITED KINGDOM", "JP"],
  "IN": [13, "INDIA", "SG"],
  "IL": [13, "ISRAEL", "JP"],
  "KR": [13, "KOREA, REPUBLIC OF", "US"],
  "MY": [13, "MALAYSIA", "MY"],
  "RU": [13, "RUSSIAN FEDERATION", "JP"],
  "SG": [13, "SINGAPORE", "SG"],
  "TW": [11, "TAIWAN, PROVINCE OF CHINA", "TW"],
  "CZ": [13, "THE CZECH REPUBLIC", "JP"],
  "FR": [13, "FRANCE", "JP"],
  "ES": [13, "ESPAÑA", "JP"],
  "IT": [13, "Italy", "JP"],
  "SK": [13, "Slovak", "JP"],
  "PT": [13, "Portugal", "JP"],
  "RO": [13, "Romania", "JP"],
  "ZA": [13, "South Afica", "JP"],
}

let country5gChannel = {
  "CN": [36, 40, 44, 48, 149, 153, 157, 161, 165],
  "US": [36, 40, 44, 48, 149, 153, 157, 161], //US,CA,MX,KR,
  "SG": [36, 40, 44, 48, 149, 153, 157, 161, 165], //SG,IN
  "MY": [149, 153, 157, 161, 165], //MY
  "TW": [149, 153, 157, 161],
  "JP": [36, 40, 44, 48] //JP,GB,DE,EU,AF,IT,ES
}

exports.countryCode = countryCode;
exports.country5gChannel = country5gChannel;
