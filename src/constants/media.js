import { SCHOOL } from '../../school.config.js'

const S3 = SCHOOL.s3BaseUrl
const ACT = '/activities'
const karve = '/karve'
const karad = '/karad'

// aspect cycles: 1→square, 2→video, 0→portrait (id % 3)
function aspect(id) {
  const r = id % 3
  if (r === 1) return 'square'
  if (r === 2) return 'video'
  return 'portrait'
}

export const MEDIA = {
  hero: {
    main: `${S3}/hero/hero-main.webp`,
    mobile: `${S3}/hero/hero-main-mobile.webp`,
  },
  activities: {
    art1: `${karad}/images/image5.webp`,
    art2: `${karve}/images/image12.webp`,
    earlylearning1: `${karad}/images/image12.webp`,
    earlylearning2: `${karad}/images/image11.webp`,
    festival1: `${karad}/images/image5.webp`,
    festival2: `${karad}/images/image3.webp`,
    festivalVideo: `${karad}/videos/1/index.m3u8`,
    festivalPoster: null,
    fieldvisits1: `${karve}/images/image19.webp`,
    confidence1: `${karad}/images/image19.webp`,
    habits1: `${ACT}/habits-1.jpg`,
    habits2: `${ACT}/habits-2.jpg`,
    stageVideo: null,
    stagePoster: null,
  },
  about: {
    teacher: `${S3}/about/teacher-profile.webp`,
    founder: `${S3}/about/founder-profile.webp`,
    classroom: `${S3}/about/classroom.webp`,
  },
  gallery: {
    items: [
      // ── Karve images 1–34 ─────────────────────────────────────────────────
      // Activities (1–10)
      { id: 1,  type: 'image', branch: 'karve', src: `${karve}/images/image1.webp`,  category: 'activities', caption: 'Art & Craft Session',      aspect: aspect(1)  },
      { id: 2,  type: 'image', branch: 'karve', src: `${karve}/images/image2.webp`,  category: 'activities', caption: 'Creative Activity',          aspect: aspect(2)  },
      { id: 3,  type: 'image', branch: 'karve', src: `${karve}/images/image3.webp`,  category: 'activities', caption: 'Hands-on Learning',           aspect: aspect(3)  },
      { id: 4,  type: 'image', branch: 'karve', src: `${karve}/images/image4.webp`,  category: 'activities', caption: 'Craft Workshop',              aspect: aspect(4)  },
      { id: 5,  type: 'image', branch: 'karve', src: `${karve}/images/image5.webp`,  category: 'activities', caption: 'Art Time',                    aspect: aspect(5)  },
      { id: 6,  type: 'image', branch: 'karve', src: `${karve}/images/image6.webp`,  category: 'activities', caption: 'Creative Play',               aspect: aspect(6)  },
      { id: 7,  type: 'image', branch: 'karve', src: `${karve}/images/image7.webp`,  category: 'activities', caption: 'Drawing Activity',             aspect: aspect(7)  },
      { id: 8,  type: 'image', branch: 'karve', src: `${karve}/images/image8.webp`,  category: 'activities', caption: 'Learning Through Play',        aspect: aspect(8)  },
      { id: 9,  type: 'image', branch: 'karve', src: `${karve}/images/image9.webp`,  category: 'activities', caption: 'Fun Activity',                 aspect: aspect(9)  },
      { id: 10, type: 'image', branch: 'karve', src: `${karve}/images/image10.webp`, category: 'activities', caption: 'Creative Workshop',            aspect: aspect(10) },
      // Playschool (11–18)
      { id: 11, type: 'image', branch: 'karve', src: `${karve}/images/image11.webp`, category: 'playschool', caption: 'Morning Circle',               aspect: aspect(11) },
      { id: 12, type: 'image', branch: 'karve', src: `${karve}/images/image12.webp`, category: 'playschool', caption: 'Classroom Activity',           aspect: aspect(12) },
      { id: 13, type: 'image', branch: 'karve', src: `${karve}/images/image13.webp`, category: 'playschool', caption: 'Group Learning',               aspect: aspect(13) },
      { id: 14, type: 'image', branch: 'karve', src: `${karve}/images/image14.webp`, category: 'playschool', caption: 'Story Time',                   aspect: aspect(14) },
      { id: 15, type: 'image', branch: 'karve', src: `${karve}/images/image15.webp`, category: 'playschool', caption: 'Circle Time',                  aspect: aspect(15) },
      { id: 16, type: 'image', branch: 'karve', src: `${karve}/images/image16.webp`, category: 'playschool', caption: 'Classroom Fun',                aspect: aspect(16) },
      { id: 17, type: 'image', branch: 'karve', src: `${karve}/images/image17.webp`, category: 'playschool', caption: 'Morning Routine',              aspect: aspect(17) },
      { id: 18, type: 'image', branch: 'karve', src: `${karve}/images/image18.webp`, category: 'playschool', caption: 'Learning Time',                aspect: aspect(18) },
      // Festivals (19–26)
      { id: 19, type: 'image', branch: 'karve', src: `${karve}/images/image19.webp`, category: 'festivals',  caption: 'Festival Celebration',         aspect: aspect(19) },
      { id: 20, type: 'image', branch: 'karve', src: `${karve}/images/image20.webp`, category: 'festivals',  caption: 'Festive Decoration',           aspect: aspect(20) },
      { id: 21, type: 'image', branch: 'karve', src: `${karve}/images/image21.webp`, category: 'festivals',  caption: 'Cultural Program',             aspect: aspect(21) },
      { id: 22, type: 'image', branch: 'karve', src: `${karve}/images/image22.webp`, category: 'festivals',  caption: 'Festival Activity',            aspect: aspect(22) },
      { id: 23, type: 'image', branch: 'karve', src: `${karve}/images/image23.webp`, category: 'festivals',  caption: 'Celebration Time',             aspect: aspect(23) },
      { id: 24, type: 'image', branch: 'karve', src: `${karve}/images/image24.webp`, category: 'festivals',  caption: 'Festive Fun',                  aspect: aspect(24) },
      { id: 25, type: 'image', branch: 'karve', src: `${karve}/images/image25.webp`, category: 'festivals',  caption: 'Cultural Celebration',         aspect: aspect(25) },
      { id: 26, type: 'image', branch: 'karve', src: `${karve}/images/image26.webp`, category: 'festivals',  caption: 'Festival Programme',           aspect: aspect(26) },
      // Events (27–34)
      { id: 27, type: 'image', branch: 'karve', src: `${karve}/images/image27.webp`, category: 'events',     caption: 'School Event',                 aspect: aspect(27) },
      { id: 28, type: 'image', branch: 'karve', src: `${karve}/images/image28.webp`, category: 'events',     caption: 'Annual Programme',             aspect: aspect(28) },
      { id: 29, type: 'image', branch: 'karve', src: `${karve}/images/image29.webp`, category: 'events',     caption: 'Special Day',                  aspect: aspect(29) },
      { id: 30, type: 'image', branch: 'karve', src: `${karve}/images/image30.webp`, category: 'events',     caption: 'Prize Distribution',           aspect: aspect(30) },
      { id: 31, type: 'image', branch: 'karve', src: `${karve}/images/image31.webp`, category: 'events',     caption: 'Special Programme',            aspect: aspect(31) },
      { id: 32, type: 'image', branch: 'karve', src: `${karve}/images/image32.webp`, category: 'events',     caption: 'Event Day',                    aspect: aspect(32) },
      { id: 33, type: 'image', branch: 'karve', src: `${karve}/images/image33.webp`, category: 'events',     caption: 'School Celebration',           aspect: aspect(33) },
      { id: 34, type: 'image', branch: 'karve', src: `${karve}/images/image34.webp`, category: 'events',     caption: 'Annual Day',                   aspect: aspect(34) },

      // ── Karad images 1–22 ─────────────────────────────────────────────────
      // Activities (35–40)
      { id: 35, type: 'image', branch: 'karad', src: `${karad}/images/image1.webp`,  category: 'activities', caption: 'Art Activity',                 aspect: aspect(35) },
      { id: 36, type: 'image', branch: 'karad', src: `${karad}/images/image2.webp`,  category: 'activities', caption: 'Craft Session',                aspect: aspect(36) },
      { id: 37, type: 'image', branch: 'karad', src: `${karad}/images/image3.webp`,  category: 'activities', caption: 'Creative Workshop',            aspect: aspect(37) },
      { id: 38, type: 'image', branch: 'karad', src: `${karad}/images/image4.webp`,  category: 'activities', caption: 'Hands-on Activity',            aspect: aspect(38) },
      { id: 39, type: 'image', branch: 'karad', src: `${karad}/images/image5.webp`,  category: 'activities', caption: 'Art & Craft',                  aspect: aspect(39) },
      { id: 40, type: 'image', branch: 'karad', src: `${karad}/images/image6.webp`,  category: 'activities', caption: 'Creative Play',                aspect: aspect(40) },
      // Playschool (41–46)
      { id: 41, type: 'image', branch: 'karad', src: `${karad}/images/image7.webp`,  category: 'playschool', caption: 'Classroom Circle',             aspect: aspect(41) },
      { id: 42, type: 'image', branch: 'karad', src: `${karad}/images/image8.webp`,  category: 'playschool', caption: 'Morning Activity',             aspect: aspect(42) },
      { id: 43, type: 'image', branch: 'karad', src: `${karad}/images/image9.webp`,  category: 'playschool', caption: 'Group Learning',               aspect: aspect(43) },
      { id: 44, type: 'image', branch: 'karad', src: `${karad}/images/image10.webp`, category: 'playschool', caption: 'Story Session',                aspect: aspect(44) },
      { id: 45, type: 'image', branch: 'karad', src: `${karad}/images/image11.webp`, category: 'playschool', caption: 'Circle Time',                  aspect: aspect(45) },
      { id: 46, type: 'image', branch: 'karad', src: `${karad}/images/image12.webp`, category: 'playschool', caption: 'Classroom Fun',                aspect: aspect(46) },
      // Festivals (47–51)
      { id: 47, type: 'image', branch: 'karad', src: `${karad}/images/image13.webp`, category: 'festivals',  caption: 'Festival Celebration',         aspect: aspect(47) },
      { id: 48, type: 'image', branch: 'karad', src: `${karad}/images/image14.webp`, category: 'festivals',  caption: 'Cultural Programme',           aspect: aspect(48) },
      { id: 49, type: 'image', branch: 'karad', src: `${karad}/images/image15.webp`, category: 'festivals',  caption: 'Festive Activity',             aspect: aspect(49) },
      { id: 50, type: 'image', branch: 'karad', src: `${karad}/images/image16.webp`, category: 'festivals',  caption: 'Celebration Time',             aspect: aspect(50) },
      { id: 51, type: 'image', branch: 'karad', src: `${karad}/images/image17.webp`, category: 'festivals',  caption: 'Cultural Celebration',         aspect: aspect(51) },
      // Events (52–56)
      { id: 52, type: 'image', branch: 'karad', src: `${karad}/images/image18.webp`, category: 'events',     caption: 'School Event',                 aspect: aspect(52) },
      { id: 53, type: 'image', branch: 'karad', src: `${karad}/images/image19.webp`, category: 'events',     caption: 'Annual Programme',             aspect: aspect(53) },
      { id: 54, type: 'image', branch: 'karad', src: `${karad}/images/image20.webp`, category: 'events',     caption: 'Special Day',                  aspect: aspect(54) },
      { id: 55, type: 'image', branch: 'karad', src: `${karad}/images/image21.webp`, category: 'events',     caption: 'Event Activity',               aspect: aspect(55) },
      { id: 56, type: 'image', branch: 'karad', src: `${karad}/images/image22.webp`, category: 'events',     caption: 'School Celebration',           aspect: aspect(56) },

      // ── Karve videos ─────────────────────────────────────────────────────
      // Video 1: Exam → tuition
      { id: 57, type: 'video', branch: 'karve', src: `${karve}/videos/1/index.m3u8`, poster: `${karve}/videos/1/thumb.webp`, category: 'tuition',    caption: 'Exam Preparation',    aspect: 'video' },
      // Video 2: Exam → tuition
      { id: 58, type: 'video', branch: 'karve', src: `${karve}/videos/2/index.m3u8`, poster: `${karve}/videos/2/thumb.webp`, category: 'tuition',    caption: 'Study Session',       aspect: 'video' },
      // Video 3: Story → playschool
      { id: 59, type: 'video', branch: 'karve', src: `${karve}/videos/3/index.m3u8`, poster: `${karve}/videos/3/thumb.webp`, category: 'playschool', caption: 'Storytelling Session', aspect: 'video' },
      // Video 4: Holi → festivals
      { id: 60, type: 'video', branch: 'karve', src: `${karve}/videos/4/index.m3u8`, poster: `${karve}/videos/4/thumb.webp`, category: 'festivals',  caption: 'Holi Celebration',    aspect: 'video' },
      // Video 6: Holi → festivals
      { id: 61, type: 'video', branch: 'karve', src: `${karve}/videos/6/index.m3u8`, poster: `${karve}/videos/6/thumb.webp`, category: 'festivals',  caption: 'Holi Festival Fun',   aspect: 'video' },

      // ── Karad videos ──────────────────────────────────────────────────────
      // Video 1: Festival → festivals
      { id: 62, type: 'video', branch: 'karad', src: `${karad}/videos/1/index.m3u8`, poster: `${karad}/videos/1/thumb.webp`, category: 'festivals',  caption: 'Festival Celebration', aspect: 'video' },
      // Video 2: Independence Day → events
      { id: 63, type: 'video', branch: 'karad', src: `${karad}/videos/2/index.m3u8`, poster: `${karad}/videos/2/thumb.webp`, category: 'events',     caption: 'Independence Day',     aspect: 'video' },
      // Video 3: Art → activities
      { id: 64, type: 'video', branch: 'karad', src: `${karad}/videos/3/index.m3u8`, poster: `${karad}/videos/3/thumb.webp`, category: 'activities', caption: 'Art Activity',         aspect: 'video' },
      // Video 4: Art → activities
      { id: 65, type: 'video', branch: 'karad', src: `${karad}/videos/4/index.m3u8`, poster: `${karad}/videos/4/thumb.webp`, category: 'activities', caption: 'Craft Workshop',       aspect: 'video' },
      // Video 5: Art → activities
      { id: 66, type: 'video', branch: 'karad', src: `${karad}/videos/5/index.m3u8`, poster: `${karad}/videos/5/thumb.webp`, category: 'activities', caption: 'Creative Art',         aspect: 'video' },
      // Video 6: Art → activities
      { id: 67, type: 'video', branch: 'karad', src: `${karad}/videos/6/index.m3u8`, poster: `${karad}/videos/6/thumb.webp`, category: 'activities', caption: 'Art & Craft Session',  aspect: 'video' },
      // Video 7: Festival → festivals
      { id: 68, type: 'video', branch: 'karad', src: `${karad}/videos/7/index.m3u8`, poster: `${karad}/videos/7/thumb.webp`, category: 'festivals',  caption: 'Festival Programme',   aspect: 'video' },
    ],
  },
}
