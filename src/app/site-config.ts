/**
 * ─────────────────────────────────────────────────────────────────────────
 *  ✦  EDIT YOUR WEDDING DETAILS HERE  ✦
 * ─────────────────────────────────────────────────────────────────────────
 *  This is the ONLY file most people need to touch. Change the text, dates,
 *  links and image paths below and the whole site updates.
 *
 *  Photos: drop your images into  src/../public/images/  and reference them
 *  as  'images/your-photo.jpg'. Any gallery item left with src: '' shows an
 *  elegant placeholder tile instead, so the site looks finished before your
 *  photos are ready.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface EventDetail {
  title: string;
  icon: string; // Bootstrap Icons class, e.g. 'bi-heart'
  time: string;
  venue: string;
  address: string;
  mapUrl: string; // Google Maps link, or '' to hide the button
  note?: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export interface GalleryItem {
  src: string; // 'images/photo.jpg'  — leave '' for a placeholder tile
  caption: string;
}

export interface RegistryItem {
  name: string;
  description: string;
  url: string;
  icon: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StoryMilestone {
  title: string;
  date: string;
  text: string;
  icon: string;
}

export interface SiteConfig {
  partnerOne: string;
  partnerTwo: string;
  /** Short combined title used in the browser tab & navbar, e.g. "A & B" */
  monogram: string;
  hashtag: string;

  /** ISO date/time of the ceremony — powers the countdown. Keep the T + time. */
  weddingDateISO: string;
  displayDate: string;
  displayTime: string;
  location: string;
  invitationLine: string;

  heroImage: string; // 'images/hero.jpg' — leave '' for an elegant gradient

  story: {
    heading: string;
    intro: string;
    milestones: StoryMilestone[];
  };

  events: EventDetail[];
  schedule: ScheduleItem[];
  gallery: GalleryItem[];

  rsvp: {
    intro: string;
    deadline: string;
    googleFormUrl: string; // paste your Google Form share link here
  };

  registry: {
    intro: string;
    items: RegistryItem[];
  };

  travel: {
    intro: string;
    items: EventDetail[];
  };

  faqs: FaqItem[];

  footerMessage: string;
}

export const siteConfig: SiteConfig = {
  partnerOne: 'Alex',
  partnerTwo: 'Jordan',
  monogram: 'A & J',
  hashtag: '#AlexAndJordan2026',

  weddingDateISO: '2026-09-19T16:00:00',
  displayDate: 'Saturday, September 19, 2026',
  displayTime: 'Four o’clock in the afternoon',
  location: 'Tuscany, Italy',
  invitationLine: 'Together with their families, invite you to celebrate their wedding',

  heroImage: '', // e.g. 'images/hero.jpg'

  story: {
    heading: 'Our Story',
    intro:
      'Every love story is beautiful, but ours is our favourite. Here are a few of the moments that brought us here.',
    milestones: [
      {
        title: 'How We Met',
        date: 'Spring 2019',
        icon: 'bi-cup-hot',
        text:
          'We were introduced by mutual friends at a tiny coffee shop downtown. One flat white turned into a three-hour conversation, and neither of us wanted it to end.',
      },
      {
        title: 'Our First Trip',
        date: 'Summer 2021',
        icon: 'bi-airplane',
        text:
          'A spontaneous weekend by the coast became the trip that made us realise we wanted to see the whole world together — starting side by side.',
      },
      {
        title: 'The Proposal',
        date: 'Winter 2025',
        icon: 'bi-gem',
        text:
          'On a quiet snowy evening, in the place where we had our very first date, one of us got down on one knee. The answer, of course, was an easy yes.',
      },
    ],
  },

  events: [
    {
      title: 'The Ceremony',
      icon: 'bi-heart',
      time: '4:00 PM – 5:00 PM',
      venue: 'Chapel of San Lorenzo',
      address: 'Via delle Colline 12, Tuscany, Italy',
      mapUrl: 'https://maps.google.com',
      note: 'Please arrive 30 minutes early to be seated.',
    },
    {
      title: 'The Reception',
      icon: 'bi-cup-straw',
      time: '6:00 PM – late',
      venue: 'Villa dei Cipressi',
      address: 'Strada del Vino 8, Tuscany, Italy',
      mapUrl: 'https://maps.google.com',
      note: 'Dinner, dancing and celebration under the stars.',
    },
  ],

  schedule: [
    { time: '3:30 PM', title: 'Guest Arrival', description: 'Welcome drinks on the terrace.', icon: 'bi-people' },
    { time: '4:00 PM', title: 'Ceremony', description: 'The moment we say "I do".', icon: 'bi-heart' },
    { time: '5:00 PM', title: 'Cocktail Hour', description: 'Canapés, music and photographs.', icon: 'bi-cup-straw' },
    { time: '6:30 PM', title: 'Dinner', description: 'A seated dinner with speeches.', icon: 'bi-egg-fried' },
    { time: '8:30 PM', title: 'First Dance', description: 'Followed by dancing all night.', icon: 'bi-music-note-beamed' },
    { time: '11:30 PM', title: 'Farewell', description: 'A sparkler send-off for the couple.', icon: 'bi-stars' },
  ],

  gallery: [
    { src: '', caption: 'The day we got engaged' },
    { src: '', caption: 'Our first holiday together' },
    { src: '', caption: 'Sunday mornings' },
    { src: '', caption: 'Celebrating with family' },
    { src: '', caption: 'Adventures abroad' },
    { src: '', caption: 'Just the two of us' },
  ],

  rsvp: {
    intro:
      'We would be honoured to have you celebrate with us. Kindly let us know if you can make it.',
    deadline: 'Please respond by August 1, 2026',
    googleFormUrl: 'https://forms.gle/your-google-form-link', // ← paste your Google Form link
  },

  registry: {
    intro:
      'Your presence is the greatest gift of all. But if you wish to give something, we have put together a few ideas below.',
    items: [
      { name: 'Honeymoon Fund', description: 'Help send us off on our dream honeymoon.', url: 'https://example.com', icon: 'bi-airplane-engines' },
      { name: 'Home Registry', description: 'A few things for our first home together.', url: 'https://example.com', icon: 'bi-house-heart' },
      { name: 'Charity Donation', description: 'Give to a cause close to our hearts.', url: 'https://example.com', icon: 'bi-heart-pulse' },
    ],
  },

  travel: {
    intro: 'Coming from out of town? Here are a few places we recommend for your stay.',
    items: [
      {
        title: 'Hotel Bellavista',
        icon: 'bi-building',
        time: 'From €140 / night',
        venue: '10 minutes from the venue',
        address: 'Piazza Centrale 3, Tuscany, Italy',
        mapUrl: 'https://maps.google.com',
        note: 'Mention our names for a special group rate.',
      },
      {
        title: 'La Casa Verde B&B',
        icon: 'bi-cup-hot',
        time: 'From €90 / night',
        venue: '15 minutes from the venue',
        address: 'Via dei Fiori 22, Tuscany, Italy',
        mapUrl: 'https://maps.google.com',
        note: 'A cosy, family-run guesthouse.',
      },
    ],
  },

  faqs: [
    {
      question: 'What should I wear?',
      answer:
        'The dress code is formal / black tie optional. Think elegant — long dresses and suits. The ceremony and reception are partly outdoors on grass, so choose your footwear accordingly.',
    },
    {
      question: 'Can I bring a plus one?',
      answer:
        'Due to limited space, we are only able to accommodate the guests named on your invitation. Your RSVP form will show how many seats we have reserved for you.',
    },
    {
      question: 'Are children welcome?',
      answer:
        'We love your little ones, but this will be an adults-only celebration so that everyone can relax and enjoy the evening.',
    },
    {
      question: 'Is there parking?',
      answer:
        'Yes, free parking is available at both the ceremony and reception venues. We also recommend arranging a taxi if you plan to enjoy the wine.',
    },
    {
      question: 'What time should I arrive?',
      answer:
        'Please aim to arrive by 3:30 PM so you can find your seat before the ceremony begins promptly at 4:00 PM.',
    },
  ],

  footerMessage: 'We can’t wait to celebrate with you.',
};
