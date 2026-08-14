export type IssueCategory =
  | "Drainage"
  | "Garbage"
  | "Road"
  | "Streetlight"
  | "Water"
  | "Safety"
  | "Other";

export type Priority = "High" | "Medium" | "Low";

export type ReportStatus = "Needs action" | "Reviewing" | "Logged" | "Resolved";

export interface NationalIssueReport {
  id: string;
  title: string;
  category: IssueCategory;
  priority: Priority;
  city: string;
  provinceOrTerritory: string;
  neighborhood?: string;
  latitude: number;
  longitude: number;
  status: ReportStatus;
  time: string;
  summary: string;
  suggestedDepartment: string;
  recommendedAction?: string;
  complaintDraft?: string;
}

export interface RegionView {
  name: string;
  center: [number, number];
  zoom: number;
}

export const PAKISTAN_VIEW: RegionView = {
  name: "All Pakistan",
  center: [30.3753, 69.3451],
  zoom: 5,
};

export const PROVINCE_VIEWS: Record<string, RegionView> = {
  "Punjab": {
    name: "Punjab",
    center: [31.1704, 72.7097],
    zoom: 7,
  },
  "Sindh": {
    name: "Sindh",
    center: [25.8943, 68.5247],
    zoom: 7,
  },
  "Khyber Pakhtunkhwa": {
    name: "Khyber Pakhtunkhwa",
    center: [34.9526, 72.3311],
    zoom: 7,
  },
  "Balochistan": {
    name: "Balochistan",
    center: [28.4907, 65.0958],
    zoom: 6,
  },
  "Islamabad Capital Territory": {
    name: "Islamabad Capital Territory",
    center: [33.6844, 73.0479],
    zoom: 11,
  },
  "Gilgit-Baltistan": {
    name: "Gilgit-Baltistan",
    center: [35.8026, 74.9832],
    zoom: 7,
  },
  "Azad Jammu and Kashmir": {
    name: "Azad Jammu and Kashmir",
    center: [33.9259, 73.7810],
    zoom: 8,
  },
};

export interface CityLocation {
  name: string;
  province: string;
  center: [number, number];
  zoom: number;
}

export const PAKISTAN_CITIES: CityLocation[] = [
  // Punjab
  { name: "Lahore", province: "Punjab", center: [31.5204, 74.3587], zoom: 11 },
  { name: "Faisalabad", province: "Punjab", center: [31.4504, 73.1350], zoom: 11 },
  { name: "Rawalpindi", province: "Punjab", center: [33.5651, 73.0169], zoom: 11 },
  { name: "Multan", province: "Punjab", center: [30.1575, 71.5249], zoom: 11 },
  { name: "Gujranwala", province: "Punjab", center: [32.1877, 74.1945], zoom: 11 },
  { name: "Sialkot", province: "Punjab", center: [32.4945, 74.5229], zoom: 11 },

  // Sindh
  { name: "Karachi", province: "Sindh", center: [24.8607, 67.0011], zoom: 11 },
  { name: "Hyderabad", province: "Sindh", center: [25.3960, 68.3578], zoom: 11 },
  { name: "Sukkur", province: "Sindh", center: [27.7052, 68.8574], zoom: 11 },
  { name: "Larkana", province: "Sindh", center: [27.5589, 68.2020], zoom: 11 },

  // Khyber Pakhtunkhwa
  { name: "Peshawar", province: "Khyber Pakhtunkhwa", center: [34.0151, 71.5249], zoom: 11 },
  { name: "Mardan", province: "Khyber Pakhtunkhwa", center: [34.1989, 72.0404], zoom: 11 },
  { name: "Abbottabad", province: "Khyber Pakhtunkhwa", center: [34.1688, 73.2215], zoom: 11 },
  { name: "Mingora / Swat", province: "Khyber Pakhtunkhwa", center: [34.7717, 72.3602], zoom: 11 },
  { name: "Dera Ismail Khan", province: "Khyber Pakhtunkhwa", center: [31.8327, 70.9024], zoom: 11 },

  // Balochistan
  { name: "Quetta", province: "Balochistan", center: [30.1798, 66.9750], zoom: 11 },
  { name: "Gwadar", province: "Balochistan", center: [25.1264, 62.3226], zoom: 11 },
  { name: "Turbat", province: "Balochistan", center: [26.0031, 63.0544], zoom: 11 },
  { name: "Khuzdar", province: "Balochistan", center: [27.8119, 66.6177], zoom: 11 },

  // Islamabad
  { name: "Islamabad", province: "Islamabad Capital Territory", center: [33.6844, 73.0479], zoom: 11 },

  // Gilgit-Baltistan
  { name: "Gilgit", province: "Gilgit-Baltistan", center: [35.9221, 74.3087], zoom: 11 },
  { name: "Skardu", province: "Gilgit-Baltistan", center: [35.2971, 75.6333], zoom: 11 },

  // Azad Jammu and Kashmir
  { name: "Muzaffarabad", province: "Azad Jammu and Kashmir", center: [34.3700, 73.4711], zoom: 11 },
  { name: "Mirpur", province: "Azad Jammu and Kashmir", center: [33.1484, 73.7519], zoom: 11 },
  { name: "Rawalakot", province: "Azad Jammu and Kashmir", center: [33.8584, 73.7610], zoom: 11 },
];

export const NATIONAL_DEMO_REPORTS: NationalIssueReport[] = [
  // 1. Lahore Blocked Drain (Core Scenario)
  {
    id: "PK-LHR-001",
    title: "Blocked drainage near school",
    category: "Drainage",
    priority: "High",
    city: "Lahore",
    provinceOrTerritory: "Punjab",
    neighborhood: "Model Town",
    latitude: 31.4797,
    longitude: 74.3188,
    status: "Needs action",
    time: "15m ago",
    summary: "Severe water accumulation outside primary school entrance following monsoon rainfall. A clogged storm sewer is preventing student foot access.",
    suggestedDepartment: "Water and Sanitation Agency, Lahore",
    recommendedAction: "Inspect and clear the blocked drain near the school entrance.",
  },
  // 2. Lahore Garbage
  {
    id: "PK-LHR-002",
    title: "Garbage collection delayed",
    category: "Garbage",
    priority: "Medium",
    city: "Lahore",
    provinceOrTerritory: "Punjab",
    neighborhood: "Gulberg III",
    latitude: 31.5122,
    longitude: 74.3541,
    status: "Reviewing",
    time: "1h ago",
    summary: "Uncollected municipal waste heap for over 7 days attracting stray animals and blocking half the residential service road.",
    suggestedDepartment: "Lahore Waste Management Company (LWMC)",
  },
  // 3. Karachi Streetlight
  {
    id: "PK-KHI-001",
    title: "Streetlight not working",
    category: "Streetlight",
    priority: "Low",
    city: "Karachi",
    provinceOrTerritory: "Sindh",
    neighborhood: "Clifton Block 2",
    latitude: 24.8188,
    longitude: 67.0289,
    status: "Logged",
    time: "2h ago",
    summary: "Four consecutive street lighting poles out of order along main avenue, creating hazardous blind spots at night.",
    suggestedDepartment: "Karachi Metropolitan Corporation (KMC)",
  },
  // 4. Faisalabad Pothole
  {
    id: "PK-FSD-001",
    title: "Dangerous pothole on main road",
    category: "Road",
    priority: "High",
    city: "Faisalabad",
    provinceOrTerritory: "Punjab",
    neighborhood: "Satiana Road",
    latitude: 31.4187,
    longitude: 73.1124,
    status: "Needs action",
    time: "3h ago",
    summary: "Deep 3-foot crater in the fast lane causing severe traffic gridlock and two motorcycle tire damage incidents.",
    suggestedDepartment: "Faisalabad Development Authority (FDA)",
  },
  // 5. Peshawar Water Supply
  {
    id: "PK-PEW-001",
    title: "Water supply interruption",
    category: "Water",
    priority: "Medium",
    city: "Peshawar",
    provinceOrTerritory: "Khyber Pakhtunkhwa",
    neighborhood: "University Town",
    latitude: 34.0041,
    longitude: 71.4922,
    status: "Reviewing",
    time: "4h ago",
    summary: "Main pipeline rupture resulting in total potable water supply loss across three residential blocks for 36 hours.",
    suggestedDepartment: "Water and Sanitation Services Peshawar (WSSP)",
  },
  // 6. Quetta Road Damage
  {
    id: "PK-QTA-001",
    title: "Road damage after rainfall",
    category: "Road",
    priority: "High",
    city: "Quetta",
    provinceOrTerritory: "Balochistan",
    neighborhood: "Sariab Road",
    latitude: 30.1554,
    longitude: 66.9821,
    status: "Needs action",
    time: "5h ago",
    summary: "Flash runoff eroded the road shoulder and washed away asphalt sub-base, restricting transport to single-lane.",
    suggestedDepartment: "Quetta Metropolitan Corporation (QMC)",
  },
  // 7. Multan Waste
  {
    id: "PK-MUX-001",
    title: "Waste collection issue",
    category: "Garbage",
    priority: "Medium",
    city: "Multan",
    provinceOrTerritory: "Punjab",
    neighborhood: "Bosan Road",
    latitude: 30.2201,
    longitude: 71.4877,
    status: "Logged",
    time: "6h ago",
    summary: "Commercial market dumpster overflowing onto pedestrian walkways and storm runoffs.",
    suggestedDepartment: "Multan Waste Management Company (MWMC)",
  },
  // 8. Hyderabad Drainage
  {
    id: "PK-HYD-001",
    title: "Drainage overflow report",
    category: "Drainage",
    priority: "High",
    city: "Hyderabad",
    provinceOrTerritory: "Sindh",
    neighborhood: "Latifabad Unit 7",
    latitude: 25.3721,
    longitude: 68.3614,
    status: "Needs action",
    time: "7h ago",
    summary: "Sewage line backpressure flooding neighborhood street with contaminated stagnant water.",
    suggestedDepartment: "Water and Sanitation Agency (WASA), Hyderabad",
  },
  // 9. Gilgit Streetlight
  {
    id: "PK-GIL-001",
    title: "Broken streetlight near market",
    category: "Streetlight",
    priority: "Low",
    city: "Gilgit",
    provinceOrTerritory: "Gilgit-Baltistan",
    neighborhood: "Naya Bazar",
    latitude: 35.9198,
    longitude: 74.3122,
    status: "Logged",
    time: "8h ago",
    summary: "Main commercial alleyway dark after twilight due to damaged connection box.",
    suggestedDepartment: "Gilgit Municipal Corporation",
  },
  // 10. Muzaffarabad Road Access
  {
    id: "PK-MZD-001",
    title: "Road access concern",
    category: "Safety",
    priority: "Medium",
    city: "Muzaffarabad",
    provinceOrTerritory: "Azad Jammu and Kashmir",
    neighborhood: "Neelum Road Bypass",
    latitude: 34.3789,
    longitude: 73.4801,
    status: "Reviewing",
    time: "9h ago",
    summary: "Minor landslip debris obstructing hillside access curve, requiring municipal grader clearance.",
    suggestedDepartment: "AJK Highways & Municipal Board",
  },
  // 11. Islamabad Stormwater
  {
    id: "PK-ISB-001",
    title: "Clogged stormwater channel",
    category: "Drainage",
    priority: "High",
    city: "Islamabad",
    provinceOrTerritory: "Islamabad Capital Territory",
    neighborhood: "Sector G-9/4",
    latitude: 33.6891,
    longitude: 73.0298,
    status: "Needs action",
    time: "10h ago",
    summary: "Major culvert choked with urban debris near public park, causing localized flooding during rain showers.",
    suggestedDepartment: "Capital Development Authority (CDA), Islamabad",
  },
  // 12. Rawalpindi Signal Light
  {
    id: "PK-RWP-001",
    title: "Damaged intersection signal",
    category: "Streetlight",
    priority: "Medium",
    city: "Rawalpindi",
    provinceOrTerritory: "Punjab",
    neighborhood: "Chandni Chowk",
    latitude: 33.6189,
    longitude: 73.0722,
    status: "Reviewing",
    time: "11h ago",
    summary: "Traffic light head damaged by storm wind, creating gridlock during peak school rush hours.",
    suggestedDepartment: "Rawalpindi Development Authority (RDA)",
  },
  // 13. Gujranwala Road Hole
  {
    id: "PK-GUJ-001",
    title: "Broken asphalt on industrial route",
    category: "Road",
    priority: "High",
    city: "Gujranwala",
    provinceOrTerritory: "Punjab",
    neighborhood: "GT Road bypass",
    latitude: 32.1944,
    longitude: 74.2055,
    status: "Needs action",
    time: "12h ago",
    summary: "Multiple deep road fractures damaging freight trucks and small vehicle suspensions.",
    suggestedDepartment: "Gujranwala Waste & Works Authority",
  },
  // 14. Sialkot Clean Water Line
  {
    id: "PK-SKT-001",
    title: "Clean water pipeline burst",
    category: "Water",
    priority: "Medium",
    city: "Sialkot",
    provinceOrTerritory: "Punjab",
    neighborhood: "Kashmir Road",
    latitude: 32.5011,
    longitude: 74.5388,
    status: "Reviewing",
    time: "13h ago",
    summary: "High pressure line leaking thousands of liters per hour and eroding road pavement.",
    suggestedDepartment: "Sialkot Municipal Corporation",
  },
  // 15. Sukkur River Embankment
  {
    id: "PK-SKR-001",
    title: "Embankment garbage dumping",
    category: "Garbage",
    priority: "Medium",
    city: "Sukkur",
    provinceOrTerritory: "Sindh",
    neighborhood: "Barrage Colony",
    latitude: 27.7011,
    longitude: 68.8611,
    status: "Logged",
    time: "14h ago",
    summary: "Illegal solid waste dumping along barrage approach road affecting public health.",
    suggestedDepartment: "Sukkur Municipal Corporation",
  },
  // 16. Larkana Drainage
  {
    id: "PK-LRK-001",
    title: "Open manhole hazard",
    category: "Safety",
    priority: "High",
    city: "Larkana",
    provinceOrTerritory: "Sindh",
    neighborhood: "Station Road",
    latitude: 27.5622,
    longitude: 68.2119,
    status: "Needs action",
    time: "15h ago",
    summary: "Missing concrete manhole cover on busy pedestrian sidewalk without warning barricades.",
    suggestedDepartment: "Larkana Municipal Administration",
  },
  // 17. Mardan Potholes
  {
    id: "PK-MDN-001",
    title: "Potholed market bypass",
    category: "Road",
    priority: "Medium",
    city: "Mardan",
    provinceOrTerritory: "Khyber Pakhtunkhwa",
    neighborhood: "Nowshera Road",
    latitude: 34.1955,
    longitude: 72.0355,
    status: "Resolved",
    time: "1d ago",
    summary: "Road repaved after citizen reports submitted to municipal works division.",
    suggestedDepartment: "WSSCM Mardan",
  },
  // 18. Abbottabad Water
  {
    id: "PK-ABT-001",
    title: "Supply pipe contamination concern",
    category: "Water",
    priority: "High",
    city: "Abbottabad",
    provinceOrTerritory: "Khyber Pakhtunkhwa",
    neighborhood: "Supply Bazar",
    latitude: 34.1722,
    longitude: 73.2301,
    status: "Reviewing",
    time: "1d ago",
    summary: "Turbid water flow following hillside construction requiring filtration inspection.",
    suggestedDepartment: "Water and Sanitation Services Abbottabad (WSSCA)",
  },
  // 19. Swat Streetlight
  {
    id: "PK-SWT-001",
    title: "Unlit river bridge",
    category: "Streetlight",
    priority: "Low",
    city: "Mingora / Swat",
    provinceOrTerritory: "Khyber Pakhtunkhwa",
    neighborhood: "Fizagat Bridge",
    latitude: 34.7891,
    longitude: 72.3788,
    status: "Resolved",
    time: "1d ago",
    summary: "Solar lighting units repaired and restored by local council.",
    suggestedDepartment: "Mingora Town Municipal Authority",
  },
  // 20. DI Khan Drainage
  {
    id: "PK-DIK-001",
    title: "Stagnant rainwater in residential zone",
    category: "Drainage",
    priority: "High",
    city: "Dera Ismail Khan",
    provinceOrTerritory: "Khyber Pakhtunkhwa",
    neighborhood: "Circular Road",
    latitude: 31.8388,
    longitude: 70.9122,
    status: "Needs action",
    time: "1d ago",
    summary: "Rainwater accumulated for 5 days near local health clinic causing mosquito breeding.",
    suggestedDepartment: "WSSC DI Khan",
  },
  // 21. Gwadar Waste
  {
    id: "PK-GWD-001",
    title: "Port road waste bin shortage",
    category: "Garbage",
    priority: "Medium",
    city: "Gwadar",
    provinceOrTerritory: "Balochistan",
    neighborhood: "Marine Drive",
    latitude: 25.1211,
    longitude: 62.3311,
    status: "Logged",
    time: "1d ago",
    summary: "Public promenade lacking covered waste bins, leading to windblown plastic litter.",
    suggestedDepartment: "Gwadar Development Authority (GDA)",
  },
  // 22. Turbat Water Line
  {
    id: "PK-TRB-001",
    title: "Low pressure in city network",
    category: "Water",
    priority: "Medium",
    city: "Turbat",
    provinceOrTerritory: "Balochistan",
    neighborhood: "Absor Road",
    latitude: 26.0112,
    longitude: 63.0611,
    status: "Reviewing",
    time: "1d ago",
    summary: "Gravity feed pipeline valve jammed, reducing municipal water availability.",
    suggestedDepartment: "Public Health Engineering Department Turbat",
  },
  // 23. Khuzdar Road Hazard
  {
    id: "PK-KHZ-001",
    title: "Bridge approach erosion",
    category: "Road",
    priority: "High",
    city: "Khuzdar",
    provinceOrTerritory: "Balochistan",
    neighborhood: "RCD Highway junction",
    latitude: 27.8188,
    longitude: 66.6233,
    status: "Needs action",
    time: "2d ago",
    summary: "Culvert abutment showing erosion after hill torrents; heavy vehicles at risk.",
    suggestedDepartment: "National Highway Authority (NHA) / District Council",
  },
  // 24. Skardu Solar Light
  {
    id: "PK-SKD-001",
    title: "Airport road streetlight fault",
    category: "Streetlight",
    priority: "Low",
    city: "Skardu",
    provinceOrTerritory: "Gilgit-Baltistan",
    neighborhood: "Skardu Main Road",
    latitude: 35.3055,
    longitude: 75.6411,
    status: "Resolved",
    time: "2d ago",
    summary: "Solar battery replacements completed by Gilgit-Baltistan works division.",
    suggestedDepartment: "Skardu Municipal Committee",
  },
  // 25. Mirpur AJK Drainage
  {
    id: "PK-MRP-001",
    title: "Sector C drain blockage",
    category: "Drainage",
    priority: "Medium",
    city: "Mirpur",
    provinceOrTerritory: "Azad Jammu and Kashmir",
    neighborhood: "Sector C-4",
    latitude: 33.1522,
    longitude: 73.7601,
    status: "Resolved",
    time: "2d ago",
    summary: "De-silting operation completed by Mirpur Municipal Development Authority.",
    suggestedDepartment: "Mirpur Development Authority (MDA)",
  },
  // 26. Rawalakot Road Patch
  {
    id: "PK-RWK-001",
    title: "Frost heave road damage",
    category: "Road",
    priority: "Medium",
    city: "Rawalakot",
    provinceOrTerritory: "Azad Jammu and Kashmir",
    neighborhood: "Plandri Road",
    latitude: 33.8611,
    longitude: 73.7688,
    status: "Reviewing",
    time: "2d ago",
    summary: "Winter frost damage creating uneven road steps for commuter vans.",
    suggestedDepartment: "AJK Public Works Department",
  },
];
