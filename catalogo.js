const CATALOG_YEAR = 2026;
const WHATSAPP_PHONE = '5582988783636';

const PACK_QUOTE = 'Para quantidades maiores, consulte um orçamento pelo WhatsApp.';
const COTTON_CANDY_MINIMUM = 'Mínimo de 10 unidades por cor ou sabor escolhido.';
const EVENT_AVAILABILITY = 'Consulte a disponibilidade para a data do evento.';
const TRAVEL_QUOTE = 'Para eventos fora de Maceió, consulte o valor do deslocamento.';
const POPCORN_TOPPINGS = 'Coberturas: manteiga, chocolate e leite condensado.';

function popcornOptions(salted, caramel, gourmet) {
  return [
    ...(salted ? [{ id: 'salgada-tradicional', label: 'Salgada tradicional', price: salted }] : []),
    { id: 'caramelizada-com-cor', label: 'Caramelizada com cor', price: caramel },
    { id: 'gourmet', label: 'Gourmet', price: gourmet }
  ];
}

function cottonCandyOptions(colored, gourmet) {
  return [
    { id: 'com-cor', label: 'Com cor', price: colored },
    { id: 'gourmet', label: 'Gourmet', price: gourmet }
  ];
}

function packagingAddons(customization, ribbon) {
  return [
    { id: 'personalizacao', label: 'Personalização', price: customization },
    ...(ribbon ? [{ id: 'laco', label: 'Laço de fita larga', price: ribbon }] : [])
  ];
}

function eventOptions(party, hourly, duration) {
  return [
    { id: 'aniversario', label: 'Aniversário', price: party, priceLabel: duration },
    { id: 'por-hora', label: 'Contratação por hora', price: hourly, priceLabel: 'por hora', note: 'Mínimo de 2 horas de serviço.' }
  ];
}

// Produtos para encomenda usam os valores publicados por unidade ou por lote.
// Serviços usam os preços de referência do PDF e seguem para consulta.
const CATALOG_PRODUCTS = [
  {
    id: 'mini-pipoca-saco', title: 'Mini pipoca no saco',
    category: 'Pipocas', image: 'mini-pipoca-saco', sizeLabel: 'Saquinho de 10 × 15 cm', packQuantity: 30,
    variations: popcornOptions(120, 157.50, 187.50), addons: packagingAddons(52.50, 52.50)
  },
  {
    id: 'pipoca-saco-medio', title: 'Pipoca no saco',
    category: 'Pipocas', image: 'pipoca-saco-medio', sizeLabel: 'Saquinho de 10 × 20 cm', packQuantity: 20,
    variations: popcornOptions(105, 115, 140), addons: packagingAddons(35, 35)
  },
  {
    id: 'pipoca-saco-cone', title: 'Pipoca no saco cone',
    category: 'Pipocas', image: 'pipoca-saco-cone', sizeLabel: 'Cone de 18 × 30 cm', packQuantity: 20,
    variations: popcornOptions(130, 160, 185), addons: packagingAddons(35, 35)
  },
  {
    id: 'pipoca-enchimento', title: 'Pipoca para enchimento',
    category: 'Pipocas', tags: ['Personalizados'], image: 'pipoca-enchimento',
    sizeLabel: 'Personalizados do cliente · 10 × 10 cm', packQuantity: 30,
    variations: popcornOptions(null, 142.50, 172.50),
    description: 'Enchimento com pipoca para embalagens personalizadas fornecidas pelo cliente.'
  },
  {
    id: 'pipoca-saco-grande', title: 'Saco de pipoca grande',
    category: 'Pipocas', image: 'pipoca-saco-grande', sizeLabel: 'Saco de 20 × 28 cm',
    variations: popcornOptions(null, 70, 90),
    description: 'Conserva por até 10 dias.'
  },
  {
    id: 'kit-pipoca-algodao-grande', title: 'Kit pipoca gourmet + algodão-doce',
    category: 'Kits', tags: ['Pipocas', 'Algodão-doce'], image: 'kit-pipoca-algodao-grande',
    sizeLabel: 'Dois sacos de 20 × 28 cm', priceLabel: 'por kit',
    variations: [{ id: 'kit', label: 'Kit de sacos grandes', price: 120 }],
    description: 'Um saco de pipoca gourmet e um de algodão-doce. Escolha o sabor da pipoca e a cor do algodão-doce.'
  },
  {
    id: 'algodao-pote-300', title: 'Algodão-doce no pote 300 ml',
    category: 'Algodão-doce', image: 'algodao-pote-300', sizeLabel: 'Pote de 300 ml', packQuantity: 20,
    variations: cottonCandyOptions(100, 130), addons: packagingAddons(35, 35),
    notes: [COTTON_CANDY_MINIMUM]
  },
  {
    id: 'algodao-pote-400-bolha', title: 'Algodão-doce no pote 400 ml',
    category: 'Algodão-doce', image: 'algodao-pote-400-bolha', sizeLabel: 'Pote de 400 ml com tampa bolha', packQuantity: 20,
    variations: cottonCandyOptions(180, 210), addons: packagingAddons(35, 35),
    notes: [COTTON_CANDY_MINIMUM]
  },
  {
    id: 'algodao-saco-solto', title: 'Algodão-doce no saco solto',
    category: 'Algodão-doce', image: 'algodao-saco-solto', sizeLabel: 'Saquinhos individuais', packQuantity: 20,
    variations: cottonCandyOptions(130, 150), addons: packagingAddons(50, 35),
    notes: [COTTON_CANDY_MINIMUM]
  },
  {
    id: 'algodao-no-cabo', title: 'Algodão-doce no cabo',
    category: 'Algodão-doce', image: 'algodao-no-cabo', sizeLabel: 'Lotes de 30, 40, 50 ou 60 unidades',
    variations: [
      { id: '30', label: '30 unidades', price: 240, quantity: 30 },
      { id: '40', label: '40 unidades', price: 320, quantity: 40 },
      { id: '50', label: '50 unidades', price: 400, quantity: 50 },
      { id: '60', label: '60 unidades', price: 480, quantity: 60 }
    ],
    addons: packagingAddons(75, 52.50),
    notes: ['Mínimo de 10 unidades por cor escolhida.']
  },
  {
    id: 'algodao-enchimento', title: 'Algodão-doce para enchimento',
    category: 'Algodão-doce', tags: ['Personalizados'], image: 'algodao-enchimento',
    sizeLabel: 'Personalizados do cliente', packQuantity: 30,
    variations: cottonCandyOptions(90, 135),
    description: 'Enchimento com algodão-doce para embalagens personalizadas fornecidas pelo cliente.',
    notes: [COTTON_CANDY_MINIMUM]
  },
  {
    id: 'maca-do-amor', title: 'Maçã do amor',
    category: 'Doces', image: 'maca-do-amor', sizeLabel: 'Maçã caramelizada', packQuantity: 30,
    variations: [{ id: 'padrao', label: 'Maçã do amor', price: 285 }], addons: packagingAddons(52.50)
  },
  {
    id: 'palha-italiana', title: 'Palha italiana',
    category: 'Doces', image: 'palha-italiana', sizeLabel: 'Porções individuais', packQuantity: 30,
    variations: [{ id: 'padrao', label: 'Palha italiana', price: 300 }], addons: packagingAddons(52.50, 52.50)
  },
  {
    id: 'maquina-pipoca', title: 'Máquina de pipoca tradicional',
    category: 'Máquinas e serviços', image: 'maquina-pipoca', sizeLabel: 'Aniversários e eventos', isConsultation: true,
    variations: eventOptions(380, 190, 'pacote de 3 horas'),
    description: 'Máquina de pipoca, estrutura e atendente para servir os convidados.',
    notes: [POPCORN_TOPPINGS, EVENT_AVAILABILITY]
  },
  {
    id: 'maquina-algodao', title: 'Máquina de algodão-doce',
    category: 'Máquinas e serviços', image: 'maquina-algodao', sizeLabel: 'Aniversários e eventos', isConsultation: true,
    variations: eventOptions(380, 190, 'pacote de 3 horas'),
    description: 'Algodão-doce com opções de cores, máquina, estrutura e atendente.',
    notes: [EVENT_AVAILABILITY]
  },
  {
    id: 'casadinha-pipoca-algodao', title: 'Casadinha de pipoca e algodão-doce',
    category: 'Máquinas e serviços', image: 'casadinha-pipoca-algodao', sizeLabel: 'Duas máquinas para o seu evento', isConsultation: true,
    variations: eventOptions(700, 360, 'pacote de 3 horas'),
    description: 'Pipoca com coberturas, algodão-doce com opções de cores, atendente e estrutura completa.',
    notes: [POPCORN_TOPPINGS, EVENT_AVAILABILITY]
  },
  {
    id: 'crepe-suico', title: 'Crepe suíço no palito',
    category: 'Máquinas e serviços', image: 'crepe-suico', sizeLabel: 'Pedido mínimo de 100 unidades', isConsultation: true,
    priceLabel: 'pacote de 100 unidades',
    variations: [{ id: 'pacote', label: 'Pacote', price: 800 }],
    description: 'Três horas de evento com atendente, equipamentos e sete opções de recheio.',
    notes: ['Salgados: queijo, misto e frango.', 'Doces: chocolate, doce de leite, cartola e Romeu e Julieta.', PACK_QUOTE],
    addons: [{ id: 'nutella', label: 'Recheio de Nutella', price: 50 }]
  },
  {
    id: 'crepe-frances', title: 'Crepe francês no prato',
    category: 'Máquinas e serviços', image: 'crepe-frances', sizeLabel: 'Pedido mínimo de 100 unidades', isConsultation: true,
    priceLabel: 'pacote de 100 unidades',
    variations: [{ id: 'pacote', label: 'Pacote', price: 1200 }],
    description: 'Três horas de evento com atendente, equipamentos e estrutura.',
    notes: [
      'Salgados: queijo, presunto, frango e calabresa. Acompanhamentos: ervilha, milho, azeitona, tomate, cebola e coentro. Molhos vermelho e branco.',
      'Doces: Nutella, goiabada e doce de leite. Frutas: banana e morango. Coberturas: M&M’s e mais dois chocolates variados.',
      PACK_QUOTE
    ]
  },
  {
    id: 'mini-pizza', title: 'Mini pizza',
    category: 'Máquinas e serviços', image: 'mini-pizza', sizeLabel: 'Pedido mínimo de 100 unidades', isConsultation: true,
    priceLabel: 'pacote de 100 unidades',
    variations: [{ id: 'pacote', label: 'Pacote', price: 675 }],
    description: 'Três horas de evento com atendente, equipamentos e estrutura.',
    notes: ['Sabores: queijo, misto, calabresa e frango com queijo.', PACK_QUOTE]
  },
  {
    id: 'batata-frita', title: 'Batata frita',
    category: 'Máquinas e serviços', image: 'batata-frita', sizeLabel: 'Pedido mínimo de 100 unidades', isConsultation: true,
    priceLabel: 'pacote de 100 unidades',
    variations: [{ id: 'pacote', label: 'Pacote', price: 800 }],
    description: 'Batata frita servida em prato fundo de 12 cm, com atendente, equipamentos e estrutura.',
    notes: ['Opções do serviço: palito, queijo ralado e ketchup.', PACK_QUOTE]
  },
  {
    id: 'tabuleiro-brigadeiro', title: 'Tabuleiro de brigadeiro',
    category: 'Máquinas e serviços', image: 'tabuleiro-brigadeiro', sizeLabel: 'Pedido mínimo para 50 pessoas', isConsultation: true,
    priceLabel: 'pacote para 50 pessoas',
    variations: [{ id: 'pacote', label: 'Pacote', price: 550 }],
    description: 'Brigadeiro de colher em diversos sabores, granulados à escolha e atendente para servir.',
    notes: [PACK_QUOTE]
  },
  {
    id: 'carrinho-pipoca', title: 'Carrinho de pipoca gourmet',
    category: 'Máquinas e serviços', tags: ['Carrinhos gourmet'], image: 'carrinho-pipoca',
    sizeLabel: 'Pedido mínimo para 50 convidados', isConsultation: true, priceLabel: 'pacote para 50 pessoas',
    variations: [{ id: 'pacote', label: 'Pacote', price: 1100 }],
    description: 'Três horas de evento com carrinho, estrutura e atendente. Escolha até seis sabores doces e dois salgados entre os 16 sabores do cardápio.',
    notes: [POPCORN_TOPPINGS, PACK_QUOTE, TRAVEL_QUOTE]
  },
  {
    id: 'carrinho-algodao', title: 'Carrinho de algodão-doce gourmet',
    category: 'Máquinas e serviços', tags: ['Carrinhos gourmet'], image: 'carrinho-algodao',
    sizeLabel: 'Pedido mínimo para 50 convidados', isConsultation: true, priceLabel: 'pacote para 50 pessoas',
    variations: [{ id: 'pacote', label: 'Pacote', price: 900 }],
    description: 'Três horas de evento com carrinho e estrutura. Entre os dez sabores disponíveis, escolha cinco gourmet além do tradicional.',
    notes: ['Inclui confeitos decorativos e um bastão de LED de brinde para o aniversariante.', PACK_QUOTE, TRAVEL_QUOTE],
    addons: [{ id: 'bastao-led', label: 'Bastão de LED extra (cada)', price: 15 }]
  },
  {
    id: 'casadinha-gourmet', title: 'Casadinha gourmet de pipoca e algodão-doce',
    category: 'Máquinas e serviços', tags: ['Carrinhos gourmet'], image: 'casadinha-gourmet',
    sizeLabel: 'Pedido mínimo para 50 convidados', isConsultation: true, priceLabel: 'pacote para 50 pessoas',
    variations: [{ id: 'pacote', label: 'Pacote', price: 1900 }],
    description: 'Dois carrinhos, estrutura e atendentes. Até seis sabores doces e dois salgados de pipoca, com três coberturas. Algodão-doce em cinco sabores gourmet além do tradicional.',
    notes: ['Inclui confeitos decorativos e um bastão de LED de brinde para o aniversariante.', POPCORN_TOPPINGS, PACK_QUOTE, TRAVEL_QUOTE],
    addons: [{ id: 'bastao-led', label: 'Bastão de LED extra (cada)', price: 15 }]
  },
  {
    id: 'cama-elastica', title: 'Cama elástica',
    category: 'Brinquedos', image: 'cama-elastica', sizeLabel: 'Aniversários e eventos', isConsultation: true,
    variations: eventOptions(380, 190, 'pacote de até 4 horas'),
    description: 'Cama elástica com monitor para acompanhar as crianças e estrutura para o evento.',
    notes: [EVENT_AVAILABILITY, TRAVEL_QUOTE]
  },
  {
    id: 'piscina-bolinhas', title: 'Piscina de bolinhas',
    category: 'Brinquedos', image: 'piscina-bolinhas', sizeLabel: 'Aniversários e eventos', isConsultation: true,
    variations: eventOptions(380, 190, 'pacote de até 4 horas'),
    description: 'Piscina de bolinhas com monitor para acompanhar as crianças e estrutura para o evento.',
    notes: [EVENT_AVAILABILITY, TRAVEL_QUOTE]
  },
  {
    id: 'casadinha-brinquedos', title: 'Casadinha de cama elástica e piscina de bolinhas',
    category: 'Brinquedos', image: 'casadinha-brinquedos', sizeLabel: 'Aniversários e eventos', isConsultation: true,
    variations: eventOptions(700, 360, 'pacote de até 4 horas'),
    description: 'Cama elástica, piscina de bolinhas e monitor para acompanhar as crianças, com estrutura completa.',
    notes: [EVENT_AVAILABILITY, TRAVEL_QUOTE]
  },
  {
    id: 'cerimonial-eventos', title: 'Sandra Leão Cerimonial e Eventos',
    category: 'Outros serviços', image: 'cerimonial-eventos', sizeLabel: 'Cerimonial e organização de eventos',
    isConsultation: true, variations: [{ id: 'orcamento', label: 'Orçamento personalizado' }],
    description: 'Atendimento personalizado para festas infantis, casamentos, formaturas, shows, congressos, eventos corporativos e divulgações.',
    notes: [
      'Cerimonial: recepção e direcionamento, registro e guarda de presentes, pulseiras de identificação, distribuição de brindes e lembrancinhas, controle de bebidas e acompanhamento do buffet.',
      'Apoio: equipe de segurança, segurança policial, enfermeira e bombeiros civis.'
    ],
    instagram: 'sandraleaocerimonial'
  },
  {
    id: 'lion-drinks', title: 'Lion Drinks MCZ',
    category: 'Outros serviços', image: 'lion-drinks', sizeLabel: 'Drinks com frutas da época',
    isConsultation: true, variations: [{ id: 'orcamento', label: 'Orçamento personalizado' }],
    description: 'Opções com e sem álcool para festas adultas, infantis e eventos em geral.',
    instagram: 'liondrinksmcz'
  },
  {
    id: 'brindes-personalizados', title: 'Brindes personalizados',
    category: 'Personalizados', image: 'brindes-personalizados', sizeLabel: 'Para festas e empresas',
    isConsultation: true, variations: [{ id: 'orcamento', label: 'Orçamento conforme o brinde' }],
    description: 'Personalização de diversos tipos de brindes. O valor depende do brinde escolhido.'
  }
];
