// Replace placeholder image keys with real S3 paths from src/constants/media.js before launch
export const ACTIVITIES = [
  {
    id: 'art',
    icon: '🎨',
    titleKey: 'activities.art',
    tagline: 'Creating little masterpieces, one brushstroke at a time',
    description:
      'Children explore creativity through drawing, painting, clay modelling, collage making, and seasonal craft projects. Each activity develops fine motor skills, patience, and self-expression.',
    learns: [
      'Fine motor skill development',
      'Creative thinking and imagination',
      'Concentration and patience',
      'Pride in their own work',
    ],
    imageKeys: ['art1', 'art2'],
    videoKey: null,
    category: 'activities',
  },
  {
    id: 'story',
    icon: '📖',
    titleKey: 'activities.story',
    tagline: 'Stories that spark curiosity and build vocabulary',
    description:
      'Interactive storytelling sessions using pictures, puppets, and props. Children listen, imagine, and retell stories — building language skills and moral values naturally.',
    learns: [
      'Language and vocabulary development',
      'Listening skills and focus',
      'Moral values through stories',
      'Confidence to express themselves',
    ],
    imageKeys: ['story1', 'story2'],
    videoKey: null,
    category: 'activities',
  },
  {
    id: 'dance',
    icon: '🎵',
    titleKey: 'activities.dance',
    tagline: 'Movement, rhythm, and joy — every day',
    description:
      'Children learn basic classical and folk dance movements, sing rhymes and devotional songs, and participate in group music activities. Builds coordination, rhythm, and cultural connection.',
    learns: [
      'Body coordination and rhythm',
      'Cultural music appreciation',
      'Teamwork and synchronization',
      'Joyful expression through movement',
    ],
    imageKeys: ['dance1'],
    videoKey: 'danceVideo',
    videoPosterKey: 'dancePoster',
    category: 'activities',
  },
  {
    id: 'festival',
    icon: '🪔',
    titleKey: 'activities.festival',
    tagline: "Teaching India's heritage through joy and colour",
    description:
      'We celebrate major Indian festivals with age-appropriate activities, stories, and decorations. Children learn the history, meaning, and values behind each festival — instilling cultural pride from an early age.',
    learns: [
      'Cultural identity and pride',
      'History and meaning of traditions',
      'Values like gratitude, devotion, and community',
      'Inclusive celebration and togetherness',
    ],
    imageKeys: ['festival1', 'festival2'],
    videoKey: 'festivalVideo',
    videoPosterKey: 'festivalPoster',
    category: 'festivals',
  },
  {
    id: 'habits',
    icon: '🥗',
    titleKey: 'activities.habits',
    tagline: 'Building lifelong habits when it matters most',
    description:
      "We focus on foundational habits that shape a child's character and health. Through gentle daily routines, children develop self-reliance and mindfulness.",
    learns: [
      'Self-reliance and independence',
      'Healthy relationship with food',
      'Discipline and respect for routines',
      'Mindfulness and presence during meals',
    ],
    imageKeys: ['habits1', 'habits2'],
    videoKey: null,
    category: 'activities',
  },
  {
    id: 'stage',
    icon: '🎤',
    titleKey: 'activities.stage',
    tagline: 'Because every child deserves their moment to shine',
    description:
      'We create regular opportunities for children to perform, participate, and be celebrated — building stage confidence, public speaking comfort, and a healthy sense of achievement from a young age.',
    learns: [
      'Stage confidence and reduced performance anxiety',
      'Public speaking and presentation comfort',
      'Sense of achievement and self-worth',
      'Sportsmanship and teamwork',
    ],
    imageKeys: ['stage1'],
    videoKey: 'stageVideo',
    videoPosterKey: 'stagePoster',
    category: 'events',
  },
]
