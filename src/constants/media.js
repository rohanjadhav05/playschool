import { SCHOOL } from '../../school.config.js'

const S3 = SCHOOL.s3BaseUrl

// Development placeholders: images in public/activities/
// To switch to S3: replace /activities with `${S3}/activities` and change .jpg to .webp
const ACT = '/activities'

export const MEDIA = {
  hero: {
    main: `${S3}/hero/hero-main.webp`,
    mobile: `${S3}/hero/hero-main-mobile.webp`,
  },
  activities: {
    art1: `${ACT}/art-1.jpg`,
    art2: `${ACT}/art-2.jpg`,
    story1: `${ACT}/story-1.jpg`,
    story2: `${ACT}/story-2.jpg`,
    dance1: `${ACT}/dance-1.jpg`,
    danceVideo: null,
    dancePoster: null,
    festival1: `${ACT}/festival-1.jpg`,
    festival2: `${ACT}/festival-2.jpg`,
    festivalVideo: null,
    festivalPoster: null,
    habits1: `${ACT}/habits-1.jpg`,
    habits2: `${ACT}/habits-2.jpg`,
    stage1: `${ACT}/stage-1.jpg`,
    stageVideo: null,
    stagePoster: null,
  },
  about: {
    teacher: `${S3}/about/teacher-profile.webp`,
    classroom: `${S3}/about/classroom.webp`,
  },
  gallery: {
    // Replace src values with real S3 URLs when photos are ready.
    // aspect: 'video' (16:9) | 'square' | 'portrait' (4:5)
    items: [
      { id: 1,  type: 'image', src: `${ACT}/art-1.jpg`,      category: 'activities', caption: 'Art & Craft Session',       aspect: 'video'    },
      { id: 2,  type: 'image', src: `${ACT}/story-1.jpg`,    category: 'playschool', caption: 'Storytelling Circle',       aspect: 'square'   },
      { id: 3,  type: 'image', src: `${ACT}/dance-1.jpg`,    category: 'activities', caption: 'Dance Practice',            aspect: 'video'    },
      { id: 4,  type: 'image', src: `${ACT}/festival-1.jpg`, category: 'festivals',  caption: 'Festival Celebrations',     aspect: 'portrait' },
      { id: 5,  type: 'image', src: `${ACT}/habits-1.jpg`,   category: 'playschool', caption: 'Healthy Morning Routine',   aspect: 'video'    },
      { id: 6,  type: 'image', src: `${ACT}/stage-1.jpg`,    category: 'events',     caption: 'Annual Day Performance',    aspect: 'square'   },
      { id: 7,  type: 'image', src: `${ACT}/art-2.jpg`,      category: 'activities', caption: 'Craft Activity',            aspect: 'portrait' },
      { id: 8,  type: 'image', src: `${ACT}/story-2.jpg`,    category: 'playschool', caption: 'Library Time',              aspect: 'video'    },
      { id: 9,  type: 'image', src: `${ACT}/festival-2.jpg`, category: 'festivals',  caption: 'Cultural Program',          aspect: 'square'   },
      { id: 10, type: 'image', src: `${ACT}/habits-2.jpg`,   category: 'activities', caption: 'Outdoor Activities',        aspect: 'video'    },
      { id: 11, type: 'image', src: null,                     category: 'events',     caption: 'Prize Distribution Day',    aspect: 'video'    },
      { id: 12, type: 'image', src: null,                     category: 'tuition',    caption: 'Study Session',             aspect: 'square'   },
      { id: 13, type: 'image', src: null,                     category: 'tuition',    caption: 'Exam Preparation',          aspect: 'portrait' },
      { id: 14, type: 'image', src: null,                     category: 'playschool', caption: 'Morning Circle Time',       aspect: 'video'    },
      { id: 15, type: 'image', src: null,                     category: 'activities', caption: 'Free Play Time',            aspect: 'square'   },
    ],
  },
}
