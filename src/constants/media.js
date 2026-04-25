import { SCHOOL } from '../../school.config.js'

const S3 = SCHOOL.s3BaseUrl

export const MEDIA = {
  hero: {
    main: `${S3}/hero/hero-main.webp`,
    mobile: `${S3}/hero/hero-main-mobile.webp`,
  },
  activities: {
    art1: `${S3}/activities/art-craft-1.webp`,
    art2: `${S3}/activities/art-craft-2.webp`,
    story1: `${S3}/activities/storytelling-1.webp`,
    story2: `${S3}/activities/storytelling-2.webp`,
    dance1: `${S3}/activities/dance-music-1.webp`,
    danceVideo: `${S3}/activities/dance-music.mp4`,
    dancePoster: `${S3}/activities/dance-music-poster.webp`,
    festival1: `${S3}/activities/festival-1.webp`,
    festival2: `${S3}/activities/festival-2.webp`,
    festivalVideo: `${S3}/activities/festival.mp4`,
    festivalPoster: `${S3}/activities/festival-poster.webp`,
    habits1: `${S3}/activities/healthy-habits-1.webp`,
    habits2: `${S3}/activities/healthy-habits-2.webp`,
    stage1: `${S3}/activities/stage-confidence-1.webp`,
    stageVideo: `${S3}/activities/stage-confidence.mp4`,
    stagePoster: `${S3}/activities/stage-confidence-poster.webp`,
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
