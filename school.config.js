// Per-school configuration — the only file that changes between deployments.
// All components read from this file. Never hardcode school data in components.
//
// v2 shape (Phase 7): brand-level fields under BRAND, founder under FOUNDER,
// per-location data under BRANCHES[]. The legacy SCHOOL export is derived
// from BRAND + FOUNDER + the primary branch and exists only to keep v1
// components rendering until Phase 9 migrates them to useBranch().

export const BRAND = {
  name: 'Atharva Playschool',
  tagline: 'Where Little Stars Begin to Shine',
  yearFounded: '2019',
  admissionYear: '2025–26',
  fees: 'Contact us for current fee structure',
  officeHours: 'Mon–Sat, 9:00 AM – 6:00 PM',
  s3BaseUrl: 'https://your-bucket.s3.ap-south-1.amazonaws.com',
  domain: 'atharvaplays.in',
  social: {
    facebook: 'https://www.facebook.com/share/r/18gU3VU8ie/?mibextid=wwXIfr',
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/@',
  },
  milestones: [
    { year: '2019', emoji: '🏫', label: 'Atharva Playschool inaugurated at Karve', desc: 'A dream took shape — our first school opened its doors in Karve with a mission to nurture children through values and joyful learning.' },
    { year: '2020', emoji: '🎉', label: 'First Annual Day — Karve Branch', desc: 'Our students took the stage for the very first time. A memorable celebration of talent, culture, and proud families.' },
    { year: '2022', emoji: '🌱', label: 'Karad Branch Launched', desc: 'Growing strong! We expanded to Karad, bringing the same warmth and activity-based learning to a new community of families.' },
    { year: '2024', emoji: '⭐', label: 'Saidapur Branch Opened', desc: 'Our third home. Saidapur welcomed Atharva Playschool, extending our reach and our family across Maharashtra.' },
    { year: 'Today', emoji: '✨', label: 'A Growing Family Across Maharashtra', desc: 'Hundreds of happy children, three branches, and countless smiles — with more milestones on the horizon.' },
  ],
}

export const FOUNDER = {
  name: 'Adv. Minaakshi Pravin Pawar',
  title: 'Founder',
  experience: '10+ years',
  qualifications: 'M.A., LL.B.',
  specializations: 'Child Counseling Specialist | Certified Numerologist',
  photo: 'FOUNDER_S3_URL',
  bio: 'With a unique blend of law, psychology, and numerology, Adv. Minaakshi Pawar founded Atharva Playschool to create a space where every child is understood holistically — guiding not just their learning, but their inner growth and potential.',
  quote: 'A child who is seen, heard, and understood will grow to move the world.',
}

export const PRINCIPAL = {
  name: 'Pramila Jadhav',
  title: 'Principal & Head Teacher',
  experience: '18+ years',
  qualifications: 'B.A., B.Com',
  specializations: 'Supervisor | Early Childhood Educator | Activity-Based Learning Expert',
  photo: 'TEACHER_S3_URL',
  bio: 'With over 18 years of dedicated teaching experience, Pramila Jadhav shapes every classroom into a joyful, nurturing second home — blending Indian values with hands-on, activity-based learning that children carry with them for life.',
  quote: 'Every child is unique. My goal is not to teach them what to think, but to help them love learning.',
}

// Phone / WhatsApp are stored as digits-only (10–15 digits, country code first
// for WhatsApp). UI components add the `+`/`tel:`/`wa.me/` prefix at use site.
export const BRANCHES = [
  {
    slug: 'Karve',
    name: 'Atharva Playschool — Karve',
    shortName: 'Atharva Playschool Karve',
    isPrimary: true,
    address: {
      line1: 'A/P - Karve',
      line2: 'Opposite to Karve gram society, Karve Tal - Karad',
      city: 'Karad',
      state: 'Maharashtra',
      pin: '415110',
    },
    phone: '9423975130',
    whatsapp: '9423975130',
    email: 'rohan.jadhav0511@gmail.com',
    timing: {
      playschool: '10:00 AM – 1:00 PM',
      tuition: '4:00 PM – 7:00 PM',
    },
    batchSize: {
      playschool: 50,
      tuition: 15,
    },
    branchTeacher: null,
    photos: [],
    maps: {
      embedUrl: 'https://maps.app.goo.gl/gr4pSvGP9asRQVSp7',
      shortUrl: 'https://maps.app.goo.gl/gr4pSvGP9asRQVSp7',
      lat: 17.287,
      lng: 74.1843,
    },
    admissionStatus: 'open',
  },
  {
    slug: 'Karad',
    name: 'Atharva Playschool — Karad',
    shortName: 'Atharva Playschool Karad',
    isPrimary: false,
    address: {
      line1: '324/2, Shivaji Housing Society Rd, Yashwantrao Park',
      line2: 'Pawar Nagar, Karad',
      city: 'Karad',
      state: 'Maharashtra',
      pin: '415110',
    },
    phone: '9423975135',
    whatsapp: '9423975135',
    email: 'rohan.jadhav0511@gmail.com',
    timing: {
      playschool: '10:00 AM – 1:00 PM'
    },
    batchSize: {
      playschool: 40,
      tuition: 15,
    },
    branchTeacher: null,
    photos: [],
    maps: {
      embedUrl: 'https://maps.app.goo.gl/oMPKSNwWP39MpmKx8',
      shortUrl: 'https://maps.app.goo.gl/oMPKSNwWP39MpmKx8',
      lat: 17.6868,
      lng: 74.0183,
    },
    admissionStatus: 'open',
  },
  {
    slug: 'Saidapur',
    name: 'Atharva Playschool — Saidapur',
    shortName: 'Atharva Playschool Saidapur',
    isPrimary: false,
    address: {
      line1: '45 Placeholder Lane',
      line2: 'Placeholder Township',
      city: 'Pune',
      state: 'Maharashtra',
      pin: '411001',
    },
    phone: '9123456780',
    whatsapp: '919123456780',
    email: null,
    timing: {
      playschool: '10:00 AM – 1:00 PM',
      tuition: '4:00 PM – 7:00 PM',
    },
    batchSize: {
      playschool: 60,
      tuition: 20,
    },
    branchTeacher: null,
    photos: [],
    maps: {
      embedUrl: 'https://maps.app.goo.gl/JggCjm4AwMgqnLGx7',
      shortUrl: 'https://maps.app.goo.gl/JggCjm4AwMgqnLGx7',
      lat: 18.5204,
      lng: 73.8567,
    },
    admissionStatus: 'waitlist',
  },
]

const _primary = BRANCHES.find((b) => b.isPrimary) || BRANCHES[0]

// Backward-compat v1 export. Derived from BRAND + FOUNDER + primary branch.
// Slated for removal in Phase 9 once consumers move to useBranch().
export const SCHOOL = {
  name: BRAND.name,
  tagline: BRAND.tagline,
  phone: `+91-${_primary.phone}`,
  whatsapp: `+${_primary.whatsapp}`,
  email: _primary.email,
  address: {
    line1: _primary.address.line1,
    line2: _primary.address.line2,
    city: _primary.address.state || _primary.address.city,
    pin: _primary.address.pin,
  },
  teacher: PRINCIPAL,
  founder: FOUNDER,
  principal: PRINCIPAL,
  yearFounded: BRAND.yearFounded,
  admissionYear: BRAND.admissionYear,
  timing: {
    playschool: _primary.timing.playschool,
    tuition: _primary.timing.tuition,
    officeHours: BRAND.officeHours,
  },
  batchSize: _primary.batchSize,
  fees: BRAND.fees,
  s3BaseUrl: BRAND.s3BaseUrl,
  maps: {
    embedUrl: _primary.maps.embedUrl,
    shortUrl: _primary.maps.shortUrl,
  },
  social: BRAND.social,
  domain: BRAND.domain,
  milestones: BRAND.milestones,
}
