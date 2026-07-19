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

export interface PixGift {
  name: string;
  description: string;
  icon: string;
  value: number; // valor em reais, ex.: 12 ou 12.5
}

export interface FaqItem {
  question: string;
  answer: string;
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
    /** A narrativa da história do casal — cada item é um parágrafo. */
    paragraphs: string[];
  };

  events: EventDetail[];
  schedule: ScheduleItem[];
  gallery: GalleryItem[];

  rsvp: {
    intro: string;
    deadline: string;
    googleFormUrl: string; // cole aqui o link de compartilhamento do seu Google Forms
  };

  /** Dados do recebedor usados para gerar o código Pix Copia e Cola. */
  pix: {
    chave: string;
    nome: string;
    cidade: string;
  };

  registry: {
    intro: string;
    /** Mensagem exibida na página de presentes para envio de Pix avulso. */
    directPixNote: string;
    gifts: PixGift[];
  };

  /** Envio do cartão pelo checkout (formulário Web3Forms, sem backend). */
  card: {
    /** Access key do Web3Forms (https://web3forms.com), vinculada ao e-mail de destino. */
    web3formsAccessKey: string;
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
  location: 'São Paulo - SP, Brasil',
  invitationLine: 'Junto de suas famílias, convidam você para celebrar o seu casamento',

  heroImage: '', // ex.: 'images/hero.jpg'

  story: {
    heading: 'Nossa História',
    paragraphs: [
      'A gente se conheceu como não se espera conhecer alguém com quem vai se casar. A gente se conheceu como aqueles segredos que a vida guarda bem escondidos, pra serem revelados na hora ideal. A gente se conheceu num Carnaval que não era Carnaval, em fevereiro de 2021. A pandemia ainda estava ali, mas já trazia uma trégua pros nossos corações saudosos de gente, de risadas e de vida! Saudosos do mar! E assim, nos conhecemos! Rumo à praia, Ju de motorista, Rayssa de copilota, e fomos em direção à praia de Itaguaré, do ladinho de Riviera.',
      'Nesse dia, nos tornamos amigos e a nossa amizade só cresceu! Cresceu forte e desinteressada. Do jeito que grandes amizades se mantém. O Ro se tornou aluno de dança da Nani, formaram um grupo de amigos. E assim, nós dois, juntos, fizemos novos amigos, viajamos, dançamos, cantamos, e demos boas risadas! Nos ajudamos um bom tanto também.',
      'E como tudo muda o tempo todo, a vida mudou em 2023. Diante de um convite desinteressado de jantar, a fim de provar a nova receita do Ro, entre conversas, vinhos, risadas e jogos de tarô, demos nosso primeiro beijo. Primeiro beijo, que viria acompanhado de tantos outros, e de tanto por vir! Até chegarmos aqui, hoje, escrevendo nossa história pra vocês.',
      'Hoje, moramos juntos na nossa casa. Temos um quebra cabeças montado, café passado, um pé de lavanda, uma iogurteira e a Ginga, dormindo com a cabeça apoiada no nosso sapato enquanto toma sol. Temos vida acontecendo! Obrigada por fazerem parte de nossas vidas, e serem testemunhas da nossa amizade e do nosso amor.',
    ],
  },

  events: [
    {
      title: 'Cerimônia & Festa',
      icon: 'bi-heart',
      time: '18h00 – 01h00',
      venue: 'Mansão Capricho',
      address: 'Avenida Nova Cantareira, 4238 — Tucuruvi, São Paulo - SP, 02340-001',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Mans%C3%A3o+Capricho+-+Avenida+Nova+Cantareira+4238+Tucuruvi+S%C3%A3o+Paulo',
      note: 'Recepção, cerimônia, jantar e festa — tudo no mesmo local.',
    },
  ],

  schedule: [
    { time: '18h00', title: 'Recepção', description: 'Recepção e drinks de boas-vindas.', icon: 'bi-cup-straw' },
    { time: '19h00', title: 'Cerimônia', description: 'O momento em que dizemos "sim".', icon: 'bi-heart' },
    { time: '20h00', title: 'Jantar', description: 'Um jantar à mesa com discursos.', icon: 'bi-egg-fried' },
    { time: '21h30', title: 'Primeira Dança', description: 'Nossa primeira dança como casal.', icon: 'bi-music-note-beamed' },
    { time: '22h00', title: 'Festa', description: 'Música e dança a noite toda.', icon: 'bi-stars' },
    { time: '01h00', title: 'Encerramento', description: 'Encerramento da celebração.', icon: 'bi-moon-stars' },
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
    deadline: 'Por favor, confirme até 31 de dezembro de 2026',
    googleFormUrl: 'https://forms.gle/your-google-form-link', // ← cole aqui o link do seu Google Forms
  },

  pix: {
    chave: '+5511933383357',
    nome: 'Rodrigo Anater',
    cidade: 'Sao Paulo',
  },

  registry: {
    intro:
      'Sua presença já é o maior presente. Mas, se desejar nos presentear, preparamos algumas opções de contribuição via Pix.',
    directPixNote:
      'Para enviar outros valores, sem a seleção de presente, pode fazer um Pix direto para 11933383357 (Rodrigo Chioca Anater).',
    gifts: [
      { name: 'Um cafezinho', description: 'Para as nossas manhãs juntos.', icon: 'bi-cup-hot', value: 5 },
      { name: 'Uma taça de vinho', description: 'Para brindarmos à nova fase.', icon: 'bi-cup-straw', value: 10 },
      { name: 'Um pé de lavanda', description: 'Para florescer no nosso lar.', icon: 'bi-flower1', value: 12 },
    ],
  },

  card: {
    web3formsAccessKey: '3054b242-ef88-41a9-a1e7-afed36780f5b', // ← cole aqui a access key do Web3Forms (https://web3forms.com)
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
        'Por favor, procure chegar até as 18h00 para a recepção, antes de a cerimônia começar, às 19h00.',
    },
  ],

  footerMessage: 'Mal podemos esperar para celebrar com você.',
};

// Dados do recebedor Pix ficam imutáveis em tempo de execução: nem o código do
// app nem o console do navegador conseguem sobrescrever a chave/nome/cidade.
Object.freeze(siteConfig.pix);
Object.freeze(siteConfig);
