export interface Book {
  id: string;
  title: string;
  author: string;
  href?: string;
  image?: string;
}

export const BOOKS: Book[] = [
  {
    id: 'clean-code',
    title: 'Código Limpo',
    author: 'Robert C. Martin',
    href: 'https://www.amazon.com.br/dp/8576082675',
    image: '/books/clean-code.jpg',
  },
  {
    id: 'the-pragmatic-programmer',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt e David Thomas',
    href: 'https://www.amazon.com.br/dp/8582606877',
    image: '/books/the-pragmatic-programmer.jpg',
  },
  {
    id: 'how-to-win-friends-and-influence-people',
    title: 'Como Fazer Amigos e Influenciar Pessoas',
    author: 'Dale Carnegie',
    href: 'https://www.amazon.com.br/dp/8543108683',
    image: '/books/how-to-win-friends-and-influence-people.jpg',
  },
  {
    id: 'emotional-intelligence',
    title: 'Inteligência Emocional',
    author: 'Daniel Goleman',
    href: 'https://www.amazon.com.br/dp/8573020806',
    image: '/books/emotional-intelligence.jpg',
  },
  {
    id: 'the-courage-to-be-disliked',
    title: 'A Coragem de Não Agradar',
    author: 'Ichiro Kishimi e Fumitake Koga',
    href: 'https://www.amazon.com.br/dp/8543105692',
    image: '/books/the-courage-to-be-disliked.jpg',
  },
  {
    id: 'the-richest-man-in-babylon',
    title: 'O Homem Mais Rico da Babilônia',
    author: 'George S. Clason',
    href: 'https://www.amazon.com.br/dp/8595081530',
    image: '/books/the-richest-man-in-babylon.jpg',
  },
  {
    id: 'essentialism',
    title: 'Essencialismo',
    author: 'Greg McKeown',
    href: 'https://www.amazon.com.br/s?i=stripbooks&k=essencialismo%20greg%20mckeown',
    image: '/books/essentialism.jpg',
  },
  {
    id: 'outwitting-the-devil',
    title: 'Mais Esperto que o Diabo',
    author: 'Napoleon Hill',
    href: 'https://www.amazon.com.br/s?i=stripbooks&k=mais%20esperto%20que%20o%20diabo%20napoleon%20hill',
    image: '/books/outwitting-the-devil.jpg',
  },
  {
    id: 'dopamine-nation',
    title: 'Nação Dopamina',
    author: 'Anna Lembke',
    href: 'https://www.amazon.com.br/dp/6586551714',
    image: '/books/dopamine-nation.jpg',
  },
  {
    id: 'the-power-of-action',
    title: 'O Poder da Ação',
    author: 'Paulo Vieira',
    href: 'https://www.amazon.com.br/dp/854520034X',
    image: '/books/the-power-of-action.jpg',
  },
  {
    id: 'do-mil-ao-milhao',
    title: 'Do Mil ao Milhão',
    author: 'Thiago Nigro',
    href: 'https://www.amazon.com.br/s?i=stripbooks&k=do%20mil%20ao%20milh%C3%A3o%20thiago%20nigro',
    image: '/books/do-mil-ao-milhao.jpg',
  },
  {
    id: 'meditations',
    title: 'Meditações',
    author: 'Marco Aurélio',
    href: 'https://www.amazon.com.br/dp/6555522054',
    image: '/books/meditations.jpg',
  },
  {
    id: 'the-courage-to-be-happy',
    title: 'A Coragem de Ser Feliz',
    author: 'Ichiro Kishimi e Fumitake Koga',
    href: 'https://www.amazon.com.br/s?i=stripbooks&k=a%20coragem%20de%20ser%20feliz%20kishimi',
    image: '/books/the-courage-to-be-happy.jpg',
  },
  {
    id: 'on-the-shortness-of-life',
    title: 'Sobre a Brevidade da Vida',
    author: 'Sêneca',
    href: 'https://www.amazon.com.br/dp/6584956342',
    image: '/books/on-the-shortness-of-life.jpg',
  },
  {
    id: 'enchiridion',
    title: 'Manual',
    author: 'Epicteto',
    href: 'https://www.amazon.com.br/dp/6558887592',
    image: '/books/enchiridion.jpg',
  },
  {
    id: 'silence',
    title: 'Silêncio',
    author: 'Erling Kagge',
    href: 'https://www.amazon.com.br/s?i=stripbooks&k=sil%C3%AAncio%20erling%20kagge',
    image: '/books/silence.jpg',
  },
  {
    id: 'fifty-big-ideas',
    title: '50 Grandes Ideias da Humanidade que Você Precisa Conhecer',
    author: 'Ben Dupré',
    href: 'https://www.amazon.com.br/dp/8542207912',
    image: '/books/fifty-big-ideas.jpg',
  },
  {
    id: 'sherlock-holmes',
    title: 'Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    href: 'https://www.amazon.com.br/dp/8595080836',
    image: '/books/sherlock-holmes.jpg',
  },
];
