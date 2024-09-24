// Museu Oscar Niemeyer (MON) - Fotos
import MON_Cafe from '../assets/images/MON/MON_Cafe.webp';
import MON_Cima from '../assets/images/MON/MON_Cima.jpg';
import MON_Escultura from '../assets/images/MON/MON_Escultura.webp';
import MON_Frente from '../assets/images/MON/MON_Frente.jpeg';
import MON_Noite from '../assets/images/MON/MON_Noite.jpeg';

// Parque Barigui - Fotos
import Barigui_Aerea from '../assets/images/Barigui/Arvores_Dia.jpg';
import Barigui_Cara_Correndo from '../assets/images/Barigui/Cara_Correndo.jpg';
import Barigui_Fauna from '../assets/images/Barigui/Fauna_Barigui.jpg';
import Barigui_Predios from '../assets/images/Barigui/Predios_Barigui.jpg';
import Barigui_Predios_Noite from '../assets/images/Barigui/Predios_Noite.jpg';

// Jardim Botânico de Curitiba
import Ceu from '../assets/images/JardimBotanico/Ceu.jog.jpg';
import Chao from '../assets/images/JardimBotanico/Chao.jpg';
import Flor_Vermelha from '../assets/images/JardimBotanico/Flor_Vermelha.jpg';
import Flores_Amarelas from '../assets/images/JardimBotanico/Flores_Amarelas.jpg';
import Monumento_Principal from '../assets/images/JardimBotanico/Monumento_Principal.jpg';


export const places = 
  [
    {
      img: "https://picsum.photos/220/130",
      name: "Jardim Botânico de Curitiba",
      desc: "O Jardim Botânico de Curitiba é uma das principais atrações da cidade, conhecido por sua estufa de estrutura metálica inspirada no Palácio de Cristal de Londres. O local abriga uma vasta coleção de plantas nativas e exóticas, além de trilhas para caminhadas e espaços para piquenique.",
      endereco:
        "R. Engo. Ostoja Roguski, s/n - Jardim Botânico, Curitiba - PR, 80210-390",
      telefone: "+55 41 3264-6994",
      nota: 4.8,
      placeId: "ChIJZW0jbP_k3JQRhKfaYzO_udw",
      fotos: 
        [Ceu, Chao, Flor_Vermelha, Flores_Amarelas, Monumento_Principal
      ],
    },
    {
      img: "https://picsum.photos/220/130",
      name: "Museu Oscar Niemeyer (MON)",
      desc: "O Museu Oscar Niemeyer é um ícone arquitetônico em Curitiba, projetado pelo renomado arquiteto brasileiro Oscar Niemeyer. Também conhecido como 'Museu do Olho', o MON abriga uma vasta coleção de arte contemporânea, design e arquitetura.",
      endereco: "R. Mal. Hermes, 999 - Centro Cívico, Curitiba - PR, 80530-230",
      telefone: "+55 41 3350-4400",
      nota: 4.8,
      placeId: "ChIJFWlvqB_k3JQR7jsyAF9M8vU",
      fotos: 
        [MON_Cafe, MON_Cima, MON_Escultura, MON_Frente, MON_Noite  
      ],
    },
    {
      img: "https://picsum.photos/220/130",
      name: "Ópera de Arame",
      desc: "A Ópera de Arame é um teatro ao ar livre localizado dentro de um ambiente natural, com uma estrutura de tubos de aço e teto transparente. O local é frequentemente utilizado para apresentações artísticas, concertos e eventos culturais.",
      endereco: "R. João Gava, 970 - Abranches, Curitiba - PR, 82130-010",
      telefone: "+55 41 3354-4482",
      nota: 4.8,
      placeId: "ChIJ9VsTK2jn3JQRkEQgTpixey4",
    },
    {
      img: "https://picsum.photos/220/130",
      name: "Parque Tanguá",
      desc: "O Parque Tanguá é um dos parques mais bonitos de Curitiba, com belos lagos, cascatas, trilhas para caminhada e mirantes com vista panorâmica da cidade. É um lugar ideal para relaxar, fazer um picnic ou praticar esportes ao ar livre.",
      endereco: "R. Oswaldo Maciel, 97 - Taboão, Curitiba - PR, 82130-494",
      telefone: "+55 41 3350-8235",
      nota: 4.8,
      placeId: "ChIJQSAIRdTm3JQR3EBLwWaWlGk",
    },
    {
      img: "https://picsum.photos/220/130",
      name: "Mercado Municipal de Curitiba",
      desc: "O Mercado Municipal de Curitiba é um lugar vibrante onde os visitantes podem explorar uma variedade de barracas e lojas vendendo frutas frescas, queijos, carnes, produtos locais e artesanato. É um ótimo local para experimentar a culinária local e conhecer a cultura da cidade.",
      endereco: "Av. Sete de Setembro, 1865 - Centro, Curitiba - PR, 80230-901",
      telefone: "+55 41 3363-3764",
      nota: 4.8,
      placeId: "ChIJnYfZ7ETk3JQRKsDrOXtHVTU",
    },
    {
      img: "https://picsum.photos/220/130",
      name: "Bosque Alemão",
      desc: "O Bosque Alemão é uma homenagem à cultura germânica, com trilhas arborizadas, uma casa típica em enxaimel, um mirante com vista para a cidade e a Torre dos Filósofos, que abriga uma biblioteca com obras em alemão. É um lugar encantador para passear e apreciar a natureza.",
      endereco:
        "R. Niccolo Paganini, 666 - Vista Alegre, Curitiba - PR, 80820-070",
      telefone: "+55 41 3362-3400",
      nota: 4.8,
      placeId: "ChIJxYnV2Qf73JQR0ASXvKNB7mA",
    },
    {
      img: "https://picsum.photos/220/130",
      name: "Parque Barigui",
      desc: "O Parque Barigui é um dos maiores parques urbanos de Curitiba, com uma vasta área verde, lagos, trilhas para caminhada, ciclovia e espaços para atividades esportivas e recreativas. É um local popular para passeios em família, piqueniques e prática de esportes ao ar livre.",
      endereco: "BR 277 - Santo Inácio, Curitiba - PR, 82020-000",
      telefone: "+55 41 3350-9928",
      nota: 4.8,
      placeId: "ChIJp1_LiN_j3JQRUx7PRRpC7WQ",
      fotos: 
        [Barigui_Aerea, Barigui_Cara_Correndo, Barigui_Fauna, Barigui_Predios, Barigui_Predios_Noite
      ],
    },
    {
      img: "https://picsum.photos/220/130",
      name: "Memorial Ucraniano",
      desc: "O Memorial Ucraniano é uma homenagem à cultura ucraniana em Curitiba, com uma réplica da Igreja de São Miguel, típica das regiões rurais da Ucrânia. O local também abriga um museu com exposições sobre a história e tradições ucranianas, além de um jardim com esculturas e um palco para apresentações culturais.",
      endereco:
        "R. Dr. Claudino dos Santos, s/n - Centro Cívico, Curitiba - PR, 80530-240",
      telefone: "+55 41 3350-9930",
      nota: 4.8,
      placeId: "ChIJm1uIYxjh3JQRPo8nci1UBgE",
    },
    {
      img: "https://picsum.photos/220/130",
      name: "Parque São Lourenço",
      desc: "O Parque São Lourenço é um espaço de lazer e preservação ambiental em Curitiba, com um grande lago onde é possível fazer passeios de pedalinho, trilhas para caminhada, quadras esportivas e áreas para piquenique. É um local tranquilo e ideal para relaxar em contato com a natureza.",
      endereco: "R. Mateus Leme, s/n - São Lourenço, Curitiba - PR, 80510-190",
      telefone: "+55 41 3350-9940",
      nota: 4.8,
      placeId: "ChIJrUCHEy5Lz5QRFtCKVZmMbzA",
    },
    {
      img: "https://picsum.photos/220/130",
      name: "Museu Paranaense",
      desc: "O Museu Paranaense é o mais antigo museu do estado, com um acervo que conta a história e cultura do Paraná, desde os povos indígenas até os dias atuais. O museu possui exposições permanentes e temporárias, além de atividades educativas e culturais para o público.",
      endereco: "R. Kellers, 289 - São Francisco, Curitiba - PR, 80510-240",
      telefone: "+55 41 3304-3300",
      nota: 4.8,
      placeId: "ChIJV5nIeA7k3JQRgFtWpJe_Ay4",
    },
    {
      img: "https://picsum.photos/220/130",
      name: "Torre Panorâmica",
      desc: "A Torre Panorâmica oferece uma vista panorâmica de 360 graus da cidade de Curitiba, permitindo que os visitantes apreciem a paisagem urbana e os pontos turísticos de diferentes ângulos. É uma oportunidade única para ter uma visão ampla da cidade.",
      endereco:
        "R. Professor Lycio Grein de Castro Vellozo, 191 - Mercês, Curitiba - PR, 80710-620",
      telefone: "+55 41 3339-7611",
      nota: 4.8,
      placeId: "ChIJ7_HtTPvj3JQR7mIIArFJ93k",
    },
    {
      img: "https://picsum.photos/220/130",
      name: "Memorial Árabe",
      desc: "O Memorial Árabe é uma homenagem à cultura árabe em Curitiba, com uma arquitetura inspirada nas mesquitas do Oriente Médio. O local abriga exposições culturais, eventos e apresentações artísticas relacionadas à comunidade árabe na cidade.",
      endereco:
        "Praça Gibran Khalil Gibran, s/n - Centro, Curitiba - PR, 80010-080",
      telefone: "+55 41 3339-7530",
      nota: 4.8,
      placeId: "ChIJQY_8thXk3JQRGL",
    },
    {
      img: "https://picsum.photos/220/130",
      name: "Parque Tingui",
      desc: "O Parque Tingui é conhecido por sua área verde exuberante, lagos, pontes de madeira e trilhas para caminhada. O parque também abriga o Memorial Ucraniano e é um local popular para atividades ao ar livre, como passeios de bicicleta e piqueniques.",
      endereco:
        "R. Dr. João Xavier da Silva, s/n - São João, Curitiba - PR, 82030-200",
      telefone: "+55 41 3350-9926",
      nota: 4.8,
      placeId: "ChIJm1uIYxjh3JQRPo8nci1UBgE",
    },
    {
      img: "https://picsum.photos/220/130",
      name: "Museu do Holocausto de Curitiba",
      desc: "O Museu do Holocausto de Curitiba é um espaço dedicado à memória das vítimas do Holocausto e à promoção da tolerância e respeito à diversidade. O museu possui exposições permanentes e temporárias sobre o Holocausto e eventos relacionados à história judaica.",
      endereco:
        "R. Coronel Agostinho Macedo, 248 - Bom Retiro, Curitiba - PR, 80520-230",
      telefone: "+55 41 3022-4202",
      nota: 4.8,
      placeId: "ChIJa4YmlBzk3JQRS4OdSageFLA",
    },
    {
      img: "https://picsum.photos/220/130",
      name: "Parque das Pedreiras (Pedreira Paulo Leminski)",
      desc: "O Parque das Pedreiras é um espaço cultural ao ar livre em Curitiba, conhecido por sediar eventos culturais, shows e apresentações artísticas. O local oferece uma atmosfera única, cercada por paredões de pedra e uma grande área verde.",
      endereco: "R. João Gava, s/n - Abranches, Curitiba - PR, 82130-490",
      telefone: "+55 41 3350-4468",
      nota: 4.8,
      placeId: "ChIJ9c4QPc7m3JQRrKNNMmH",
    }
];
