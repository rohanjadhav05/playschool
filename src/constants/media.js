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
    // Array of { type: 'image'|'video', src, poster?, category, caption }
    // Populated as real photos are uploaded to S3
    items: [],
  },
}
