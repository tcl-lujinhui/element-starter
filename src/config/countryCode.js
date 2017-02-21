let Channel5g ={
  "CN": [36, 40, 44, 48, 149, 153, 157, 161, 165],
  "US": [36, 40, 44, 48, 149, 153, 157, 161], //US,CA,MX,KR,
  "SG": [36, 40, 44, 48, 149, 153, 157, 161, 165], //SG,IN
  "MY": [149, 153, 157, 161, 165], //MY
  "TW": [149, 153, 157, 161],
  "JP": [36, 40, 44, 48] //JP,GB,DE,EU,AF,IT,ES
}

let countryCode = {
  "CN":["CHINA", 13, Channel5g.CN],
  "US":["UNITED STATES", 11, Channel5g.US],
  "JP":["JAPAN", 13, Channel5g.JP],
  "CA":["CANADA", 11, Channel5g.US],
  "MX":["MEXICO", 11, Channel5g.US],
  "DE":["GERMANY", 13, Channel5g.JP],
  "GB":["UNITED KINGDOM", 13, Channel5g.JP],
  "IN":["INDIA", 13, Channel5g.SG],
  "IL":["ISRAEL", 13, Channel5g.JP],
  "KR":["KOREA, REPUBLIC OF", 13, Channel5g.US],
  "MY":["MALAYSIA", 13, Channel5g.MY],
  "RU":["RUSSIAN FEDERATION", 13, Channel5g.JP],
  "SG":["SINGAPORE", 13, "SG"],
  "TW":["TAIWAN, PROVINCE OF CHINA", 11, Channel5g.TW],
  "CZ":["THE CZECH REPUBLIC", 13, Channel5g.JP],
  "FR":["FRANCE", 13, Channel5g.JP],
  "ES":["ESPAÑA", 13, Channel5g.JP],
  "IT":["Italy", 13, Channel5g.JP],
  "SK":["Slovak", 13, Channel5g.JP],
  "PT":["Portugal", 13, Channel5g.JP],
  "RO":["Romania", 13, Channel5g.JP],
  "ZA":["South Afica", 13, Channel5g.JP],
}

export default countryCode;
