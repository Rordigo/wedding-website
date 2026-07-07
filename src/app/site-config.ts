/**
 * ─────────────────────────────────────────────────────────────────────────
 *  ✦  EDITE OS DETALHES DO SEU CASAMENTO AQUI  ✦
 * ─────────────────────────────────────────────────────────────────────────
 *  Este é o ÚNICO arquivo que a maioria das pessoas precisa alterar. Mude os
 *  textos, datas, links e caminhos de imagem abaixo e o site inteiro atualiza.
 *
 *  Fotos: coloque suas imagens em  src/../public/images/  e referencie-as
 *  como  'images/sua-foto.jpg'. Qualquer item da galeria deixado com src: ''
 *  mostra um bloco decorativo no lugar, então o site fica com aparência
 *  finalizada mesmo antes de as fotos estarem prontas.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface EventDetail {
  title: string;
  icon: string; // Classe do Bootstrap Icons, ex.: 'bi-heart'
  time: string;
  venue: string;
  address: string;
  mapUrl: string; // Link do Google Maps, ou '' para esconder o botão
  note?: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export interface GalleryItem {
  src: string; // 'images/foto.jpg'  — deixe '' para um bloco decorativo
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
  /** Título curto combinado usado na aba do navegador e no menu, ex.: "A & B" */
  monogram: string;
  hashtag: string;

  /** Data/hora ISO da cerimônia — alimenta a contagem regressiva. Mantenha o T + hora. */
  weddingDateISO: string;
  displayDate: string;
  displayTime: string;
  location: string;
  invitationLine: string;

  heroImage: string; // 'images/hero.jpg' — deixe '' para um degradê elegante

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
    googleFormUrl: string; // cole aqui o link de compartilhamento do seu Google Forms
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
  partnerOne: 'Ariane',
  partnerTwo: 'Rodrigo',
  monogram: 'A & R',
  hashtag: '#ArianeERodrigo2027',

  weddingDateISO: '2027-03-12T18:00:00',
  displayDate: 'Sexta-feira, 12 de março de 2027',
  displayTime: 'Às dezoito horas',
  location: 'Toscana, Itália',
  invitationLine: 'Junto de suas famílias, convidam você para celebrar o seu casamento',

  heroImage: '', // ex.: 'images/hero.jpg'

  story: {
    heading: 'Nossa História',
    intro:
      'Toda história de amor é bonita, mas a nossa é a nossa favorita. Aqui estão alguns dos momentos que nos trouxeram até aqui.',
    milestones: [
      {
        title: 'Como Nos Conhecemos',
        date: 'Primavera de 2019',
        icon: 'bi-cup-hot',
        text:
          'Fomos apresentados por amigos em comum em uma pequena cafeteria no centro. Um café virou uma conversa de três horas, e nenhum de nós queria que aquilo terminasse.',
      },
      {
        title: 'Nossa Primeira Viagem',
        date: 'Verão de 2021',
        icon: 'bi-airplane',
        text:
          'Um fim de semana espontâneo no litoral se tornou a viagem que nos fez perceber que queríamos conhecer o mundo inteiro juntos — lado a lado.',
      },
      {
        title: 'O Pedido',
        date: 'Inverno de 2025',
        icon: 'bi-gem',
        text:
          'Em uma noite tranquila de inverno, no lugar do nosso primeiro encontro, um de nós se ajoelhou. A resposta, é claro, foi um sim sem hesitar.',
      },
    ],
  },

  events: [
    {
      title: 'A Cerimônia',
      icon: 'bi-heart',
      time: '16h00 – 17h00',
      venue: 'Capela de San Lorenzo',
      address: 'Via delle Colline 12, Toscana, Itália',
      mapUrl: 'https://maps.google.com',
      note: 'Por favor, chegue 30 minutos antes para se acomodar.',
    },
    {
      title: 'A Recepção',
      icon: 'bi-cup-straw',
      time: '18h00 – até o fim',
      venue: 'Villa dei Cipressi',
      address: 'Strada del Vino 8, Toscana, Itália',
      mapUrl: 'https://maps.google.com',
      note: 'Jantar, dança e celebração sob as estrelas.',
    },
  ],

  schedule: [
    { time: '15h30', title: 'Chegada dos Convidados', description: 'Drinks de boas-vindas no terraço.', icon: 'bi-people' },
    { time: '16h00', title: 'Cerimônia', description: 'O momento em que dizemos "sim".', icon: 'bi-heart' },
    { time: '17h00', title: 'Hora do Coquetel', description: 'Canapés, música e fotografias.', icon: 'bi-cup-straw' },
    { time: '18h30', title: 'Jantar', description: 'Um jantar à mesa com discursos.', icon: 'bi-egg-fried' },
    { time: '20h30', title: 'Primeira Dança', description: 'Seguida de dança a noite toda.', icon: 'bi-music-note-beamed' },
    { time: '23h30', title: 'Despedida', description: 'Uma despedida com estrelinhas para o casal.', icon: 'bi-stars' },
  ],

  gallery: [
    { src: '', caption: 'O dia em que ficamos noivos' },
    { src: '', caption: 'Nossas primeiras férias juntos' },
    { src: '', caption: 'Manhãs de domingo' },
    { src: '', caption: 'Comemorando com a família' },
    { src: '', caption: 'Aventuras pelo mundo' },
    { src: '', caption: 'Só nós dois' },
  ],

  rsvp: {
    intro:
      'Seria uma honra ter você celebrando conosco. Por favor, avise-nos se poderá comparecer.',
    deadline: 'Por favor, confirme até 1º de agosto de 2026',
    googleFormUrl: 'https://forms.gle/your-google-form-link', // ← cole aqui o link do seu Google Forms
  },

  registry: {
    intro:
      'Sua presença já é o maior presente de todos. Mas, se desejar presentear, reunimos algumas ideias abaixo.',
    items: [
      { name: 'Cota de Lua de Mel', description: 'Ajude-nos a realizar a lua de mel dos nossos sonhos.', url: 'https://example.com', icon: 'bi-airplane-engines' },
      { name: 'Lista para o Lar', description: 'Algumas coisas para o nosso primeiro lar juntos.', url: 'https://example.com', icon: 'bi-house-heart' },
      { name: 'Doação para Caridade', description: 'Contribua para uma causa querida ao nosso coração.', url: 'https://example.com', icon: 'bi-heart-pulse' },
    ],
  },

  travel: {
    intro: 'Vindo de fora da cidade? Aqui estão alguns lugares que recomendamos para a sua estadia.',
    items: [
      {
        title: 'Hotel Bellavista',
        icon: 'bi-building',
        time: 'A partir de €140 / noite',
        venue: 'A 10 minutos do local',
        address: 'Piazza Centrale 3, Toscana, Itália',
        mapUrl: 'https://maps.google.com',
        note: 'Mencione nossos nomes para uma tarifa especial de grupo.',
      },
      {
        title: 'La Casa Verde B&B',
        icon: 'bi-cup-hot',
        time: 'A partir de €90 / noite',
        venue: 'A 15 minutos do local',
        address: 'Via dei Fiori 22, Toscana, Itália',
        mapUrl: 'https://maps.google.com',
        note: 'Uma pousada aconchegante, de administração familiar.',
      },
    ],
  },

  faqs: [
    {
      question: 'O que devo vestir?',
      answer:
        'O traje é formal / black tie opcional. Pense em algo elegante — vestidos longos e ternos. A cerimônia e a recepção acontecem parcialmente ao ar livre, sobre a grama, então escolha os sapatos de acordo.',
    },
    {
      question: 'Posso levar um acompanhante?',
      answer:
        'Devido ao espaço limitado, só conseguimos acomodar os convidados nomeados no seu convite. O formulário de confirmação mostrará quantos lugares reservamos para você.',
    },
    {
      question: 'As crianças são bem-vindas?',
      answer:
        'Amamos os pequenos, mas esta será uma celebração apenas para adultos, para que todos possam relaxar e aproveitar a noite.',
    },
    {
      question: 'Há estacionamento?',
      answer:
        'Sim, há estacionamento gratuito nos locais da cerimônia e da recepção. Também recomendamos combinar um táxi caso pretenda aproveitar os vinhos.',
    },
    {
      question: 'Que horas devo chegar?',
      answer:
        'Por favor, procure chegar até as 15h30 para encontrar seu lugar antes de a cerimônia começar, pontualmente às 16h00.',
    },
  ],

  footerMessage: 'Mal podemos esperar para celebrar com você.',
};
