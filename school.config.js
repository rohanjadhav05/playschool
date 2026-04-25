// Per-school configuration — the only file that changes between deployments.
// All components read from this file. Never hardcode school data in components.
export const SCHOOL = {
  name: 'Atharva Playschool',
  tagline: 'Where Little Stars Begin to Shine',
  phone: '+91-XXXXXXXXXX',
  whatsapp: '+91XXXXXXXXXX', // no spaces or dashes — used directly in wa.me URL
  email: 'contact@atharvaplays.in',
  address: {
    line1: 'A/P - Karve',
    line2: 'Tal - Karad',
    city: 'Maharashtra',
    pin: '415110',
  },
  teacher: {
    name: 'Teacher Name',
    title: 'Founder & Head Teacher',
    experience: 'X years',
    qualifications: 'B.Ed, Early Childhood Education',
    photo: 'TEACHER_S3_URL',
    bio: [
      'Placeholder bio paragraph 1 — personal story, why they started the school.',
      'Placeholder bio paragraph 2 — teaching approach, activity-based, value-driven.',
      'Placeholder bio paragraph 3 — what makes this school different.',
    ],
    quote:
      'Every child is unique. My goal is not to teach them what to think, but to help them love learning.',
  },
  yearFounded: 'YYYY',
  admissionYear: '2025–26',
  timing: {
    playschool: '10:00 AM – 1:00 PM',
    tuition: '4:00 PM – 7:00 PM',
    officeHours: 'Mon–Sat, 9:00 AM – 6:00 PM',
  },
  batchSize: {
    playschool: 15,
    tuition: 10,
  },
  fees: 'Contact us for current fee structure',
  s3BaseUrl: 'https://your-bucket.s3.ap-south-1.amazonaws.com',
  maps: {
    embedUrl: 'https://www.google.com/maps/embed?pb=PLACEHOLDER',
    shortUrl: 'https://maps.app.goo.gl/PLACEHOLDER',
  },
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/@',
  },
  domain: 'atharvaplays.in',
  milestones: [
    { year: 'YYYY', label: 'School established with a vision of value-based early education' },
    { year: 'YYYY', label: 'First Annual Day celebration' },
    { year: 'YYYY', label: 'Expanded tuition centre (1st–10th)' },
    { year: 'Today', label: 'Growing community of happy children and trusting parents' },
  ],
}
