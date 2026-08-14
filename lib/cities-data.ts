export interface PakistanCity {
  name: string;
  province: string;
  reportsCount: number;
  highPriorityCount: number;
  resolvedPercent: number;
  pins: Array<{
    id: string;
    name: string;
    issue: string;
    priority: "High" | "Medium" | "Logged";
    top: string;
    left: string;
  }>;
}

export interface ProvinceCities {
  province: string;
  cities: string[];
}

export const PAKISTAN_PROVINCES: ProvinceCities[] = [
  {
    province: "Punjab",
    cities: ["Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala", "Sialkot"],
  },
  {
    province: "Sindh",
    cities: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Mirpur Khas"],
  },
  {
    province: "Khyber Pakhtunkhwa",
    cities: ["Peshawar", "Mardan", "Abbottabad", "Mingora / Swat", "Dera Ismail Khan"],
  },
  {
    province: "Balochistan",
    cities: ["Quetta", "Gwadar", "Turbat", "Khuzdar"],
  },
  {
    province: "Islamabad Capital Territory",
    cities: ["Islamabad"],
  },
  {
    province: "Gilgit-Baltistan",
    cities: ["Gilgit", "Skardu"],
  },
  {
    province: "Azad Jammu and Kashmir",
    cities: ["Muzaffarabad", "Mirpur", "Rawalakot"],
  },
];

export const CITY_DATA: Record<string, PakistanCity> = {
  "Lahore": {
    name: "Lahore",
    province: "Punjab",
    reportsCount: 32,
    highPriorityCount: 8,
    resolvedPercent: 71,
    pins: [
      { id: "1", name: "Model Town", issue: "Blocked storm drain", priority: "High", top: "30%", left: "38%" },
      { id: "2", name: "Gulberg III", issue: "Garbage pile uncollected", priority: "Medium", top: "48%", left: "62%" },
      { id: "3", name: "DHA Phase 5", issue: "Deep road pothole", priority: "High", top: "22%", left: "70%" },
      { id: "4", name: "Johar Town", issue: "Broken streetlight pole", priority: "Logged", top: "68%", left: "28%" },
      { id: "5", name: "Garden Town", issue: "Water main leakage", priority: "Medium", top: "82%", left: "54%" },
      { id: "6", name: "Anarkali", issue: "Sewage overflow", priority: "High", top: "15%", left: "42%" },
    ],
  },
  "Karachi": {
    name: "Karachi",
    province: "Sindh",
    reportsCount: 45,
    highPriorityCount: 14,
    resolvedPercent: 64,
    pins: [
      { id: "1", name: "Clifton Block 2", issue: "Overflowing gutter", priority: "High", top: "72%", left: "35%" },
      { id: "2", name: "Gulshan-e-Iqbal", issue: "Road cave-in", priority: "High", top: "35%", left: "65%" },
      { id: "3", name: "Saddar", issue: "Streetlight fault", priority: "Medium", top: "50%", left: "45%" },
      { id: "4", name: "North Nazimabad", issue: "Garbage container overflow", priority: "Medium", top: "20%", left: "40%" },
      { id: "5", name: "Korangi Industrial", issue: "Drainage blockage", priority: "High", top: "60%", left: "78%" },
      { id: "6", name: "PECHS Block 6", issue: "Water line damaged", priority: "Logged", top: "42%", left: "52%" },
    ],
  },
  "Islamabad": {
    name: "Islamabad",
    province: "Islamabad Capital Territory",
    reportsCount: 19,
    highPriorityCount: 3,
    resolvedPercent: 84,
    pins: [
      { id: "1", name: "Sector F-7", issue: "Broken greenbelt light", priority: "Medium", top: "25%", left: "50%" },
      { id: "2", name: "Sector G-9", issue: "Clogged stormwater pipe", priority: "High", top: "45%", left: "40%" },
      { id: "3", name: "Blue Area", issue: "Pavement hazard", priority: "Logged", top: "35%", left: "60%" },
      { id: "4", name: "Sector I-8", issue: "Waste accumulation", priority: "Medium", top: "65%", left: "55%" },
      { id: "5", name: "Sector E-11", issue: "Road surface damage", priority: "High", top: "18%", left: "30%" },
    ],
  },
  "Rawalpindi": {
    name: "Rawalpindi",
    province: "Punjab",
    reportsCount: 26,
    highPriorityCount: 7,
    resolvedPercent: 68,
    pins: [
      { id: "1", name: "Raja Bazar", issue: "Drainage overflow", priority: "High", top: "32%", left: "45%" },
      { id: "2", name: "Saddar", issue: "Broken signal light", priority: "Logged", top: "50%", left: "52%" },
      { id: "3", name: "Satellite Town", issue: "Garbage corner dump", priority: "Medium", top: "25%", left: "68%" },
      { id: "4", name: "Westridge", issue: "Water line leak", priority: "Medium", top: "60%", left: "30%" },
      { id: "5", name: "Murree Road", issue: "Pothole on fast lane", priority: "High", top: "40%", left: "58%" },
    ],
  },
  "Peshawar": {
    name: "Peshawar",
    province: "Khyber Pakhtunkhwa",
    reportsCount: 22,
    highPriorityCount: 6,
    resolvedPercent: 69,
    pins: [
      { id: "1", name: "University Town", issue: "Blocked main drain", priority: "High", top: "35%", left: "30%" },
      { id: "2", name: "Hayatabad Phase 3", issue: "Streetlight outage", priority: "Logged", top: "55%", left: "25%" },
      { id: "3", name: "Saddar Road", issue: "Road patch broken", priority: "Medium", top: "45%", left: "55%" },
      { id: "4", name: "Gulbahar", issue: "Uncollected waste", priority: "High", top: "40%", left: "75%" },
      { id: "5", name: "City Circular Rd", issue: "Water leakage", priority: "Medium", top: "25%", left: "65%" },
    ],
  },
  "Quetta": {
    name: "Quetta",
    province: "Balochistan",
    reportsCount: 16,
    highPriorityCount: 5,
    resolvedPercent: 62,
    pins: [
      { id: "1", name: "Jinnah Road", issue: "Drain obstruction", priority: "High", top: "40%", left: "50%" },
      { id: "2", name: "Zarghoon Road", issue: "Streetlight fault", priority: "Logged", top: "55%", left: "60%" },
      { id: "3", name: "Sariab Road", issue: "Road surface rutting", priority: "High", top: "70%", left: "40%" },
      { id: "4", name: "Satellite Town", issue: "Water pipeline fault", priority: "Medium", top: "30%", left: "65%" },
      { id: "5", name: "Chaman Phatak", issue: "Solid waste dump", priority: "Medium", top: "22%", left: "38%" },
    ],
  },
};

/**
 * Returns city data or dynamically generates realistic structured seed data for any requested city
 */
export function getCityPulseData(cityName: string, provinceName?: string): PakistanCity {
  if (CITY_DATA[cityName]) {
    return CITY_DATA[cityName];
  }

  // Generate deterministic realistic fallback for any city in the province list
  let province = provinceName || "Pakistan";
  if (!provinceName) {
    for (const prov of PAKISTAN_PROVINCES) {
      if (prov.cities.includes(cityName)) {
        province = prov.province;
        break;
      }
    }
  }

  return {
    name: cityName,
    province,
    reportsCount: 18,
    highPriorityCount: 4,
    resolvedPercent: 74,
    pins: [
      { id: "1", name: `${cityName} Center`, issue: "Blocked roadside drain", priority: "High", top: "32%", left: "45%" },
      { id: "2", name: `${cityName} Main Bazaar`, issue: "Garbage accumulation", priority: "Medium", top: "52%", left: "60%" },
      { id: "3", name: `${cityName} Civil Lines`, issue: "Streetlight unlit", priority: "Logged", top: "25%", left: "68%" },
      { id: "4", name: `${cityName} Housing Colony`, issue: "Water pipe pressure loss", priority: "Medium", top: "68%", left: "32%" },
      { id: "5", name: `${cityName} Bypass`, issue: "Dangerous road pothole", priority: "High", top: "78%", left: "55%" },
    ],
  };
}
