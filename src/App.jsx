import { useState, useMemo, useEffect, useRef, useCallback } from "react";

// ─── VOCABULAIRE ───────────────────────────────────────────────────────────────

// ─── VOCABULAIRE (667 mots) ─────────────────────────────────────────────────
const VOCABULARY = [
  {id:1,tunisian:'Degla',french:'dattes',cat1:'Aliments',cat2:'fruits'},
  {id:2,tunisian:'Delle3',french:'Pastèque',cat1:'Aliments',cat2:'fruits'},
  {id:3,tunisian:'Anzass',french:'poire',cat1:'Aliments',cat2:'fruits'},
  {id:4,tunisian:'Toffe7',french:'pomme',cat1:'Aliments',cat2:'fruits'},
  {id:5,tunisian:'Sfenneria',french:'carotte',cat1:'Aliments',cat2:'légumes'},
  {id:6,tunisian:'9ra3',french:'courgette',cat1:'Aliments',cat2:'légumes'},
  {id:7,tunisian:'Loubia',french:'haricots blancs',cat1:'Aliments',cat2:'légumes'},
  {id:8,tunisian:'Zitoune',french:'olives',cat1:'Aliments',cat2:'légumes'},
  {id:9,tunisian:'batata',french:'patate',cat1:'Aliments',cat2:'légumes'},
  {id:10,tunisian:'jelbéna',french:'petits pois',cat1:'Aliments',cat2:'légumes'},
  {id:11,tunisian:'Felfel',french:'Poivron/Piment',cat1:'Aliments',cat2:'légumes'},
  {id:12,tunisian:'Batata',french:'pomme de terre',cat1:'Aliments',cat2:'légumes'},
  {id:13,tunisian:'slata',french:'salade',cat1:'Aliments',cat2:'légumes'},
  {id:14,tunisian:'Tmatem',french:'tomate',cat1:'Aliments',cat2:'légumes'},
  {id:15,tunisian:'mé',french:'eau',cat1:'Aliments',cat2:'Nourriture'},
  {id:16,tunisian:'Zitt',french:'huile d\'olive',cat1:'Aliments',cat2:'Nourriture'},
  {id:17,tunisian:'Lben',french:'lait fermenté',cat1:'Aliments',cat2:'Nourriture'},
  {id:18,tunisian:'zibda',french:'le beurre',cat1:'Aliments',cat2:'Nourriture'},
  {id:19,tunisian:'Ma9rouna',french:'pâtes',cat1:'Aliments',cat2:'Nourriture'},
  {id:20,tunisian:'Rouz',french:'riz',cat1:'Aliments',cat2:'Nourriture'},
  {id:21,tunisian:'l7am',french:'viande',cat1:'Aliments',cat2:'Nourriture'},
  {id:22,tunisian:'l7am marfroum',french:'viande hachée',cat1:'Aliments',cat2:'Nourriture'},
  {id:23,tunisian:'Mahrouq',french:'(plat) brûlé',cat1:'Aliments',cat2:'Plats'},
  {id:24,tunisian:'Massét/Massta',french:'(plat) fade',cat1:'Aliments',cat2:'Plats'},
  {id:25,tunisian:'Fréchk',french:'(plat) Frais',cat1:'Aliments',cat2:'Plats'},
  {id:26,tunisian:'Fésséd/Qaress',french:'(plat) périmé',cat1:'Aliments',cat2:'Plats'},
  {id:27,tunisian:'Mzayyét barcha',french:'(plat) trop huileux',cat1:'Aliments',cat2:'Plats'},
  {id:28,tunisian:'kosksi',french:'couscous',cat1:'Aliments',cat2:'Plats'},
  {id:29,tunisian:'koksi',french:'couscous',cat1:'Aliments',cat2:'Plats'},
  {id:30,tunisian:'L sen',french:'langue',cat1:'Aliments',cat2:'Plats'},
  {id:31,tunisian:'Mekla',french:'Nourriture',cat1:'Aliments',cat2:'Plats'},
  {id:32,tunisian:'Mékla béyta',french:'nourriture de la veille',cat1:'Aliments',cat2:'Plats'},
  {id:33,tunisian:'Âdhma mrawba',french:'œuf jaune coulant',cat1:'Aliments',cat2:'Plats'},
  {id:34,tunisian:'Khobz Yébéss',french:'Pain dur',cat1:'Aliments',cat2:'Plats'},
  {id:35,tunisian:'Khrobz béyét',french:'Pain rassis',cat1:'Aliments',cat2:'Plats'},
  {id:36,tunisian:'Harr',french:'Piquant',cat1:'Aliments',cat2:'Plats'},
  {id:37,tunisian:'leblebi',french:'plat soupe poix chiche',cat1:'Aliments',cat2:'Plats'},
  {id:38,tunisian:'ma9rouna',french:'plat vermisselle rouge',cat1:'Aliments',cat2:'Plats'},
  {id:39,tunisian:'richta',french:'vermisselle',cat1:'Aliments',cat2:'Plats'},
  {id:40,tunisian:'Lhima',french:'viande',cat1:'Aliments',cat2:'Plats'},
  {id:41,tunisian:'flouss',french:'argent',cat1:'Chiffres',cat2:'Commerce'},
  {id:42,tunisian:'Andkom qiyas akher ?',french:'Avez d\'autres tailles ?',cat1:'Chiffres',cat2:'Commerce'},
  {id:43,tunisian:'Ghali barcha !',french:'C\'est trop cher !',cat1:'Chiffres',cat2:'Commerce'},
  {id:44,tunisian:'Qaddesh hedha ?',french:'Combien cela coute-t-il ?',cat1:'Chiffres',cat2:'Commerce'},
  {id:45,tunisian:'Mnin hadha ?',french:'D\'où ça vient ?',cat1:'Chiffres',cat2:'Commerce'},
  {id:46,tunisian:'Souk',french:'marché',cat1:'Chiffres',cat2:'Commerce'},
  {id:47,tunisian:'Hseb',french:'payer',cat1:'Chiffres',cat2:'Commerce'},
  {id:48,tunisian:'soumou',french:'prix',cat1:'Chiffres',cat2:'Commerce'},
  {id:49,tunisian:'Rakhess',french:'réduction',cat1:'Chiffres',cat2:'Commerce'},
  {id:50,tunisian:'Tnajjem tnqes chwaya ?',french:'Tu peux me faire une réduction ?',cat1:'Chiffres',cat2:'Commerce'},
  {id:52,tunisian:'Alf',french:'1000',cat1:'Chiffres',cat2:'Milliers'},
  {id:53,tunisian:'Âchaléf',french:'10000',cat1:'Chiffres',cat2:'Milliers'},
  {id:54,tunisian:'Hdéchénalf',french:'11000',cat1:'Chiffres',cat2:'Milliers'},
  {id:55,tunisian:'Athnachénalf',french:'12000',cat1:'Chiffres',cat2:'Milliers'},
  {id:56,tunisian:'Thlottachénalf',french:'13000',cat1:'Chiffres',cat2:'Milliers'},
  {id:57,tunisian:'Ârbâatachenalf',french:'14000',cat1:'Chiffres',cat2:'Milliers'},
  {id:58,tunisian:'Khomstachenalf',french:'15000',cat1:'Chiffres',cat2:'Milliers'},
  {id:59,tunisian:'Sottachenalf',french:'16000',cat1:'Chiffres',cat2:'Milliers'},
  {id:60,tunisian:'Sbâatachenalf',french:'17000',cat1:'Chiffres',cat2:'Milliers'},
  {id:61,tunisian:'Thmontachenalf',french:'18000',cat1:'Chiffres',cat2:'Milliers'},
  {id:62,tunisian:'Tsâatachenalf',french:'19000',cat1:'Chiffres',cat2:'Milliers'},
  {id:63,tunisian:'Alfine',french:'2000',cat1:'Chiffres',cat2:'Milliers'},
  {id:64,tunisian:'Îchrine alf',french:'20000',cat1:'Chiffres',cat2:'Milliers'},
  {id:65,tunisian:'Thléthaléf',french:'3000',cat1:'Chiffres',cat2:'Milliers'},
  {id:66,tunisian:'Arâaléf',french:'4000',cat1:'Chiffres',cat2:'Milliers'},
  {id:67,tunisian:'Khamsaléf',french:'5000',cat1:'Chiffres',cat2:'Milliers'},
  {id:68,tunisian:'Séttaléf',french:'6000',cat1:'Chiffres',cat2:'Milliers'},
  {id:69,tunisian:'Sabâléf',french:'7000',cat1:'Chiffres',cat2:'Milliers'},
  {id:70,tunisian:'Thmanialéf',french:'8000',cat1:'Chiffres',cat2:'Milliers'},
  {id:71,tunisian:'Tesâléf',french:'9000',cat1:'Chiffres',cat2:'Milliers'},
  {id:72,tunisian:'Wé7ed',french:'1',cat1:'Chiffres',cat2:'Nombres'},
  {id:73,tunisian:'3achra',french:'10',cat1:'Chiffres',cat2:'Nombres'},
  {id:74,tunisian:'Mié',french:'100',cat1:'Chiffres',cat2:'Nombres'},
  {id:75,tunisian:'7déch',french:'11',cat1:'Chiffres',cat2:'Nombres'},
  {id:76,tunisian:'Athnach',french:'12',cat1:'Chiffres',cat2:'Nombres'},
  {id:77,tunisian:'Thlottach',french:'13',cat1:'Chiffres',cat2:'Nombres'},
  {id:78,tunisian:'Arb3atach',french:'14',cat1:'Chiffres',cat2:'Nombres'},
  {id:79,tunisian:'5omstach',french:'15',cat1:'Chiffres',cat2:'Nombres'},
  {id:80,tunisian:'Sottach',french:'16',cat1:'Chiffres',cat2:'Nombres'},
  {id:81,tunisian:'Sba3tach',french:'17',cat1:'Chiffres',cat2:'Nombres'},
  {id:82,tunisian:'Thmontach',french:'18',cat1:'Chiffres',cat2:'Nombres'},
  {id:83,tunisian:'Tsa3tach',french:'19',cat1:'Chiffres',cat2:'Nombres'},
  {id:84,tunisian:'Thine/Zoz',french:'2',cat1:'Chiffres',cat2:'Nombres'},
  {id:85,tunisian:'3echrine',french:'20',cat1:'Chiffres',cat2:'Nombres'},
  {id:86,tunisian:'Thlétha',french:'3',cat1:'Chiffres',cat2:'Nombres'},
  {id:87,tunisian:'Thléthin',french:'30',cat1:'Chiffres',cat2:'Nombres'},
  {id:88,tunisian:'Arb3a',french:'4',cat1:'Chiffres',cat2:'Nombres'},
  {id:89,tunisian:'Arb3ine',french:'40',cat1:'Chiffres',cat2:'Nombres'},
  {id:90,tunisian:'Samsa',french:'5',cat1:'Chiffres',cat2:'Nombres'},
  {id:91,tunisian:'5amssine',french:'50',cat1:'Chiffres',cat2:'Nombres'},
  {id:92,tunisian:'Sitta',french:'6',cat1:'Chiffres',cat2:'Nombres'},
  {id:93,tunisian:'Séttine',french:'60',cat1:'Chiffres',cat2:'Nombres'},
  {id:94,tunisian:'Sab3a',french:'7',cat1:'Chiffres',cat2:'Nombres'},
  {id:95,tunisian:'Sab3ine',french:'70',cat1:'Chiffres',cat2:'Nombres'},
  {id:96,tunisian:'Thmanya',french:'8',cat1:'Chiffres',cat2:'Nombres'},
  {id:97,tunisian:'Thménine',french:'80',cat1:'Chiffres',cat2:'Nombres'},
  {id:98,tunisian:'Tiss3a',french:'9',cat1:'Chiffres',cat2:'Nombres'},
  {id:99,tunisian:'Tés3ine',french:'90',cat1:'Chiffres',cat2:'Nombres'},
  {id:100,tunisian:'ba3d ma nji',french:'après que je vienne',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:101,tunisian:'2istanna',french:'attends',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:102,tunisian:'tayara',french:'au top',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:103,tunisian:'9bal ma nji',french:'avant que je vienne',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:104,tunisian:'Hétheka/Héthika/Héthomka',french:'ça (lui, elle, eux) *plus loin',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:105,tunisian:'Hétha/ Héthi / Héthom',french:'ça (lui, elle, eux) *plus près',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:106,tunisian:'Missélich',french:'ce n\'est pas grave',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:107,tunisian:'Naya (néyé)',french:'c\'est crû',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:108,tunisian:'Ralass',french:'c\'est fini',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:109,tunisian:'Wadha7',french:'Clair',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:110,tunisian:'Khaka',french:'Comme ça ! (reproche)',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:111,tunisian:'ezreb',french:'dépeche toi',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:112,tunisian:'é3tini',french:'donne moi',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:113,tunisian:'Asmani',french:'écoute moi bien',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:114,tunisian:'Malla malla',french:'eh ben !',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:115,tunisian:'Bithabt',french:'exactement',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:116,tunisian:'ici',french:'houni',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:117,tunisian:'La Fama',french:'il n\'y a pas',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:118,tunisian:'Yodhorli',french:'il parait',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:119,tunisian:'Fama',french:'il y a',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:120,tunisian:'mândich chey',french:'j\'ai rien',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:121,tunisian:'Nefhem fik',french:'je comprends dans toi -->  je te comprends',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:122,tunisian:'Ma nsadda9ch',french:'Je ne crois pas !',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:123,tunisian:'Na3ref',french:'Je sais',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:124,tunisian:'N7ebek (Nhebek)',french:'je t\'aime',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:125,tunisian:'Né7abb',french:'je veux',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:126,tunisian:'Nesma3 fik (fi+EK)',french:'j\'écoute dans toi  -->  je t\'écoute',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:127,tunisian:'S7i7',french:'Juste',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:128,tunisian:'Ghadi',french:'là-bas',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:129,tunisian:'Ech-har elli fettet',french:'mois dernier (qui est passé)',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:130,tunisian:'La +',french:'négation',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:131,tunisian:'Né7abbou',french:'nous voulons',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:132,tunisian:'béhi',french:'ok',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:133,tunisian:'Héyal',french:'Parfait',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:134,tunisian:'Mouch barcha',french:'pas beaucoup',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:135,tunisian:'Mouch chwaya',french:'pas peu',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:136,tunisian:'Mouch dima',french:'pas toujours',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:137,tunisian:'Momken/Yomken',french:'Possible',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:138,tunisian:'Chfama',french:'Qu\'est qu\'il y a',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:139,tunisian:'gibli',french:'ramene moi',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:140,tunisian:'chouf',french:'regarde',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:141,tunisian:'Femtah?',french:'t\'as compris?',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:142,tunisian:'3andek',french:'tu as',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:143,tunisian:'Twahachtech',french:'tu me manques',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:144,tunisian:'Barra',french:'vas y',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:145,tunisian:'Bil 7a9 !!',french:'vraiment?',cat1:'Expressions',cat2:'Expressions courantes'},
  {id:146,tunisian:'Hayya nézérbou',french:'Allez on fait vite',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:147,tunisian:'Hayya nemchiw ?',french:'Allez on y va ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:148,tunisian:'Lioum béch nkammél emakhér',french:'Aujourd\'hui je vais finir tard',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:149,tunisian:'Barcha circulation, mbalâa',french:'Beaucoup de circulation, c\'est bouché',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:150,tunisian:'Yestahel',french:'Bien fait pour lui',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:151,tunisian:'Yezzi !',french:'Ca suffit !',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:152,tunisian:'Maânéha',french:'ça veut dire',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:153,tunisian:'Mouch Waqtou',french:'Ce n\'est pas le bon moment',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:154,tunisian:'Sahhit !',french:'C\'est bien ! Bravo !',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:155,tunisian:'Khssara',french:'c\'est dommage',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:156,tunisian:'Chnowa hédha',french:'C\'est quoi ça ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:157,tunisian:'Chnowa laâché ellila',french:'C\'est quoi le dîner ce soir ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:158,tunisian:'Kahaw',french:'C\'est tout',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:159,tunisian:'Sâib chwayya',french:'C\'est un peu compliqué',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:160,tunisian:'Fékra héyla',french:'C\'est une très bonne idée',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:161,tunisian:'Hakka',french:'comme ceci',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:162,tunisian:'Kifech tâada nharek ?',french:'Comment s\'est passé ta journée ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:163,tunisian:'Hakkéka w barra',french:'couci-couça',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:164,tunisian:'Léff ala rouhék',french:'Couvre toi bien',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:165,tunisian:'Âatini rayék',french:'Donne moi ton avis',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:166,tunisian:'Âatini noumrouk',french:'Donne moi ton numéro',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:167,tunisian:'Tésmaâ féyya?',french:'Est-ce que tu m\'écoutes?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:168,tunisian:'Samahni, ennajém netâada ?',french:'Excuse moi je peux passer ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:169,tunisian:'Fassarli',french:'Explique moi',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:170,tunisian:'Mabrouk',french:'Félicitations',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:171,tunisian:'Sakker el béb wrak',french:'Ferme la porte derriere toi',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:172,tunisian:'Qadéch el waqét ?',french:'Il est quelle heure ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:173,tunisian:'Edenia bérda lioum',french:'Il fait froid aujourd\'hui',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:174,tunisian:'Lézém Nahkiw',french:'Il faut qu\'on parle',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:175,tunisian:'Haddadni',french:'Il m\'a menacé',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:176,tunisian:'Fama 9dhia fel dar ?',french:'Il y a des courses à la maison ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:177,tunisian:'Enêetni âl thnéyya',french:'Indique-moi le chemin',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:178,tunisian:'Hachti bik',french:'J\'ai besoin de toi',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:179,tunisian:'S\'khonét',french:'J\'ai chaud',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:180,tunisian:'Chéhi(a) choklata',french:'J\'ai envie de chocolat',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:181,tunisian:'Khoft',french:'J\'ai eu peur',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:182,tunisian:'Joôt',french:'J\'ai faim',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:183,tunisian:'Kammalét',french:'J\'ai fini',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:184,tunisian:'Brédét / Grésset',french:'J\'ai froid',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:185,tunisian:'Rassi Youjaâ',french:'J\'ai mal à la tête',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:186,tunisian:'Lammit eddar',french:'J\'ai rangé la maison',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:187,tunisian:'Fétni et-train',french:'J\'ai raté le train',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:188,tunisian:'Ôtocht',french:'J\'ai soif',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:189,tunisian:'Jéni ennoum',french:'J\'ai sommeil',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:190,tunisian:'Hatit kol chay fil félija',french:'J\'ai tout mis dans la valise',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:191,tunisian:'Ma yhemnich',french:'Je m\'en fous',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:192,tunisian:'Mafhémtéch',french:'Je n\'ai pas compris',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:193,tunisian:'Maândich  chéhia',french:'Je n\'ai pas d\'appétit',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:194,tunisian:'Mafouqich flouss',french:'Je n\'ai pas d\'argent sur moi',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:195,tunisian:'Maâmaltéch bélâani',french:'je n\'ai pas fait exprès',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:196,tunisian:'Ménich Qad baathi',french:'Je ne me sens pas très bien',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:197,tunisian:'Mannajaméch',french:'Je ne peux pas',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:198,tunisian:'Manâarafech',french:'Je ne sais pas',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:199,tunisian:'Manhébéch neêdik',french:'Je ne veux pas te contaminer',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:200,tunisian:'Nahki bjéddi',french:'Je parle sérieusement',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:201,tunisian:'Chnowa njib fi yéddi ?',french:'Je ramène quoi sur mon chemin ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:202,tunisian:'Téêb(a) w meînich bech nokhréj',french:'Je suis fatigué(e) et je ne vais pas sortir',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:203,tunisian:'Taw nkallmék mbaêéd',french:'Je t\'appelle plus tard',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:204,tunisian:'Mechi(a) lel matar',french:'Je vais à l\'aéroport',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:205,tunisian:'Béch n\'hawél',french:'Je vais essayer',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:206,tunisian:'Béch néttaka chaya',french:'Je vais m\'allonger un peu',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:207,tunisian:'Bech nékhou taxi',french:'Je vais prendre un taxi',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:208,tunisian:'N\'héb néchri karahba',french:'Je veux acheter une voiture',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:209,tunisian:'N\'héb nékri karahba',french:'Je veux louer une voiture',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:210,tunisian:'Nhéb késs mé',french:'Je veux un verre d\'eau',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:211,tunisian:'Ch\'qallék ettbib',french:'Le médecin t\'a dit quoi ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:212,tunisian:'Léblassa méziéna barcha',french:'L\'endroit est très beau',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:213,tunisian:'Ettoilette ndhifa ?',french:'les toilettes sont propres ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:214,tunisian:'Lahkéya twila barcha',french:'L\'histoire est très longue',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:215,tunisian:'Tatih qdar',french:'manque de respect',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:216,tunisian:'Wéldi njah fil bac',french:'Mon fils a eu son bac',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:217,tunisian:'Télifouni tah mel charge',french:'Mon téléphone est déchargé',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:218,tunisian:'Matkhaféch',french:'N\'aie pas peur',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:219,tunisian:'Sérqouli télifouni',french:'On m\'a volé mon téléphone',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:220,tunisian:'Sérqoulna lkarhba',french:'On nous a volé la voiture',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:221,tunisian:'Nétqablou fi rass énnahéj',french:'On se retrouve au bout de la rue',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:222,tunisian:'Âmalna jaw',french:'On s\'est bien amusés',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:223,tunisian:'Méchine lel bhar',french:'On va à la plage',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:224,tunisian:'Némchiw naqdhiw ?',french:'On va faire les courses ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:225,tunisian:'Winou kabbouti ?',french:'Où est mon manteau ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:226,tunisian:'Winhom Lmnéchéf ?',french:'Où sont les serviettes ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:227,tunisian:'Win wakafét el karahba ?',french:'Où tu as garé la voiture ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:228,tunisian:'Samahni',french:'Pardonne moi',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:229,tunisian:'Tnajjém tsallafni flouss ?',french:'Peux-tu me prêter de l\'argent ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:230,tunisian:'Tnajjem tâawed',french:'Peux-tu répéter ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:231,tunisian:'Chbik mét5achéch(a) ?',french:'Pourquoi tu es fâché(e) ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:232,tunisian:'Âalech',french:'Pourquoi?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:233,tunisian:'Rod bélék âla Rouheék',french:'Prends soin de toi',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:234,tunisian:'Ochrob dwék taw tétfarhéd',french:'Prends tes médicaments, tu te sentiras mieux',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:235,tunisian:'Hadher rouhék, hani jéy(a)',french:'Prépare-toi, j\'arrive',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:236,tunisian:'Inchallah labess / Rabi yéchfik',french:'Prompt rétablissement',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:237,tunisian:'Kissébba ?',french:'Que nous vaut cette honneur?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:238,tunisian:'Malla jaw !',french:'Quelle ambiance !',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:239,tunisian:'Ech Qawlék',french:'Qu\'est ce que tu en penses ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:240,tunisian:'Béch tansah\'ni ?',french:'Qu\'est ce que tu me recommandes ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:241,tunisian:'Chfamma jdid?',french:'Quoi de neuf?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:242,tunisian:'Jib el Khobz',french:'Ramène le pain',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:243,tunisian:'Brabi mnine ettoilette?',french:'Svp, c\'est par où les toilettes ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:244,tunisian:'Kathartélha',french:'t\'abuses',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:245,tunisian:'El barka fik',french:'Toutes mes condoléances',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:246,tunisian:'Klit bélgdé ?',french:'Tu as bien mangé ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:247,tunisian:'Khallast el parking ?',french:'Tu as payé le parking ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:248,tunisian:'Andék el Haqq',french:'Tu as raison',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:249,tunisian:'Ândék el haqq',french:'tu as raison',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:250,tunisian:'Métgachéch(a) alia ?',french:'Tu es fâché(e) contre moi ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:251,tunisian:'Chtâamel elila',french:'Tu fais quoi ce soir ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:252,tunisian:'Tosken bîid ?',french:'Tu habites loin ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:253,tunisian:'Twahachték',french:'Tu me manques',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:254,tunisian:'Mâa chkoun tahki ?',french:'Tu parles avec qui ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:255,tunisian:'Tah\'ki bjéddék ?',french:'Tu parles sérieusement ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:256,tunisian:'Tnajjém tâammeél aléyya',french:'Tu peux compter sur moi',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:257,tunisian:'Tnajjém tâawénni ?',french:'Tu peux m\'aider ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:258,tunisian:'Tfadlék ?',french:'tu plaisantes ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:259,tunisian:'Chnia béch télbess ?',french:'Tu vas mettre quoi ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:260,tunisian:'Win méchi ?',french:'Tu vas où ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:261,tunisian:'Wine méchi',french:'Tu vas où?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:262,tunisian:'Chnowa théb tochrob ?',french:'Tu veux boire quoi?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:263,tunisian:'Chnowa théb tékél ?',french:'Tu veux manger quoi?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:264,tunisian:'Cht\'hébbni naâmél ?',french:'Tu veux que je fasse quoi ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:265,tunisian:'T"hebb tji mâaya ?',french:'Tu veux venir avec moi ?',cat1:'Expressions',cat2:'Expressions utiles'},
  {id:266,tunisian:'3amel sahriya / 3amline',french:'(Je/tu/il) fait une soirée',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:267,tunisian:'Mésefer ghodwa',french:'(Je/tu/il) part demain',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:268,tunisian:'Mékhedh barcha Flouss',french:'(Je/tu/il) prend bcp d\'argent',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:269,tunisian:'Mécu tawa lim marché',french:'(Je/tu/il) vais mnt au marché',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:270,tunisian:'Chérine dar kbira',french:'(Nous/vous/ils) ont acheté une grande maison',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:271,tunisian:'7abbine yemchiw lil marché',french:'(Nous/vous/ils) veulent aller au marché',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:272,tunisian:'gibli merada',french:'apporte moi un coussin',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:273,tunisian:'Mba3red némchi lil dar',french:'Après je vais à la maison',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:274,tunisian:'Héthom wlédi',french:'ça ce sont mes enfants (présentation)',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:275,tunisian:'Hétha marti',french:'ça c\'est mon femme (présentation)',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:276,tunisian:'Hétha rajli',french:'ça c\'est mon mari (présentation)',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:277,tunisian:'s3ib barcha yéji',french:'ça va être difficile qu\'il vienne',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:278,tunisian:'Hem Teri',french:'c\'est à moi',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:279,tunisian:'Ta3 chkoune',french:'c\'est à qui',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:280,tunisian:'Missélich, mouch mochkel',french:'C\'est pas grave, ce n\'est pas un problème',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:281,tunisian:'Séhel barcha el tounsi',french:'c\'est très facile le tunisien',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:282,tunisian:'b3id chaya',french:'c\'est un peu loin',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:283,tunisian:'Chna7wélkom',french:'comment allez-vous',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:284,tunisian:'se3at yé5dem se3at yérte7',french:'des fois il travaille, des fois il se repose',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:285,tunisian:'é3tini',french:'donner moi',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:286,tunisian:'Mazzel bekri',french:'encore tôt (il est encore tôt)',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:287,tunisian:'Saker beb',french:'ferme la porte',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:288,tunisian:'Houni dari',french:'Ici ma maison',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:289,tunisian:'El béra7 mché',french:'il est parti hier',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:290,tunisian:'Yékel barcha',french:'il mange beaucoup',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:291,tunisian:'Yékel fou9 ellezm',french:'il mange trop',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:292,tunisian:'Yétkalem bil gdé bil 3arbi',french:'il parle bien en arabe',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:293,tunisian:'Ghodwa yémchi',french:'il part demain',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:294,tunisian:'Dima ye5dem',french:'il travaille tout le temps (toujours)',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:295,tunisian:'9lil mé yeji m3aya lil restaurant',french:'il vient peu avec moi au resto',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:296,tunisian:'Famma barcha 7outt',french:'il y a beaucoup de poisson',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:297,tunisian:'Jew Ma5er',french:'Ils sont venus tard',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:298,tunisian:'Néchri pizaa r5issa',french:'j\'achète une pizza pas chère',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:299,tunisian:'Gian',french:'j\'ai faim',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:300,tunisian:'Atchanne',french:'j\'ai soif',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:301,tunisian:'9rib nji',french:'je (viens) suis proche',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:302,tunisian:'Néssref 7atta touffa floussi',french:'Je dépense jusqu\'à ce que finit mon argent',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:303,tunisian:'Ena Saym(a)',french:'je jeûne',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:304,tunisian:'bech nekhdou',french:'je le prends',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:305,tunisian:'Nékel bech néich',french:'je mange pour vivre (je vis)',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:306,tunisian:'Nemchi 7atta El b7ar',french:'Je marche jusqu\'à la mer',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:307,tunisian:'Néskot 5ir',french:'je me tais mieux (vaut mieux se taire)',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:308,tunisian:'Mafhemtech',french:'je ne comprends pas',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:309,tunisian:'Ménich mséfer',french:'je ne pars pas',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:310,tunisian:'Ménich mékel el pizza',french:'je ne vais pas manger de pizza',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:311,tunisian:'Nehzzou Taxi',french:'je prends un taxi',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:312,tunisian:'Ena min Fransa',french:'je suis de France',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:313,tunisian:'Ena ta3eb',french:'je suis fatigué',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:314,tunisian:'Né5dem bech néssrof',french:'je travaille pour dépenser',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:315,tunisian:'Nemchi lil 5adhar',french:'je vais chez le primeur',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:316,tunisian:'Bech Né9dhi',french:'je vais faire les courses',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:317,tunisian:'N7eb pizza blech fromage',french:'je veux une pizza sans fromage',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:318,tunisian:'Ghadi darek',french:'Là bas ta maison',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:319,tunisian:'Nhar jom3a, barcha ness yemchiw li jéma3',french:'Le dimanche, bcp de gens vont à la mosquée',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:320,tunisian:'El 7outney',french:'le poisson est cru',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:321,tunisian:'Batata rayba',french:'les patates ne sont pas bonnes',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:322,tunisian:'Ma9rouna Tayba fou9 ellézim',french:'Les pates sont trop cuites',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:323,tunisian:'Koul chwaya',french:'mange un peu',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:324,tunisian:'Ena 3andi Audi',french:'Moi j\'ai une Audi',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:325,tunisian:'Jina bekri',french:'Nous sommmes venus tôt',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:326,tunisian:'narmou michiyu',french:'on fait un barbecue',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:327,tunisian:'Hell Chbek',french:'ouvre la fenêtre',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:328,tunisian:'Hel beb',french:'ouvre la porte',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:329,tunisian:'tkalam m3raya',french:'parle avec moi',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:330,tunisian:'2idha bech tmchi m3aya, ezreb!',french:'Si tu viens avec moi, fais vite',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:331,tunisian:'Amane, ija',french:'Stp/Svp, viens',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:332,tunisian:'brabi kbira dabuze citronnade',french:'svp donnez moi une citronnade',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:333,tunisian:'Ma5er tawa',french:'tard maintenant (il est tard mnt)',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:334,tunisian:'3omrek mé jit',french:'tu n\'es jamais venu',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:335,tunisian:'Té7ki kima tounsi bil 7a9',french:'Tu parles comme un tunisien vraiment',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:336,tunisian:'Bil 7a9 té7ki',french:'Tu parles vraiment? (t\'es sérieux?)',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:337,tunisian:'Tunis 5ir min Paris',french:'Tunis est mieux que Paris',cat1:'Expressions',cat2:'Phrases aléatoires'},
  {id:338,tunisian:'simha?',french:'c\'est bon?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:339,tunisian:'Awwél marra houni ?',french:'C\'est ta première fois ici ?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:340,tunisian:'b9addech',french:'combien',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:341,tunisian:'B\'qadech ?',french:'Combien ça coûte ?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:342,tunisian:'Kifeh',french:'Comment',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:343,tunisian:'Chnowa esmek ?',french:'comment tu t\'appelles?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:344,tunisian:'Qaddech el waqt ?',french:'il est quelle heure ?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:345,tunisian:'Nemchiw nbahrou ?',french:'On va nager à la mer ?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:346,tunisian:'Wine',french:'Où',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:347,tunisian:'Wine E\'Chatt? / Wine L\'Bhar ?',french:'Où est la plage ?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:348,tunisian:'Wine tosken',french:'où habites tu ?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:349,tunisian:'3aleh',french:'Pourquoi',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:350,tunisian:'chbik tékil bchwaya',french:'pourquoi tu manges doucement?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:351,tunisian:'Wa9teh',french:'Quand',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:352,tunisian:'Chnowa tekhdem?',french:'que fais tu dans la vie?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:353,tunisian:'Qadéch Ômrék ?',french:'Quel âge as-tu ?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:354,tunisian:'Chkoune',french:'Qui',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:355,tunisian:'Chkoune jé ?',french:'qui est venu ?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:356,tunisian:'Waqtéch jit ?',french:'Tu es arrivé quand ?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:357,tunisian:'Chtaâmél houni ?',french:'Tu fais quoi ici ?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:358,tunisian:'Win Toskén ?',french:'Tu habites où?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:359,tunisian:'Qaddéch béch toqoôd ?',french:'Tu restes combien de temps?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:360,tunisian:'Hebb nemchou 3la rejlina',french:'tu veux partir à pieds ?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:361,tunisian:'Chrebb',french:'tu veux quoi?',cat1:'Expressions',cat2:'Questions Utiles'},
  {id:362,tunisian:'3ayla',french:'famille',cat1:'Famille',cat2:'Famille'},
  {id:363,tunisian:'Mart/marti',french:'femme / ma femme',cat1:'Famille',cat2:'Famille'},
  {id:364,tunisian:'bnaya',french:'fille',cat1:'Famille',cat2:'Famille'},
  {id:365,tunisian:'wild',french:'fils',cat1:'Famille',cat2:'Famille'},
  {id:366,tunisian:'Omm ommi / nanna',french:'grand mere maternelle',cat1:'Famille',cat2:'Famille'},
  {id:367,tunisian:'Omm baba',french:'grand mere paternelle',cat1:'Famille',cat2:'Famille'},
  {id:368,tunisian:'wléd',french:'les garçons',cat1:'Famille',cat2:'Famille'},
  {id:369,tunisian:'Benti',french:'ma fille',cat1:'Famille',cat2:'Famille'},
  {id:370,tunisian:'Okhti',french:'ma sœur',cat1:'Famille',cat2:'Famille'},
  {id:371,tunisian:'Khalti',french:'ma tante',cat1:'Famille',cat2:'Famille'},
  {id:372,tunisian:'Ena',french:'moi',cat1:'Famille',cat2:'Famille'},
  {id:373,tunisian:'Weldi',french:'mon fils',cat1:'Famille',cat2:'Famille'},
  {id:374,tunisian:'Khouya / 5ouya',french:'mon frère',cat1:'Famille',cat2:'Famille'},
  {id:375,tunisian:'rajli',french:'mon mari',cat1:'Famille',cat2:'Famille'},
  {id:376,tunisian:'Khali',french:'mon oncle',cat1:'Famille',cat2:'Famille'},
  {id:377,tunisian:'Ta/tata',french:'tata (politesse)',cat1:'Famille',cat2:'Famille'},
  {id:378,tunisian:'Rajel/rajli',french:'un homme / mon mari',cat1:'Famille',cat2:'Famille'},
  {id:379,tunisian:'machéya',french:'allée',cat1:'Lieux',cat2:'Lieux'},
  {id:380,tunisian:'banka',french:'banque',cat1:'Lieux',cat2:'Lieux'},
  {id:381,tunisian:'Banka',french:'Banque',cat1:'Lieux',cat2:'Lieux'},
  {id:382,tunisian:'Qassab',french:'Boucherie',cat1:'Lieux',cat2:'Lieux'},
  {id:383,tunisian:'Khabbaz',french:'Boulangerie',cat1:'Lieux',cat2:'Lieux'},
  {id:384,tunisian:'Qahwa',french:'Café',cat1:'Lieux',cat2:'Lieux'},
  {id:385,tunisian:'Hallaq',french:'Coiffeur',cat1:'Lieux',cat2:'Lieux'},
  {id:386,tunisian:'Markaza el bolis',french:'Commissariat',cat1:'Lieux',cat2:'Lieux'},
  {id:387,tunisian:'sa7ra',french:'désert',cat1:'Lieux',cat2:'Lieux'},
  {id:388,tunisian:'Madrasa',french:'Ecole',cat1:'Lieux',cat2:'Lieux'},
  {id:389,tunisian:'Makteb',french:'école',cat1:'Lieux',cat2:'Lieux'},
  {id:390,tunisian:'Fransa',french:'France',cat1:'Lieux',cat2:'Lieux'},
  {id:391,tunisian:'Sbitar',french:'Hopital',cat1:'Lieux',cat2:'Lieux'},
  {id:392,tunisian:'eddar',french:'la maison',cat1:'Lieux',cat2:'Lieux'},
  {id:393,tunisian:'el b\'har',french:'la plage',cat1:'Lieux',cat2:'Lieux'},
  {id:394,tunisian:'el jnina',french:'le jardin',cat1:'Lieux',cat2:'Lieux'},
  {id:395,tunisian:'errawdha',french:'le jardin d\'enfants',cat1:'Lieux',cat2:'Lieux'},
  {id:396,tunisian:'el markéz',french:'le poste de police',cat1:'Lieux',cat2:'Lieux'},
  {id:397,tunisian:'el khédma',french:'le travail',cat1:'Lieux',cat2:'Lieux'},
  {id:398,tunisian:'el maktéb',french:'l\'école',cat1:'Lieux',cat2:'Lieux'},
  {id:399,tunisian:'el âttar',french:'l\'épicier',cat1:'Lieux',cat2:'Lieux'},
  {id:400,tunisian:'Baladiya',french:'Mairie',cat1:'Lieux',cat2:'Lieux'},
  {id:401,tunisian:'b7ar',french:'mer',cat1:'Lieux',cat2:'Lieux'},
  {id:402,tunisian:'Jbel',french:'montagne',cat1:'Lieux',cat2:'Lieux'},
  {id:403,tunisian:'Jéma3',french:'mosquée',cat1:'Lieux',cat2:'Lieux'},
  {id:404,tunisian:'pharmacie',french:'pharmacie',cat1:'Lieux',cat2:'Lieux'},
  {id:405,tunisian:'B7ar',french:'plage',cat1:'Lieux',cat2:'Lieux'},
  {id:406,tunisian:'Houti',french:'Poissonnerie',cat1:'Lieux',cat2:'Lieux'},
  {id:407,tunisian:'Bosta',french:'Poste',cat1:'Lieux',cat2:'Lieux'},
  {id:408,tunisian:'restaurant',french:'restaurant',cat1:'Lieux',cat2:'Lieux'},
  {id:409,tunisian:'3arbi',french:'arabe',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:410,tunisian:'mezyene (a)',french:'beau/belle',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:411,tunisian:'Béhi / Béhia',french:'bien / beau',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:412,tunisian:'Bnine / Bnina',french:'bon (goût)',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:413,tunisian:'Ghali / Ghalia',french:'cher',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:414,tunisian:'9ssir / 9ssira',french:'court / petit de taile',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:415,tunisian:'Ney / Neya',french:'cru',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:416,tunisian:'Tayeb / Tayba',french:'cuit',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:417,tunisian:'S3ib',french:'difficile',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:418,tunisian:'Fédlek / Fédleka',french:'drôle',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:419,tunisian:'Séhel',french:'facile',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:420,tunisian:'Dh3if / Dh3ifa',french:'faible',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:421,tunisian:'9wi / 9wia',french:'fort',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:422,tunisian:'Kbir / kbira',french:'grand',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:423,tunisian:'B3id / b3ida',french:'loin',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:424,tunisian:'Twil / twila',french:'long / grand de taille',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:425,tunisian:'mridh',french:'malade',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:426,tunisian:'5ayeb / 5ayeba',french:'mauvais / moche',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:427,tunisian:'Mahloul',french:'ouvert',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:428,tunisian:'Khayba',french:'pas bon',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:429,tunisian:'R5iss / R5issa',french:'pas cher',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:430,tunisian:'Masset  Massta',french:'pas drôle',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:431,tunisian:'Sghir / sghira',french:'petit',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:432,tunisian:'9rib / 9riba',french:'proche',cat1:'Mots Utiles',cat2:'Adjectifs'},
  {id:433,tunisian:'Mba3ed',french:'après',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:434,tunisian:'m3a+complément',french:'avec + complément',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:435,tunisian:'Barcha',french:'beaucoup',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:436,tunisian:'Bil gdé',french:'Bien',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:437,tunisian:'kif',french:'comme',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:438,tunisian:'Bissif',french:'de force',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:439,tunisian:'Yé5i',french:'donc/après',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:440,tunisian:'bichwaya',french:'doucement',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:441,tunisian:'Mazzel',french:'encore/pas encore',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:442,tunisian:'3ala 5ater',french:'grâce à/à cause de',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:443,tunisian:'3omr (i/ek/ou/na/kon/hom)',french:'jamais',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:444,tunisian:'7atta',french:'jusqu\'à',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:445,tunisian:'houni/hné',french:'là/ici',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:446,tunisian:'Tawa',french:'maintenant',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:447,tunisian:'5ir',french:'mieux',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:448,tunisian:'5ir min',french:'mieux que',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:449,tunisian:'a9al',french:'moins',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:450,tunisian:'Lé',french:'Non',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:451,tunisian:'Eyh',french:'Oui',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:452,tunisian:'sa3at',french:'parfois/des fois',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:453,tunisian:'chwaya',french:'peu',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:454,tunisian:'9lil',french:'peu',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:455,tunisian:'Akther',french:'plus',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:456,tunisian:'blech',french:'sans',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:457,tunisian:'Bil 7a9',french:'sérieusement/c\'est vrai',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:458,tunisian:'2idha',french:'si',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:459,tunisian:'Kène…taw',french:'Si…..alors',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:460,tunisian:'Ma5er',french:'tard',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:461,tunisian:'bekri (bek+ri)',french:'tôt',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:462,tunisian:'Dima / Kol dima',french:'toujours',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:463,tunisian:'El koll',french:'tout',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:464,tunisian:'Kol chay/el kol',french:'tout',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:465,tunisian:'barcha',french:'trop',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:466,tunisian:'Fou9 ellezem',french:'Trop (excès)',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:467,tunisian:'chwaya',french:'un peu',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:468,tunisian:'fissa',french:'vite',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:469,tunisian:'Bil 7a9',french:'vraiment',cat1:'Mots Utiles',cat2:'Adverbes'},
  {id:470,tunisian:'ba3d ma',french:'après que',cat1:'Mots Utiles',cat2:'Conjonctions'},
  {id:471,tunisian:'9bal ma',french:'avant que',cat1:'Mots Utiles',cat2:'Conjonctions'},
  {id:472,tunisian:'3la 5ater',french:'car',cat1:'Mots Utiles',cat2:'Conjonctions'},
  {id:473,tunisian:'7atta',french:'jusqu\'à',cat1:'Mots Utiles',cat2:'Conjonctions'},
  {id:474,tunisian:'bech',french:'pour',cat1:'Mots Utiles',cat2:'Conjonctions'},
  {id:475,tunisian:'Mar7bé bik',french:'bienvenue à toi',cat1:'Mots Utiles',cat2:'Politesse'},
  {id:476,tunisian:'Ahla',french:'Bienvenue/Bonjour',cat1:'Mots Utiles',cat2:'Politesse'},
  {id:477,tunisian:'Chna7wélek',french:'comment ça va ?',cat1:'Mots Utiles',cat2:'Politesse'},
  {id:478,tunisian:'Samarni',french:'excuse moi',cat1:'Mots Utiles',cat2:'Politesse'},
  {id:479,tunisian:'Tfadhel',french:'Je te prie d\'entrer',cat1:'Mots Utiles',cat2:'Politesse'},
  {id:480,tunisian:'Y3aychek',french:'Merci',cat1:'Mots Utiles',cat2:'Politesse'},
  {id:481,tunisian:'Si/Sidi',french:'Mr (politesse)',cat1:'Mots Utiles',cat2:'Politesse'},
  {id:482,tunisian:'amane',french:'s\'il te plait',cat1:'Mots Utiles',cat2:'Politesse'},
  {id:483,tunisian:'brabi',french:'s\'il te plait',cat1:'Mots Utiles',cat2:'Politesse'},
  {id:484,tunisian:'chri',french:'acheter',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:485,tunisian:'Hébb',french:'Aime',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:486,tunisian:'Mché',french:'aller',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:487,tunisian:'jib',french:'apporter',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:488,tunisian:'ji',french:'arriver',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:489,tunisian:'3and',french:'avoir',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:490,tunisian:'Jri',french:'courir',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:491,tunisian:'Néssrof',french:'dépenser',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:492,tunisian:'3ti',french:'donner',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:493,tunisian:'Orqod',french:'Dors',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:494,tunisian:'Esma',french:'Ecoute',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:495,tunisian:'Ktib',french:'écrire',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:496,tunisian:'tâamel',french:'faire',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:497,tunisian:'9dh',french:'faire les courses',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:498,tunisian:'Dhrab',french:'frapper',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:499,tunisian:'hokk',french:'frotter',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:500,tunisian:'Alâab',french:'Joue',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:501,tunisian:'Prends',french:'Khoudh',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:502,tunisian:'ghassel',french:'Laver',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:503,tunisian:'9ra',french:'lire/étudier',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:504,tunisian:'kel',french:'manger',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:505,tunisian:'Kdheb',french:'mentir',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:506,tunisian:'nadhef',french:'Nettoyer',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:507,tunisian:'7ell',french:'ouvrir',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:508,tunisian:'tkalam',french:'parler/téléphoner',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:509,tunisian:'mchi',french:'partir/marcher/aller',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:510,tunisian:'5aless',french:'payer',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:511,tunisian:'Ebki',french:'Pleure',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:512,tunisian:'hezz',french:'porter/apporter/emmener',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:513,tunisian:'khedh/5edhed',french:'prendre',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:514,tunisian:'Horze',french:'regarde',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:515,tunisian:'9a3ad',french:'s\'asseoir',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:516,tunisian:'Naguézz',french:'Saute',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:517,tunisian:'dawach',french:'se doucher',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:518,tunisian:'zreb',french:'se presser',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:519,tunisian:'rte7',french:'se reposer',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:520,tunisian:'sket',french:'se taire',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:521,tunisian:'skot',french:'se taire',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:522,tunisian:'chedd',french:'tenir',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:523,tunisian:'dor/dour',french:'tourner',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:524,tunisian:'5dem',french:'travailler',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:525,tunisian:'7ebb',french:'vouloir',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:526,tunisian:'sefer',french:'voyager',cat1:'Mots Utiles',cat2:'Verbes'},
  {id:527,tunisian:'9attous',french:'chat',cat1:'Nature',cat2:'Animaux'},
  {id:528,tunisian:'Hsan',french:'cheval',cat1:'Nature',cat2:'Animaux'},
  {id:529,tunisian:'Kalb',french:'chien',cat1:'Nature',cat2:'Animaux'},
  {id:530,tunisian:'Namla',french:'fourmi',cat1:'Nature',cat2:'Animaux'},
  {id:531,tunisian:'Debbena',french:'mouche',cat1:'Nature',cat2:'Animaux'},
  {id:532,tunisian:'3alouch',french:'mouton',cat1:'Nature',cat2:'Animaux'},
  {id:533,tunisian:'3Asfour',french:'oiseau',cat1:'Nature',cat2:'Animaux'},
  {id:534,tunisian:'7out',french:'poisson',cat1:'Nature',cat2:'Animaux'},
  {id:535,tunisian:'Djej',french:'poulet',cat1:'Nature',cat2:'Animaux'},
  {id:536,tunisian:'Bagra',french:'vache',cat1:'Nature',cat2:'Animaux'},
  {id:537,tunisian:'Femm',french:'bouche',cat1:'Nature',cat2:'Corps'},
  {id:538,tunisian:'Dhra',french:'bras',cat1:'Nature',cat2:'Corps'},
  {id:539,tunisian:'Shar',french:'cheveux',cat1:'Nature',cat2:'Corps'},
  {id:540,tunisian:'Sbo3',french:'doigt',cat1:'Nature',cat2:'Corps'},
  {id:541,tunisian:'Tarma',french:'fesses',cat1:'Nature',cat2:'Corps'},
  {id:542,tunisian:'Saq',french:'jambe',cat1:'Nature',cat2:'Corps'},
  {id:543,tunisian:'Yedd',french:'main',cat1:'Nature',cat2:'Corps'},
  {id:544,tunisian:'Kheshm',french:'nez',cat1:'Nature',cat2:'Corps'},
  {id:545,tunisian:'Ain',french:'œil',cat1:'Nature',cat2:'Corps'},
  {id:546,tunisian:'Oudhn',french:'oreille',cat1:'Nature',cat2:'Corps'},
  {id:547,tunisian:'Saq',french:'pied',cat1:'Nature',cat2:'Corps'},
  {id:548,tunisian:'Ras',french:'tête',cat1:'Nature',cat2:'Corps'},
  {id:549,tunisian:'chijra',french:'arbre',cat1:'Nature',cat2:'Nature'},
  {id:550,tunisian:'trab',french:'la terre',cat1:'Nature',cat2:'Nature'},
  {id:551,tunisian:'ward',french:'rose/fleur',cat1:'Nature',cat2:'Nature'},
  {id:552,tunisian:'Fou9',french:'au dessus',cat1:'Temps/Espace',cat2:'Direction / Position'},
  {id:553,tunisian:'Janb',french:'côté',cat1:'Temps/Espace',cat2:'Direction / Position'},
  {id:554,tunisian:'Louta',french:'derrière',cat1:'Temps/Espace',cat2:'Direction / Position'},
  {id:555,tunisian:'9odem',french:'devant',cat1:'Temps/Espace',cat2:'Direction / Position'},
  {id:556,tunisian:'Yemin',french:'droite',cat1:'Temps/Espace',cat2:'Direction / Position'},
  {id:557,tunisian:'Ta7t',french:'en dessous',cat1:'Temps/Espace',cat2:'Direction / Position'},
  {id:558,tunisian:'Ysaar',french:'gauche',cat1:'Temps/Espace',cat2:'Direction / Position'},
  {id:559,tunisian:'Hna',french:'ici',cat1:'Temps/Espace',cat2:'Direction / Position'},
  {id:560,tunisian:'Ghadi',french:'là bas',cat1:'Temps/Espace',cat2:'Direction / Position'},
  {id:561,tunisian:'Wost',french:'milieu',cat1:'Temps/Espace',cat2:'Direction / Position'},
  {id:562,tunisian:'a7ad',french:'dimanche',cat1:'Temps/Espace',cat2:'Jours de la semaine'},
  {id:563,tunisian:'khamis',french:'jeudi',cat1:'Temps/Espace',cat2:'Jours de la semaine'},
  {id:564,tunisian:'thnin',french:'lundi',cat1:'Temps/Espace',cat2:'Jours de la semaine'},
  {id:565,tunisian:'thalatha',french:'mardi',cat1:'Temps/Espace',cat2:'Jours de la semaine'},
  {id:566,tunisian:'erbeha',french:'mercredi',cat1:'Temps/Espace',cat2:'Jours de la semaine'},
  {id:567,tunisian:'sebt',french:'samedi',cat1:'Temps/Espace',cat2:'Jours de la semaine'},
  {id:568,tunisian:'jom3a',french:'vendredi',cat1:'Temps/Espace',cat2:'Jours de la semaine'},
  {id:569,tunisian:'3amine',french:'2 ans',cat1:'Temps/Espace',cat2:'Temps'},
  {id:570,tunisian:'taqrib',french:'à peu près',cat1:'Temps/Espace',cat2:'Temps'},
  {id:571,tunisian:'Taw',french:'Alors…',cat1:'Temps/Espace',cat2:'Temps'},
  {id:572,tunisian:'Mbâad',french:'après',cat1:'Temps/Espace',cat2:'Temps'},
  {id:573,tunisian:'Mbâad Ghodwa',french:'Après demain',cat1:'Temps/Espace',cat2:'Temps'},
  {id:574,tunisian:'Qbal',french:'avant',cat1:'Temps/Espace',cat2:'Temps'},
  {id:575,tunisian:'Wet lbéra7',french:'avant-hier',cat1:'Temps/Espace',cat2:'Temps'},
  {id:576,tunisian:'Lyoum essbéh',french:'ce matin',cat1:'Temps/Espace',cat2:'Temps'},
  {id:577,tunisian:'el lila',french:'ce soir',cat1:'Temps/Espace',cat2:'Temps'},
  {id:578,tunisian:'Séâa okhra',french:'dans 1 heure',cat1:'Temps/Espace',cat2:'Temps'},
  {id:579,tunisian:'Fel âchéya',french:'Dans l\'après midi',cat1:'Temps/Espace',cat2:'Temps'},
  {id:580,tunisian:'rodwa (ghodwa)',french:'demain',cat1:'Temps/Espace',cat2:'Temps'},
  {id:581,tunisian:'ltéli',french:'en arrière',cat1:'Temps/Espace',cat2:'Temps'},
  {id:582,tunisian:'Yé5i',french:'ensuite/alors',cat1:'Temps/Espace',cat2:'Temps'},
  {id:583,tunisian:'Lbérah',french:'Hier',cat1:'Temps/Espace',cat2:'Temps'},
  {id:584,tunisian:'3amine ltéli',french:'il y a 2 ans',cat1:'Temps/Espace',cat2:'Temps'},
  {id:585,tunisian:'nhar',french:'jour',cat1:'Temps/Espace',cat2:'Temps'},
  {id:586,tunisian:'3am',french:'l\'an',cat1:'Temps/Espace',cat2:'Temps'},
  {id:587,tunisian:'3am néwil',french:'l\'an dernier',cat1:'Temps/Espace',cat2:'Temps'},
  {id:588,tunisian:'Tawa',french:'maintenant',cat1:'Temps/Espace',cat2:'Temps'},
  {id:589,tunisian:'Ech-har',french:'mois',cat1:'Temps/Espace',cat2:'Temps'},
  {id:590,tunisian:'Ejjom3a',french:'semaine',cat1:'Temps/Espace',cat2:'Temps'},
  {id:591,tunisian:'Sahriya',french:'soirée',cat1:'Temps/Espace',cat2:'Temps'},
  {id:592,tunisian:'yezzi',french:'stop!',cat1:'Temps/Espace',cat2:'Temps'},
  {id:593,tunisian:'Makher',french:'tard',cat1:'Temps/Espace',cat2:'Temps'},
  {id:594,tunisian:'Békri',french:'tôt',cat1:'Temps/Espace',cat2:'Temps'},
  {id:595,tunisian:'Mbâad chwaya',french:'tout à l\'heure',cat1:'Temps/Espace',cat2:'Temps'},
  {id:596,tunisian:'tayara',french:'avion',cat1:'Transport',cat2:'Transport'},
  {id:597,tunisian:'moutour',french:'moto',cat1:'Transport',cat2:'Transport'},
  {id:598,tunisian:'Karhba',french:'voiture',cat1:'Transport',cat2:'Transport'},
  {id:599,tunisian:'5zéna',french:'armoire',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:600,tunisian:'sahn',french:'assiette',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:601,tunisian:'Banou',french:'baignoire',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:602,tunisian:'Banq',french:'canapé',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:603,tunisian:'Korsi',french:'chaise',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:604,tunisian:'Bit ennoum',french:'chambre',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:605,tunisian:'M5abba',french:'coussin',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:606,tunisian:'Coujina',french:'cuisine',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:607,tunisian:'Escaliers',french:'drouj',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:608,tunisian:'jnina',french:'jardin',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:609,tunisian:'Bit',french:'la pièce',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:610,tunisian:'Farch',french:'lit',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:611,tunisian:'Dar',french:'maison',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:612,tunisian:'parasol',french:'parasol',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:613,tunisian:'Beb',french:'porte',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:614,tunisian:'zebla',french:'poubelle',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:615,tunisian:'Sabbéla',french:'robinet',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:616,tunisian:'Bit el ftour',french:'salle à manger',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:617,tunisian:'Bit el banou',french:'salle de bain',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:618,tunisian:'Bit el 93ad',french:'salle tv',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:619,tunisian:'Bit essala',french:'salon',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:620,tunisian:'Tawla',french:'table',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:621,tunisian:'Zarbiya',french:'tapis',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:622,tunisian:'Talvza',french:'télé',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:623,tunisian:'Toilette',french:'toilettes',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:624,tunisian:'kess',french:'verre',cat1:'Vie Quotidienne',cat2:'Maison'},
  {id:625,tunisian:'Kiféch nemchi l aqreb sbitar ?',french:'Comment aller à l\'hôpital le plus proche ?',cat1:'Vie Quotidienne',cat2:'Un problème en Tunisie'},
  {id:626,tunisian:'Lézemni nchouf tbib',french:'Il faut que je vois un medecin',cat1:'Vie Quotidienne',cat2:'Un problème en Tunisie'},
  {id:627,tunisian:'Téjraht, bélléhi âawénni ?',french:'Je me suis blessé, pouvez-vous m\'aider?',cat1:'Vie Quotidienne',cat2:'Un problème en Tunisie'},
  {id:628,tunisian:'Mafhémtéch, tnajjém tâawéd béchwayya ?',french:'Je ne comprends pas, pouvez vous répéter plus lentement?',cat1:'Vie Quotidienne',cat2:'Un problème en Tunisie'},
  {id:629,tunisian:'Dhoôt, tnajjém tâawenni ?',french:'Je suis perdu, pouvez vous m\'aider?',cat1:'Vie Quotidienne',cat2:'Un problème en Tunisie'},
  {id:630,tunisian:'Sayyabni!',french:'Lâche moi!',cat1:'Vie Quotidienne',cat2:'Un problème en Tunisie'},
  {id:631,tunisian:'Khallini rayédh',french:'Laisse moi tranquille',cat1:'Vie Quotidienne',cat2:'Un problème en Tunisie'},
  {id:632,tunisian:'Sérqouni, ennajém netsaâmél telifounék?',french:'On m\'a volé, puis-je utiliser votre téléphone ?',cat1:'Vie Quotidienne',cat2:'Un problème en Tunisie'},
  {id:633,tunisian:'Tnajjeém tawenni ?',french:'Tu peux m\'aider ?',cat1:'Vie Quotidienne',cat2:'Un problème en Tunisie'},
  {id:634,tunisian:'Tnajjeém tkallém el hakém bélléhi ?',french:'Vos pouvez appeler la police svp ?',cat1:'Vie Quotidienne',cat2:'Un problème en Tunisie'},
  {id:635,tunisian:'Sbédri',french:'baskets',cat1:'Vie Quotidienne',cat2:'Vêtements'},
  {id:636,tunisian:'9lasset',french:'chaussettes',cat1:'Vie Quotidienne',cat2:'Vêtements'},
  {id:637,tunisian:'Sabbat',french:'chaussures',cat1:'Vie Quotidienne',cat2:'Vêtements'},
  {id:638,tunisian:'Souriya',french:'chemise',cat1:'Vie Quotidienne',cat2:'Vêtements'},
  {id:639,tunisian:'Jebba',french:'Djelaba',cat1:'Vie Quotidienne',cat2:'Vêtements'},
  {id:640,tunisian:'Kabboutt',french:'Manteau',cat1:'Vie Quotidienne',cat2:'Vêtements'},
  {id:641,tunisian:'Sirwel',french:'pantalon',cat1:'Vie Quotidienne',cat2:'Vêtements'},
  {id:642,tunisian:'Marioul',french:'Pull',cat1:'Vie Quotidienne',cat2:'Vêtements'},
  {id:643,tunisian:'Rouba',french:'Robe',cat1:'Vie Quotidienne',cat2:'Vêtements'},
  {id:644,tunisian:'dorji7a',french:'balançoire',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:645,tunisian:'Koura',french:'ballon',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:646,tunisian:'zazzar',french:'boucherie/boucher',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:647,tunisian:'korrassa',french:'cahier',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:648,tunisian:'cartaba',french:'cartable',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:649,tunisian:'M9ass',french:'ciseaux',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:650,tunisian:'Mféta7',french:'clés',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:651,tunisian:'counji',french:'congé',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:652,tunisian:'9lam/2a9lem',french:'crayon',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:653,tunisian:'3attar',french:'épicerie/épicier',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:654,tunisian:'War9a/2awre9',french:'feuille',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:655,tunisian:'dhif',french:'invité',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:656,tunisian:'kilou',french:'kilo',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:657,tunisian:'ness',french:'les gens',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:658,tunisian:'kteb',french:'livre',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:659,tunisian:'Monguéla',french:'montre',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:660,tunisian:'Nemchiw nôoumou ?',french:'On va nager',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:661,tunisian:'stouch',french:'portefeuille',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:662,tunisian:'5adhar',french:'primeur',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:663,tunisian:'rmal',french:'sable',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:664,tunisian:'stylou',french:'stylo',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:665,tunisian:'kochk',french:'tabac',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:666,tunisian:'Stouch',french:'trousse',cat1:'Vie Quotidienne',cat2:'Vie courante'},
  {id:667,tunisian:'Rih',french:'vent',cat1:'Vie Quotidienne',cat2:'Vie courante'}
];

const ALL_IMAGE_QUIZ = [
  {emoji:"🐱",word:"قطة",options:[{ar:"قطة",ph:"9atta",fr:"chat"},{ar:"كلب",ph:"kalb",fr:"chien"},{ar:"حمار",ph:"7mar",fr:"âne"},{ar:"عصفور",ph:"3sfour",fr:"oiseau"}],correct:0},
  {emoji:"🐕",word:"كلب",options:[{ar:"قطة",ph:"9atta",fr:"chat"},{ar:"كلب",ph:"kalb",fr:"chien"},{ar:"أرنب",ph:"arnab",fr:"lapin"},{ar:"دجاجة",ph:"djaja",fr:"poule"}],correct:1},
  {emoji:"🏠",word:"دار",options:[{ar:"مسجد",ph:"jame3",fr:"mosquée"},{ar:"دار",ph:"eddor",fr:"maison"},{ar:"سوق",ph:"souk",fr:"marché"},{ar:"مدرسة",ph:"mdressa",fr:"école"}],correct:1},
  {emoji:"🌊",word:"بحر",options:[{ar:"جبل",ph:"jbel",fr:"montagne"},{ar:"صحراء",ph:"sa7ra",fr:"désert"},{ar:"بحر",ph:"el bhar",fr:"mer"},{ar:"حديقة",ph:"7di9a",fr:"jardin"}],correct:2},
  {emoji:"🍞",word:"خبز",options:[{ar:"لحم",ph:"lahm",fr:"viande"},{ar:"بيضة",ph:"beidha",fr:"œuf"},{ar:"خبز",ph:"kesra",fr:"pain"},{ar:"حليب",ph:"hlib",fr:"lait"}],correct:2},
  {emoji:"☕",word:"قهوة",options:[{ar:"قهوة",ph:"kahwa",fr:"café"},{ar:"شاي",ph:"atay",fr:"thé"},{ar:"عصير",ph:"3asir",fr:"jus"},{ar:"ماء",ph:"may",fr:"eau"}],correct:0},
  {emoji:"💧",word:"ماء",options:[{ar:"عصير",ph:"3asir",fr:"jus"},{ar:"حليب",ph:"hlib",fr:"lait"},{ar:"ماء",ph:"may",fr:"eau"},{ar:"قهوة",ph:"kahwa",fr:"café"}],correct:2},
  {emoji:"🚗",word:"كرهبة",options:[{ar:"طيارة",ph:"tiyara",fr:"avion"},{ar:"قطار",ph:"treno",fr:"train"},{ar:"كرهبة",ph:"tomobil",fr:"voiture"},{ar:"موتور",ph:"moteur",fr:"moto"}],correct:2},
  {emoji:"✈️",word:"طيارة",options:[{ar:"طيارة",ph:"tiyara",fr:"avion"},{ar:"قطار",ph:"treno",fr:"train"},{ar:"باص",ph:"7afla",fr:"bus"},{ar:"سيارة",ph:"tomobil",fr:"voiture"}],correct:0},
  {emoji:"🏥",word:"مستشفى",options:[{ar:"مدرسة",ph:"mdressa",fr:"école"},{ar:"مستشفى",ph:"mostachfa",fr:"hôpital"},{ar:"جامع",ph:"jame3",fr:"mosquée"},{ar:"سوق",ph:"souk",fr:"marché"}],correct:1},
  {emoji:"👁️",word:"عيون",options:[{ar:"أذن",ph:"wedhne",fr:"oreille"},{ar:"عيون",ph:"3ioune",fr:"yeux"},{ar:"نيف",ph:"nif",fr:"nez"},{ar:"فم",ph:"fomm",fr:"bouche"}],correct:1},
  {emoji:"👂",word:"وذنة",options:[{ar:"وذنة",ph:"wedhne",fr:"oreille"},{ar:"نيف",ph:"nif",fr:"nez"},{ar:"فم",ph:"fomm",fr:"bouche"},{ar:"أسنان",ph:"snap",fr:"dents"}],correct:0},
  {emoji:"👅",word:"فم",options:[{ar:"نيف",ph:"nif",fr:"nez"},{ar:"أسنان",ph:"snap",fr:"dents"},{ar:"عيون",ph:"3ioune",fr:"yeux"},{ar:"فم",ph:"fomm",fr:"bouche"}],correct:3},
  {emoji:"🐑",word:"غنمي",options:[{ar:"بقرة",ph:"baqra",fr:"vache"},{ar:"حصان",ph:"7san",fr:"cheval"},{ar:"غنمي",ph:"ghanmi",fr:"mouton"},{ar:"حمار",ph:"7mar",fr:"âne"}],correct:2},
  {emoji:"🐄",word:"بقرة",options:[{ar:"بقرة",ph:"baqra",fr:"vache"},{ar:"حصان",ph:"7san",fr:"cheval"},{ar:"كلب",ph:"kalb",fr:"chien"},{ar:"قطة",ph:"9atta",fr:"chat"}],correct:0},
  {emoji:"🐴",word:"حصان",options:[{ar:"حمار",ph:"7mar",fr:"âne"},{ar:"غنمي",ph:"ghanmi",fr:"mouton"},{ar:"بقرة",ph:"baqra",fr:"vache"},{ar:"حصان",ph:"7san",fr:"cheval"}],correct:3},
  {emoji:"🐓",word:"دجاجة",options:[{ar:"دجاجة",ph:"djaja",fr:"poule"},{ar:"أرنب",ph:"arnab",fr:"lapin"},{ar:"قطة",ph:"9atta",fr:"chat"},{ar:"كلب",ph:"kalb",fr:"chien"}],correct:0},
  {emoji:"🐇",word:"أرنب",options:[{ar:"قطة",ph:"9atta",fr:"chat"},{ar:"أرنب",ph:"arnab",fr:"lapin"},{ar:"كلب",ph:"kalb",fr:"chien"},{ar:"طير",ph:"3sfour",fr:"oiseau"}],correct:1},
  {emoji:"🦁",word:"سبع",options:[{ar:"ذيب",ph:"dhib",fr:"loup"},{ar:"فيل",ph:"fil",fr:"éléphant"},{ar:"سبع",ph:"siba3",fr:"lion"},{ar:"حصان",ph:"7san",fr:"cheval"}],correct:2},
  {emoji:"🐘",word:"فيل",options:[{ar:"سبع",ph:"siba3",fr:"lion"},{ar:"ذيب",ph:"dhib",fr:"loup"},{ar:"فيل",ph:"fil",fr:"éléphant"},{ar:"غنمي",ph:"ghanmi",fr:"mouton"}],correct:2},
  {emoji:"🍳",word:"بيضة",options:[{ar:"بطاطا",ph:"batata",fr:"pomme de terre"},{ar:"بيضة",ph:"beidha",fr:"œuf"},{ar:"لحم",ph:"lahm",fr:"viande"},{ar:"خبز",ph:"kesra",fr:"pain"}],correct:1},
  {emoji:"🥔",word:"بطاطا",options:[{ar:"بطاطا",ph:"batata",fr:"pomme de terre"},{ar:"فلفل",ph:"felfel",fr:"piment"},{ar:"ثوم",ph:"toum",fr:"ail"},{ar:"لحم",ph:"lahm",fr:"viande"}],correct:0},
  {emoji:"🫙",word:"هريسة",options:[{ar:"خبز",ph:"kesra",fr:"pain"},{ar:"زيت",ph:"zit",fr:"huile"},{ar:"هريسة",ph:"harissa",fr:"harissa"},{ar:"ثوم",ph:"toum",fr:"ail"}],correct:2},
  {emoji:"🧄",word:"ثوم",options:[{ar:"فلفل",ph:"felfel",fr:"piment"},{ar:"ثوم",ph:"toum",fr:"ail"},{ar:"بطاطا",ph:"batata",fr:"pomme de terre"},{ar:"لحم",ph:"lahm",fr:"viande"}],correct:1},
  {emoji:"🍖",word:"لحم",options:[{ar:"سمك",ph:"7out",fr:"poisson"},{ar:"لحم",ph:"lahm",fr:"viande"},{ar:"بيضة",ph:"beidha",fr:"œuf"},{ar:"خبز",ph:"kesra",fr:"pain"}],correct:1},
  {emoji:"🍜",word:"مكرونة",options:[{ar:"شوربة",ph:"chorba",fr:"soupe"},{ar:"مكرونة",ph:"makrouna",fr:"pâtes"},{ar:"كسكسي",ph:"couscous",fr:"couscous"},{ar:"لحم",ph:"lahm",fr:"viande"}],correct:1},
  {emoji:"🥣",word:"شوربة",options:[{ar:"شوربة",ph:"chorba",fr:"soupe"},{ar:"بريك",ph:"brick",fr:"brik"},{ar:"لبلابي",ph:"lablabi",fr:"lablabi"},{ar:"كسكسي",ph:"couscous",fr:"couscous"}],correct:0},
  {emoji:"🫖",word:"أتاي",options:[{ar:"قهوة",ph:"kahwa",fr:"café"},{ar:"حليب",ph:"hlib",fr:"lait"},{ar:"أتاي",ph:"atay",fr:"thé"},{ar:"عصير",ph:"3asir",fr:"jus"}],correct:2},
  {emoji:"🍦",word:"بوزة",options:[{ar:"بوزة",ph:"bouza",fr:"glace"},{ar:"حلوى",ph:"7alwa",fr:"gâteau"},{ar:"كعك",ph:"ka3k",fr:"biscuit"},{ar:"تمر",ph:"tmer",fr:"dattes"}],correct:0},
  {emoji:"🎂",word:"بكلاوة",options:[{ar:"تمر",ph:"tmer",fr:"dattes"},{ar:"بوزة",ph:"bouza",fr:"glace"},{ar:"بكلاوة",ph:"baklawa",fr:"baklava"},{ar:"حلوى",ph:"7alwa",fr:"gâteau"}],correct:2},
  {emoji:"🚌",word:"حافلة",options:[{ar:"طيارة",ph:"tiyara",fr:"avion"},{ar:"حافلة",ph:"7afla",fr:"bus"},{ar:"قطار",ph:"treno",fr:"train"},{ar:"تاكسي",ph:"taxi",fr:"taxi"}],correct:1},
  {emoji:"🚂",word:"ترينو",options:[{ar:"طيارة",ph:"tiyara",fr:"avion"},{ar:"موتور",ph:"moteur",fr:"moto"},{ar:"ترينو",ph:"treno",fr:"train"},{ar:"تاكسي",ph:"taxi",fr:"taxi"}],correct:2},
  {emoji:"🏪",word:"حانوت",options:[{ar:"سوق",ph:"souk",fr:"marché"},{ar:"حانوت",ph:"7anout",fr:"épicerie"},{ar:"بنك",ph:"banka",fr:"banque"},{ar:"مطعم",ph:"mat3am",fr:"restaurant"}],correct:1},
  {emoji:"🕌",word:"جامع",options:[{ar:"جامع",ph:"jame3",fr:"mosquée"},{ar:"مدرسة",ph:"mdressa",fr:"école"},{ar:"مستشفى",ph:"mostachfa",fr:"hôpital"},{ar:"بنك",ph:"banka",fr:"banque"}],correct:0},
  {emoji:"🍽️",word:"مطعم",options:[{ar:"مطعم",ph:"mat3am",fr:"restaurant"},{ar:"سوق",ph:"souk",fr:"marché"},{ar:"بنك",ph:"banka",fr:"banque"},{ar:"جامعة",ph:"jami3a",fr:"université"}],correct:0},
  {emoji:"🏫",word:"مدرسة",options:[{ar:"جامعة",ph:"jami3a",fr:"université"},{ar:"مستشفى",ph:"mostachfa",fr:"hôpital"},{ar:"مدرسة",ph:"mdressa",fr:"école"},{ar:"بنك",ph:"banka",fr:"banque"}],correct:2},
  {emoji:"🏦",word:"بنك",options:[{ar:"بنك",ph:"banka",fr:"banque"},{ar:"سينما",ph:"sinima",fr:"cinéma"},{ar:"مدرسة",ph:"mdressa",fr:"école"},{ar:"مستشفى",ph:"mostachfa",fr:"hôpital"}],correct:0},
  {emoji:"🎬",word:"سينما",options:[{ar:"مسرح",ph:"masra7",fr:"théâtre"},{ar:"سينما",ph:"sinima",fr:"cinéma"},{ar:"ملعب",ph:"mel3ab",fr:"stade"},{ar:"حديقة",ph:"7di9a",fr:"jardin"}],correct:1},
  {emoji:"👔",word:"قميجة",options:[{ar:"قميجة",ph:"qamija",fr:"chemise"},{ar:"سروال",ph:"sarouel",fr:"pantalon"},{ar:"جبدة",ph:"jebda",fr:"veste"},{ar:"كبوت",ph:"kabout",fr:"manteau"}],correct:0},
  {emoji:"👖",word:"سروال",options:[{ar:"حذاء",ph:"sfiz",fr:"chaussure"},{ar:"قميجة",ph:"qamija",fr:"chemise"},{ar:"سروال",ph:"sarouel",fr:"pantalon"},{ar:"جبدة",ph:"jebda",fr:"veste"}],correct:2},
  {emoji:"👟",word:"صفيز",options:[{ar:"صفيز",ph:"sfiz",fr:"chaussure"},{ar:"شراب",ph:"shraab",fr:"chaussette"},{ar:"سروال",ph:"sarouel",fr:"pantalon"},{ar:"قميجة",ph:"qamija",fr:"chemise"}],correct:0},
  {emoji:"🧤",word:"جبدة",options:[{ar:"كبوت",ph:"kabout",fr:"manteau"},{ar:"جبدة",ph:"jebda",fr:"veste"},{ar:"قميجة",ph:"qamija",fr:"chemise"},{ar:"سروال",ph:"sarouel",fr:"pantalon"}],correct:1},
  {emoji:"🧣",word:"كبوت",options:[{ar:"كبوت",ph:"kabout",fr:"manteau"},{ar:"جبدة",ph:"jebda",fr:"veste"},{ar:"قبعة",ph:"chéchia",fr:"chapeau"},{ar:"طرحة",ph:"sefseri",fr:"voile"}],correct:0},
  {emoji:"👁️‍🗨️",word:"راس",options:[{ar:"يد",ph:"ida",fr:"main"},{ar:"راس",ph:"rass",fr:"tête"},{ar:"رجل",ph:"rijel",fr:"pied"},{ar:"كتف",ph:"ktef",fr:"épaule"}],correct:1},
  {emoji:"🫀",word:"قلب",options:[{ar:"قلب",ph:"galb",fr:"cœur"},{ar:"كرش",ph:"kersh",fr:"ventre"},{ar:"ظهر",ph:"dher",fr:"dos"},{ar:"ساعد",ph:"sa3ed",fr:"bras"}],correct:0},
  {emoji:"🤲",word:"إيدة",options:[{ar:"رجل",ph:"rijel",fr:"pied"},{ar:"ظهر",ph:"dher",fr:"dos"},{ar:"إيدة",ph:"ida",fr:"main"},{ar:"كتف",ph:"ktef",fr:"épaule"}],correct:2},
  {emoji:"🦷",word:"سناب",options:[{ar:"فم",ph:"fomm",fr:"bouche"},{ar:"سناب",ph:"snap",fr:"dents"},{ar:"نيف",ph:"nif",fr:"nez"},{ar:"عيون",ph:"3ioune",fr:"yeux"}],correct:1},
  {emoji:"👃",word:"نيف",options:[{ar:"نيف",ph:"nif",fr:"nez"},{ar:"فم",ph:"fomm",fr:"bouche"},{ar:"أذن",ph:"wedhne",fr:"oreille"},{ar:"عيون",ph:"3ioune",fr:"yeux"}],correct:0},
  {emoji:"💪",word:"ساعد",options:[{ar:"رجل",ph:"rijel",fr:"pied"},{ar:"ساعد",ph:"sa3ed",fr:"bras"},{ar:"كتف",ph:"ktef",fr:"épaule"},{ar:"ظهر",ph:"dher",fr:"dos"}],correct:1},
  {emoji:"🦶",word:"رجل",options:[{ar:"يد",ph:"ida",fr:"main"},{ar:"كتف",ph:"ktef",fr:"épaule"},{ar:"ساعد",ph:"sa3ed",fr:"bras"},{ar:"رجل",ph:"rijel",fr:"pied"}],correct:3},
  {emoji:"🌙",word:"قمر",options:[{ar:"شمس",ph:"chems",fr:"soleil"},{ar:"قمر",ph:"9mar",fr:"lune"},{ar:"نجمة",ph:"nejma",fr:"étoile"},{ar:"سماء",ph:"sama",fr:"ciel"}],correct:1},
  {emoji:"⭐",word:"نجمة",options:[{ar:"قمر",ph:"9mar",fr:"lune"},{ar:"سحاب",ph:"sa7ab",fr:"nuage"},{ar:"نجمة",ph:"nejma",fr:"étoile"},{ar:"شمس",ph:"chems",fr:"soleil"}],correct:2},
  {emoji:"☀️",word:"شمس",options:[{ar:"شمس",ph:"chems",fr:"soleil"},{ar:"قمر",ph:"9mar",fr:"lune"},{ar:"ريح",ph:"rih",fr:"vent"},{ar:"مطر",ph:"chta",fr:"pluie"}],correct:0},
  {emoji:"⛅",word:"سحاب",options:[{ar:"شمس",ph:"chems",fr:"soleil"},{ar:"سحاب",ph:"sa7ab",fr:"nuage"},{ar:"مطر",ph:"chta",fr:"pluie"},{ar:"ريح",ph:"rih",fr:"vent"}],correct:1},
  {emoji:"🌧️",word:"شتا",options:[{ar:"شتا",ph:"shta",fr:"pluie/hiver"},{ar:"صيف",ph:"sayf",fr:"été"},{ar:"ريح",ph:"rih",fr:"vent"},{ar:"سحاب",ph:"sa7ab",fr:"nuage"}],correct:0},
  {emoji:"🌋",word:"جبل",options:[{ar:"بحر",ph:"bhar",fr:"mer"},{ar:"صحراء",ph:"sa7ra",fr:"désert"},{ar:"جبل",ph:"jbel",fr:"montagne"},{ar:"أرض",ph:"ardh",fr:"terre"}],correct:2},
  {emoji:"🌵",word:"صحراء",options:[{ar:"جبل",ph:"jbel",fr:"montagne"},{ar:"صحراء",ph:"sa7ra",fr:"désert"},{ar:"غابة",ph:"ghaba",fr:"forêt"},{ar:"بحيرة",ph:"bu7ayra",fr:"lac"}],correct:1},
  {emoji:"🌳",word:"شجرة",options:[{ar:"زهرة",ph:"zahra",fr:"fleur"},{ar:"عشب",ph:"3achab",fr:"herbe"},{ar:"شجرة",ph:"chajra",fr:"arbre"},{ar:"جبل",ph:"jbel",fr:"montagne"}],correct:2},
  {emoji:"🌹",word:"وردة",options:[{ar:"وردة",ph:"warda",fr:"rose"},{ar:"ياسمين",ph:"yasmin",fr:"jasmin"},{ar:"شجرة",ph:"chajra",fr:"arbre"},{ar:"زهرة",ph:"zahra",fr:"fleur"}],correct:0},
  {emoji:"🐟",word:"حوت",options:[{ar:"لحم",ph:"lahm",fr:"viande"},{ar:"حوت",ph:"7out",fr:"poisson"},{ar:"دجاجة",ph:"djaja",fr:"poule"},{ar:"بيضة",ph:"beidha",fr:"œuf"}],correct:1},
  {emoji:"🦅",word:"عصفور",options:[{ar:"قطة",ph:"9atta",fr:"chat"},{ar:"سمكة",ph:"7out",fr:"poisson"},{ar:"عصفور",ph:"3sfour",fr:"oiseau"},{ar:"فيل",ph:"fil",fr:"éléphant"}],correct:2},
  {emoji:"🐢",word:"فرطيط",options:[{ar:"ضفدع",ph:"dhfad3",fr:"grenouille"},{ar:"حية",ph:"7ayya",fr:"serpent"},{ar:"فرطيط",ph:"farttit",fr:"tortue"},{ar:"سمك",ph:"7out",fr:"poisson"}],correct:2},
  {emoji:"🌊",word:"موجة",options:[{ar:"بحر",ph:"bhar",fr:"mer"},{ar:"موجة",ph:"mawja",fr:"vague"},{ar:"نهر",ph:"wad",fr:"rivière"},{ar:"بحيرة",ph:"bu7ayra",fr:"lac"}],correct:1},
  {emoji:"🏖️",word:"شاطئ",options:[{ar:"شاطئ",ph:"chati2",fr:"plage"},{ar:"جبل",ph:"jbel",fr:"montagne"},{ar:"صحراء",ph:"sa7ra",fr:"désert"},{ar:"حديقة",ph:"7di9a",fr:"jardin"}],correct:0},
  {emoji:"📚",word:"كتاب",options:[{ar:"قلم",ph:"9alam",fr:"stylo"},{ar:"ورقة",ph:"waraqa",fr:"feuille"},{ar:"كتاب",ph:"kteb",fr:"livre"},{ar:"مدرسة",ph:"mdressa",fr:"école"}],correct:2},
  {emoji:"✏️",word:"قلم",options:[{ar:"كتاب",ph:"kteb",fr:"livre"},{ar:"قلم",ph:"9alam",fr:"stylo"},{ar:"مفتاح",ph:"mfta7",fr:"clé"},{ar:"ورقة",ph:"waraqa",fr:"feuille"}],correct:1},
  {emoji:"🔑",word:"مفتاح",options:[{ar:"باب",ph:"beb",fr:"porte"},{ar:"شباك",ph:"chbaak",fr:"fenêtre"},{ar:"مفتاح",ph:"mfta7",fr:"clé"},{ar:"قلم",ph:"9alam",fr:"stylo"}],correct:2},
  {emoji:"📱",word:"تليفون",options:[{ar:"تليفزيون",ph:"télé",fr:"télévision"},{ar:"تليفون",ph:"téléfon",fr:"téléphone"},{ar:"راديو",ph:"radio",fr:"radio"},{ar:"حاسوب",ph:"7assoub",fr:"ordinateur"}],correct:1},
  {emoji:"💻",word:"حاسوب",options:[{ar:"تليفون",ph:"téléfon",fr:"téléphone"},{ar:"تلفاز",ph:"télé",fr:"télévision"},{ar:"حاسوب",ph:"7assoub",fr:"ordinateur"},{ar:"راديو",ph:"radio",fr:"radio"}],correct:2},
  {emoji:"🛏️",word:"سرير",options:[{ar:"كرسي",ph:"kursi",fr:"chaise"},{ar:"طاولة",ph:"tawla",fr:"table"},{ar:"سرير",ph:"srir",fr:"lit"},{ar:"خزانة",ph:"5zana",fr:"armoire"}],correct:2},
  {emoji:"🪑",word:"كرسي",options:[{ar:"سرير",ph:"srir",fr:"lit"},{ar:"كرسي",ph:"kursi",fr:"chaise"},{ar:"طاولة",ph:"tawla",fr:"table"},{ar:"باب",ph:"beb",fr:"porte"}],correct:1},
  {emoji:"🍊",word:"برتقال",options:[{ar:"تفاحة",ph:"tfa7a",fr:"pomme"},{ar:"موزة",ph:"mawza",fr:"banane"},{ar:"برتقال",ph:"bartaga",fr:"orange"},{ar:"عنب",ph:"3neb",fr:"raisin"}],correct:2},
  {emoji:"🍎",word:"تفاحة",options:[{ar:"برتقال",ph:"bartaga",fr:"orange"},{ar:"تفاحة",ph:"tfa7a",fr:"pomme"},{ar:"عنب",ph:"3neb",fr:"raisin"},{ar:"موزة",ph:"mawza",fr:"banane"}],correct:1},
  {emoji:"🍌",word:"موزة",options:[{ar:"موزة",ph:"mawza",fr:"banane"},{ar:"تفاحة",ph:"tfa7a",fr:"pomme"},{ar:"برتقال",ph:"bartaga",fr:"orange"},{ar:"بطيخة",ph:"battikh",fr:"pastèque"}],correct:0},
  {emoji:"🍉",word:"بطيخة",options:[{ar:"موزة",ph:"mawza",fr:"banane"},{ar:"رمانة",ph:"rommana",fr:"grenade"},{ar:"بطيخة",ph:"battikh",fr:"pastèque"},{ar:"تمر",ph:"tmer",fr:"datte"}],correct:2},
  {emoji:"🍇",word:"عنب",options:[{ar:"تمر",ph:"tmer",fr:"datte"},{ar:"عنب",ph:"3neb",fr:"raisin"},{ar:"رمانة",ph:"rommana",fr:"grenade"},{ar:"تين",ph:"tin",fr:"figue"}],correct:1},
  {emoji:"🌶️",word:"فلفل",options:[{ar:"ثوم",ph:"toum",fr:"ail"},{ar:"بصل",ph:"bsal",fr:"oignon"},{ar:"فلفل",ph:"felfel",fr:"piment"},{ar:"ملح",ph:"mel7",fr:"sel"}],correct:2},
  {emoji:"🧅",word:"بصل",options:[{ar:"بصل",ph:"bsal",fr:"oignon"},{ar:"ثوم",ph:"toum",fr:"ail"},{ar:"فلفل",ph:"felfel",fr:"piment"},{ar:"طماطم",ph:"tomatich",fr:"tomate"}],correct:0},
  {emoji:"🍅",word:"طماطم",options:[{ar:"فلفل",ph:"felfel",fr:"piment"},{ar:"بصل",ph:"bsal",fr:"oignon"},{ar:"طماطم",ph:"tomatich",fr:"tomate"},{ar:"بطاطا",ph:"batata",fr:"pomme de terre"}],correct:2},
  {emoji:"🥛",word:"حليب",options:[{ar:"ماء",ph:"may",fr:"eau"},{ar:"عصير",ph:"3asir",fr:"jus"},{ar:"حليب",ph:"hlib",fr:"lait"},{ar:"قهوة",ph:"kahwa",fr:"café"}],correct:2},
  {emoji:"🧂",word:"ملح",options:[{ar:"سكر",ph:"sokkar",fr:"sucre"},{ar:"ملح",ph:"mel7",fr:"sel"},{ar:"فلفل",ph:"felfel",fr:"poivre"},{ar:"ثوم",ph:"toum",fr:"ail"}],correct:1},
  {emoji:"🫒",word:"زيتون",options:[{ar:"زيتون",ph:"zitouna",fr:"olive"},{ar:"زيت",ph:"zit",fr:"huile"},{ar:"ثوم",ph:"toum",fr:"ail"},{ar:"فلفل",ph:"felfel",fr:"piment"}],correct:0},
  {emoji:"🫚",word:"زيت",options:[{ar:"حليب",ph:"hlib",fr:"lait"},{ar:"ماء",ph:"may",fr:"eau"},{ar:"زيت",ph:"zit",fr:"huile"},{ar:"عصير",ph:"3asir",fr:"jus"}],correct:2},
  {emoji:"👶",word:"طفل",options:[{ar:"شاب",ph:"chab",fr:"jeune"},{ar:"رجل",ph:"rajel",fr:"homme"},{ar:"طفل",ph:"tfl",fr:"enfant"},{ar:"كهل",ph:"ke7el",fr:"vieux"}],correct:2},
  {emoji:"👴",word:"جدّي",options:[{ar:"بويا",ph:"bouy",fr:"père"},{ar:"خويا",ph:"khouya",fr:"frère"},{ar:"عمّي",ph:"3ammi",fr:"oncle"},{ar:"جدّي",ph:"jeddi",fr:"grand-père"}],correct:3},
  {emoji:"👵",word:"جدّتي",options:[{ar:"جدّتي",ph:"jaddti",fr:"grand-mère"},{ar:"أمّي",ph:"ommi",fr:"mère"},{ar:"عمّتي",ph:"3ammti",fr:"tante"},{ar:"أختي",ph:"okhti",fr:"sœur"}],correct:0},
  {emoji:"🤝",word:"صاحب",options:[{ar:"صاحب",ph:"sa7eb",fr:"ami"},{ar:"جار",ph:"jar",fr:"voisin"},{ar:"زميل",ph:"zemil",fr:"collègue"},{ar:"أخ",ph:"khouya",fr:"frère"}],correct:0},
  {emoji:"🎓",word:"جامعة",options:[{ar:"مدرسة",ph:"mdressa",fr:"école"},{ar:"جامعة",ph:"jami3a",fr:"université"},{ar:"مكتبة",ph:"mektba",fr:"bibliothèque"},{ar:"مستشفى",ph:"mostachfa",fr:"hôpital"}],correct:1},
  {emoji:"⚽",word:"كرة",options:[{ar:"كرة",ph:"kora",fr:"ballon"},{ar:"ملعب",ph:"mel3ab",fr:"terrain"},{ar:"قميص",ph:"qamis",fr:"maillot"},{ar:"حارس",ph:"7ares",fr:"gardien"}],correct:0},
  {emoji:"🎵",word:"موسيقى",options:[{ar:"صوت",ph:"sawt",fr:"voix"},{ar:"أغنية",ph:"oghnia",fr:"chanson"},{ar:"موسيقى",ph:"mousiqy",fr:"musique"},{ar:"رقص",ph:"ra9s",fr:"danse"}],correct:2},
  {emoji:"💃",word:"رقص",options:[{ar:"موسيقى",ph:"mousiqy",fr:"musique"},{ar:"رقص",ph:"ra9s",fr:"danse"},{ar:"أغنية",ph:"oghnia",fr:"chanson"},{ar:"فرح",ph:"far7",fr:"fête"}],correct:1},
  {emoji:"💍",word:"خاتم",options:[{ar:"خاتم",ph:"khatem",fr:"bague"},{ar:"ساعة",ph:"sa3a",fr:"montre"},{ar:"قلادة",ph:"9lada",fr:"collier"},{ar:"سوار",ph:"swar",fr:"bracelet"}],correct:0},
  {emoji:"⌚",word:"ساعة",options:[{ar:"ساعة",ph:"sa3a",fr:"montre"},{ar:"خاتم",ph:"khatem",fr:"bague"},{ar:"سوار",ph:"swar",fr:"bracelet"},{ar:"قلادة",ph:"9lada",fr:"collier"}],correct:0},
  {emoji:"🧳",word:"شنطة",options:[{ar:"ملابس",ph:"7wija",fr:"vêtements"},{ar:"شنطة",ph:"chanta",fr:"sac/valise"},{ar:"حذاء",ph:"sfiz",fr:"chaussure"},{ar:"قبعة",ph:"9abba3",fr:"chapeau"}],correct:1},
  {emoji:"🧢",word:"قبعة",options:[{ar:"شنطة",ph:"chanta",fr:"sac"},{ar:"ساعة",ph:"sa3a",fr:"montre"},{ar:"قبعة",ph:"9abba3",fr:"chapeau"},{ar:"حذاء",ph:"sfiz",fr:"chaussure"}],correct:2},
  {emoji:"🏡",word:"حوش",options:[{ar:"دار",ph:"eddor",fr:"maison"},{ar:"حوش",ph:"7ouch",fr:"cour/jardin"},{ar:"غرفة",ph:"ghorfa",fr:"chambre"},{ar:"سطح",ph:"sta7",fr:"toit"}],correct:1},
  {emoji:"🚿",word:"حمّام",options:[{ar:"مطبخ",ph:"koujina",fr:"cuisine"},{ar:"غرفة",ph:"ghorfa",fr:"chambre"},{ar:"حمّام",ph:"7ammem",fr:"salle de bain"},{ar:"صالون",ph:"sallon",fr:"salon"}],correct:2},
  {emoji:"🛋️",word:"صالون",options:[{ar:"صالون",ph:"sallon",fr:"salon"},{ar:"مطبخ",ph:"koujina",fr:"cuisine"},{ar:"حمّام",ph:"7ammem",fr:"salle de bain"},{ar:"غرفة",ph:"ghorfa",fr:"chambre"}],correct:0},
  {emoji:"🌴",word:"نخلة",options:[{ar:"شجرة",ph:"chajra",fr:"arbre"},{ar:"نخلة",ph:"na5la",fr:"palmier"},{ar:"زيتونة",ph:"zitouna",fr:"olivier"},{ar:"وردة",ph:"warda",fr:"rose"}],correct:1},
  {emoji:"🫙",word:"معجون",options:[{ar:"هريسة",ph:"harissa",fr:"harissa"},{ar:"زيت",ph:"zit",fr:"huile"},{ar:"معجون",ph:"ma3joun",fr:"pâte/sauce"},{ar:"ملح",ph:"mel7",fr:"sel"}],correct:2},
];

// ─── 50 QUESTIONS CULTURE TUNISIENNE ─────────────────────────────────────────
const ALL_CULTURE = [
  {q:"Quelle est la capitale de la Tunisie ?",options:["Sfax","Sousse","Tunis","Kairouan"],correct:2},
  {q:"Quelle est la monnaie tunisienne ?",options:["Euro","Dirham","Dinar","Livre"],correct:2},
  {q:"Quel est le plat national tunisien ?",options:["Tajine","Couscous","Brick","Lablabi"],correct:1},
  {q:"Le drapeau tunisien est de quelle couleur ?",options:["Vert et blanc","Bleu et blanc","Rouge et blanc","Jaune et rouge"],correct:2},
  {q:"Quelle mer borde la Tunisie ?",options:["Mer Rouge","Mer Noire","Mer Baltique","Mer Méditerranée"],correct:3},
  {q:"Quelle est la religion majoritaire en Tunisie ?",options:["Christianisme","Islam","Judaïsme","Bouddhisme"],correct:1},
  {q:"Quelle est la principale langue officielle de la Tunisie ?",options:["Français","Berbère","Arabe","Turc"],correct:2},
  {q:"La harissa est une sauce à base de... ?",options:["Tomates","Piments","Olives","Citrons"],correct:1},
  {q:"Quel est le symbole national tunisien sur le drapeau ?",options:["Étoile et croissant","Palmier","Lion","Aigle"],correct:0},
  {q:"La Médina de Tunis est classée au... ?",options:["Patrimoine UNESCO","Patrimoine arabe","Patrimoine africain","Registre national"],correct:0},
  {q:"Le Brik est une spécialité à base de... ?",options:["Pain","Riz","Feuille de brick","Couscous"],correct:2},
  {q:"Quelle ville tunisienne est connue pour sa poterie bleue et blanche ?",options:["Sfax","Sidi Bou Saïd","Nabeul","Kairouan"],correct:1},
  {q:"Le Ramadan est un mois de... ?",options:["Fête","Jeûne","Pèlerinage","Prière uniquement"],correct:1},
  {q:"Carthage est une ancienne cité proche de... ?",options:["Sfax","Bizerte","Tunis","Sousse"],correct:2},
  {q:"La Chéchia est un couvre-chef typique de quelle couleur ?",options:["Blanc","Noir","Rouge","Bleu"],correct:2},
  {q:"Quel empire a longtemps occupé la Tunisie ?",options:["Empire romain","Empire mongol","Empire chinois","Empire perse"],correct:0},
  {q:"L'indépendance de la Tunisie a eu lieu en... ?",options:["1946","1956","1962","1970"],correct:1},
  {q:"Quel est le prénom du premier président de Tunisie ?",options:["Zine","Habib","Mohamed","Ali"],correct:1},
  {q:"La Tunisie est en quelle région du monde ?",options:["Afrique subsaharienne","Moyen-Orient","Afrique du Nord","Europe du Sud"],correct:2},
  {q:"Le lablabi est une soupe à base de... ?",options:["Lentilles","Pois chiches","Haricots","Fèves"],correct:1},
  {q:"Quel est le sport le plus populaire en Tunisie ?",options:["Basketball","Football","Tennis","Handball"],correct:1},
  {q:"La Tunisie partage sa frontière avec... ?",options:["Maroc et Algérie","Algérie et Libye","Égypte et Libye","Maroc et Mauritanie"],correct:1},
  {q:"Sidi Bou Saïd est célèbre pour ses maisons... ?",options:["Roses et vertes","Blanches et bleues","Jaunes et rouges","Orangées et blanches"],correct:1},
  {q:"L'Aïd el-Fitr marque la fin de... ?",options:["La Haj","Le Ramadan","Achoura","Mawlid"],correct:1},
  {q:"La Tunisie a été colonisée par la France pendant... ?",options:["30 ans","50 ans","75 ans","100 ans"],correct:2},
  {q:"Le jasmin est le symbole floral de... ?",options:["L'Algérie","La Tunisie","Le Maroc","L'Égypte"],correct:1},
  {q:"La Chorba tunisienne est une... ?",options:["Salade","Soupe","Sauce","Pâtisserie"],correct:1},
  {q:"Le Hammam est un... ?",options:["Restaurant","Marché","Bain traditionnel","Lieu de prière"],correct:2},
  {q:"El Jem est célèbre pour son... ?",options:["Palais royal","Amphithéâtre romain","Souk médiéval","Minaret"],correct:1},
  {q:"La Tunisie compte environ combien d'habitants ?",options:["5 millions","12 millions","20 millions","30 millions"],correct:1},
  {q:"La mer de Djerba est connue pour ses... ?",options:["Dauphins","Flamants roses","Tortues","Coraux"],correct:1},
  {q:"Le couscous se mange traditionellement le... ?",options:["Lundi","Mercredi","Vendredi","Dimanche"],correct:2},
  {q:"Quel est le nom de la vieille ville à Tunis ?",options:["La Casbah","La Médina","La Kasbah","La Citadelle"],correct:1},
  {q:"La Tunisie exporte principalement... ?",options:["Pétrole","Huile d'olive et phosphates","Or","Café"],correct:1},
  {q:"L'Aïd el-Kebir commémore le sacrifice de... ?",options:["Moïse","Ibrahim","Salomon","Jésus"],correct:1},
  {q:"La Sfaxienne est le club de football de... ?",options:["Tunis","Sousse","Sfax","Bizerte"],correct:2},
  {q:"Le Malouf est un style de... ?",options:["Cuisine","Danse","Musique","Peinture"],correct:2},
  {q:"Kairouan est connue comme la... ?",options:["Ville des oliviers","Ville sainte","Ville des roses","Ville du jasmin"],correct:1},
  {q:"La Stambali est une musique de... ?",options:["Mariage","Transe rituelle","Fête nationale","Fête des moissons"],correct:1},
  {q:"Le Ouled Nail est un art de... ?",options:["Poterie","Broderie","Danse du ventre","Sculpture"],correct:2},
  {q:"Le Cap Bon est une... ?",options:["Île","Péninsule","Montagne","Forêt"],correct:1},
  {q:"La Ghriba est une synagogue sur l'île de... ?",options:["Djerba","Kerkennah","Galite","Zembra"],correct:0},
  {q:"Le Sefseri est porté par les femmes en... ?",options:["Campagne","Ville","Mer","Montagne"],correct:1},
  {q:"L'Ezzitouna est une célèbre université à... ?",options:["Sfax","Kairouan","Tunis","Sousse"],correct:2},
  {q:"La Tunisie a organisé le Printemps arabe en quelle année ?",options:["2009","2011","2013","2015"],correct:1},
  {q:"Ben Ali a gouverné la Tunisie pendant... ?",options:["10 ans","20 ans","24 ans","30 ans"],correct:2},
  {q:"Quelle est la principale ressource agricole tunisienne ?",options:["Blé","Café","Olive","Riz"],correct:2},
  {q:"Le Msemen est un pain... ?",options:["Soufflé","Feuilleté","Dur","Sucré"],correct:1},
  {q:"La Baklawa tunisienne est faite avec... ?",options:["Pistaches et miel","Amandes et sirop de sucre","Les deux selon les régions","Cacahuètes"],correct:2},
  {q:"Le dialecte tunisien mélange l'arabe avec... ?",options:["L'espagnol","Le français et le berbère","L'italien","Le turc uniquement"],correct:1},
  {q:"Quelle est la superficie de la Tunisie ?",options:["63 000 km²","163 610 km²","300 000 km²","80 000 km²"],correct:1},
  {q:"Quel fleuve principal traverse le nord de la Tunisie ?",options:["La Medjerda","Le Nil","L'Oued Souk","Le Cheliff"],correct:0},
  {q:"Quelle est la deuxième plus grande ville de Tunisie ?",options:["Sousse","Bizerte","Sfax","Kairouan"],correct:2},
  {q:"Quel peuple est à l'origine des premiers habitants de la Tunisie ?",options:["Les Phéniciens","Les Berbères","Les Arabes","Les Romains"],correct:1},
  {q:"Le surnom de l'équipe nationale de foot tunisienne est ?",options:["Les Faucons","Les Aigles de Carthage","Les Lions","Les Étoiles"],correct:1},
  {q:"Quelle ville est surnommée 'la perle du Sahel' ?",options:["Tunis","Sfax","Sousse","Monastir"],correct:2},
  {q:"Quel est le grand lac salé du sud de la Tunisie ?",options:["Chott el-Jerid","Lac de Tunis","Lac d'Ichkeul","Sebkha de Monastir"],correct:0},
  {q:"Le Oud est un instrument à... ?",options:["Vent","Cordes","Percussion","Touches"],correct:1},
  {q:"L'île de Djerba est rattachée à quel gouvernorat ?",options:["Médenine","Gabès","Sfax","Tataouine"],correct:0},
  {q:"La Ghribia est un gâteau fait à base de... ?",options:["Farine et amandes","Semoule et sucre glace","Riz et miel","Blé et dattes"],correct:1},
  {q:"Quel est le nom du palais présidentiel tunisien ?",options:["Palais de La Marsa","Palais de Carthage","Palais du Bardo","Palais de Sidi Bou Saïd"],correct:1},
  {q:"Le Musée du Bardo est célèbre pour ses... ?",options:["Peintures modernes","Mosaïques romaines","Sculptures islamiques","Bijoux berbères"],correct:1},
  {q:"La Jebba est un vêtement traditionnel... ?",options:["Féminin uniquement","Masculin uniquement","Masculin et féminin","Réservé aux mariages"],correct:2},
  {q:"Le Lella est un terme de respect pour... ?",options:["Un homme âgé","Un imam","Une femme respectée","Un chef de tribu"],correct:2},
  {q:"La Tunisie a été sous protectorat français à partir de... ?",options:["1830","1856","1881","1912"],correct:2},
  {q:"Le mot 'Toubib' en tunisien désigne... ?",options:["L'avocat","Le médecin","L'ingénieur","Le professeur"],correct:1},
  {q:"Quelle ville est célèbre pour la fabrication de la chéchia ?",options:["Sfax","Tunis","Sousse","Nabeul"],correct:1},
  {q:"Le Merguez est une saucisse originaire du... ?",options:["France","Moyen-Orient","Maghreb","Égypte"],correct:2},
  {q:"L'Ain Draham est connue pour... ?",options:["Son désert","Sa forêt et sa neige en hiver","Ses plages","Ses ruines romaines"],correct:1},
  {q:"Le festival de Carthage est principalement dédié à... ?",options:["Le sport","Le cinéma","Les arts et la musique","La gastronomie"],correct:2},
  {q:"Quel grand philosophe arabe est né à Tunis ?",options:["Ibn Sina","Al-Farabi","Ibn Khaldoun","Ibn Rushd"],correct:2},
  {q:"Ibn Khaldoun est célèbre pour avoir écrit... ?",options:["Le Coran","Les Mille et Une Nuits","La Muqaddima","L'Avicenne"],correct:2},
  {q:"Le Malouf tunisien est influencé par la musique... ?",options:["Africaine subsaharienne","Andalouse","Turque","Perse"],correct:1},
  {q:"Quel saint est vénéré à Sidi Bou Saïd ?",options:["Sidi Mahrez","Sidi Ali Ben Hamdouch","Sidi Bou Saïd el-Baji","Sidi Amor Abbada"],correct:2},
  {q:"La Zlabia est une pâtisserie frite servie surtout pendant... ?",options:["L'Aïd el-Kebir","Le Ramadan","Les mariages","La rentrée scolaire"],correct:1},
  {q:"La Kafteji est un plat à base de légumes... ?",options:["Grillés","Crus","Frits","Bouillis"],correct:2},
  {q:"Quel est le nom du détroit séparant la Tunisie de la Sicile ?",options:["Détroit de Gibraltar","Détroit de Sicile","Détroit de Bab el-Mandeb","Canal de Suez"],correct:1},
  {q:"Le Hafsia est un quartier historique de... ?",options:["Sfax","Sousse","Tunis","Kairouan"],correct:2},
  {q:"Le Mézoued est un instrument traditionnel de type... ?",options:["Cornemuse","Tambour","Flûte","Luth"],correct:0},
  {q:"La Zorna est un instrument à... ?",options:["Cordes","Vent","Percussion","Clavier"],correct:1},
  {q:"L'Amphithéâtre d'El Jem est le 3ème plus grand du monde romain ?",options:["Vrai","Faux, c'est le 2ème","Faux, c'est le 5ème","Faux, c'est le 7ème"],correct:0},
  {q:"La Makbouba est un plat typique de... ?",options:["Tunis","Sfax","Djerba","Kairouan"],correct:2},
  {q:"Quel président tunisien a instauré le Code du statut personnel ?",options:["Ben Ali","Habib Bourguiba","Moncef Marzouki","Béji Caïd Essebsi"],correct:1},
  {q:"Le Code du statut personnel tunisien a été adopté en... ?",options:["1956","1959","1964","1970"],correct:0},
  {q:"La polygamie en Tunisie est... ?",options:["Autorisée","Interdite par la loi","Autorisée avec conditions","Non réglementée"],correct:1},
  {q:"La mosquée de Kairouan a été fondée au VIIème siècle par... ?",options:["Ibn Khaldoun","Okba Ibn Nafi","Al-Farabi","Habib Bourguiba"],correct:1},
  {q:"La Dougga est un site archéologique de l'époque... ?",options:["Phénicienne","Romaine","Byzantine","Islamique"],correct:1},
  {q:"Le Tataouine est célèbre pour ses... ?",options:["Plages","Ksour (greniers fortifiés)","Sources thermales","Vignobles"],correct:1},
  {q:"La Tunisie a participé à sa première Coupe du monde de foot en... ?",options:["1966","1970","1978","1982"],correct:2},
  {q:"En quelle année la Tunisie a-t-elle gagné la CAN de football ?",options:["1994","2000","2004","2010"],correct:2},
  {q:"La ville de Monastir est la ville natale de... ?",options:["Ben Ali","Habib Bourguiba","Beji Caid Essebsi","Moncef Marzouki"],correct:1},
  {q:"Le Fegous est un... ?",options:["Plat de viande","Concombre d'été","Instrument de musique","Vêtement traditionnel"],correct:1},
  {q:"La Chakchouka est un plat à base de... ?",options:["Pois chiches","Poivrons, tomates et œufs","Lentilles","Couscous et légumes"],correct:1},
  {q:"Les Kerkennah sont... ?",options:["Des montagnes","Des îles","Des oasis","Des ruines romaines"],correct:1},
  {q:"La ville de Bizerte est connue pour son... ?",options:["Désert","Lac et port militaire","Festival de musique","Marché de poterie"],correct:1},
  {q:"L'Oja est un plat d'œufs brouillés avec... ?",options:["Du poisson","De la viande et des légumes","Des pâtes","Du riz"],correct:1},
  {q:"Quel est le nom de la tenue traditionnelle féminine de mariage tunisien ?",options:["Djellaba","Burnous","Kaftan","Haïk"],correct:2},
  {q:"La Barkoukech est une variante du... ?",options:["Lablabi","Couscous à grosses billes","Brik","Chorba"],correct:1},
  {q:"Le Henna est appliqué sur la mariée pour... ?",options:["La décoration et bénédiction","Soigner la peau","Repousser les insectes","Marquer son statut"],correct:0},
  {q:"La Tabliya est... ?",options:["Un instrument de musique","Une petite table basse ronde","Un plat de fête","Un type de pâtisserie"],correct:1},
  {q:"La Mechoui est une façon de préparer... ?",options:["Le poisson","La viande rôtie entière","Les légumes","Le pain"],correct:1},
  {q:"Le Tounsi désigne... ?",options:["Un habitant de Tunis seulement","Un Tunisien en général","Un dialecte spécifique","Un plat régional"],correct:1},
  {q:"L'Avenue Habib Bourguiba à Tunis est souvent comparée à... ?",options:["Oxford Street","La Canebière","Les Champs-Élysées","La Rambla"],correct:2},
  {q:"La Médina de Sfax est caractérisée par ses... ?",options:["Maisons bleues","Remparts bien préservés","Fontaines ottomanes","Mosaïques romaines"],correct:1},
  {q:"La Tunisie possède combien de sites classés UNESCO ?",options:["3","5","8","2"],correct:2},
  {q:"La Ghriba de Djerba est le plus ancien lieu de culte juif d'Afrique ?",options:["Vrai","Faux","C'est le deuxième","Personne ne le sait"],correct:0},
  {q:"Le Tabel est un... ?",options:["Mélange d'épices tunisien","Type de pain","Instrument de percussion","Poisson local"],correct:0},
  {q:"La Dersa est une sauce servie avec... ?",options:["Les pâtes","La Ojja","Le Couscous de poisson","Le Brik"],correct:2},
  {q:"Le Mouloukhiya est une pâte préparée à base de... ?",options:["Épinards séchés","Feuilles de corète séchées","Fenugrec","Menthe séchée"],correct:1},
  {q:"Le Printemps tunisien (révolution) a commencé à Sidi Bouzid en... ?",options:["2009","2010","2011","2012"],correct:1},
  {q:"Mohamed Bouazizi est connu pour s'être... ?",options:["Exilé en Europe","Immolé pour protester","Présenté aux élections","Révolté en armes"],correct:1},
  {q:"La Tunisie est le seul pays du Printemps arabe à avoir réussi une... ?",options:["Révolution armée","Transition démocratique stable","Fédération avec un voisin","Intégration dans l'UE"],correct:1},
  {q:"La constitution tunisienne de 2014 est considérée comme... ?",options:["La plus autoritaire du Maghreb","L'une des plus progressistes du monde arabe","Une copie de la constitution française","Provisoire et non ratifiée"],correct:1},
  {q:"La Tunisie a adopté une nouvelle constitution en... ?",options:["2014","2019","2022","2011"],correct:2},
  {q:"Le président Kaïs Saïed a été élu en... ?",options:["2014","2017","2019","2021"],correct:2},
  {q:"Quel prix Nobel de la Paix a été attribué à la Tunisie en 2015 ?",options:["Au président Bourguiba","Au Quartet du Dialogue National","À l'armée tunisienne","Aux médias indépendants"],correct:1},
  {q:"La langue amazighe (berbère) est encore parlée principalement... ?",options:["À Tunis","Dans le Sahara et à Djerba","À Sfax","Dans le Cap Bon"],correct:1},
  {q:"L'huile d'olive tunisienne est surtout produite dans... ?",options:["Le nord et le Sahel","Le sud uniquement","L'île de Djerba","La banlieue de Tunis"],correct:0},
  {q:"Le Frikassé est un sandwich frit garni de... ?",options:["Merguez seulement","Thon, harissa, olives et œuf","Poulet grillé","Fromage et légumes"],correct:1},
  {q:"Nabeul est connue pour sa production de... ?",options:["Tapis","Poterie et céramique","Soie","Bijoux en or"],correct:1},
  {q:"La Kairouan est la 4ème ville sainte de l'Islam ?",options:["Vrai","Faux, c'est la 3ème","Faux, c'est la 7ème","Ce n'est pas reconnu"],correct:0},
  {q:"Le Burnous est un manteau de laine porté par... ?",options:["Les femmes à la ville","Les hommes dans les régions froides","Les enfants lors des fêtes","Les imams uniquement"],correct:1},
  {q:"La Sebkha est une zone... ?",options:["Forestière","Montagneuse","Marécageuse/saline","Agricole"],correct:2},
  {q:"Quel instrument utilise-t-on pour faire du couscous ?",options:["Une casserole","Un couscoussier","Un tajine","Un four"],correct:1},
  {q:"La ville d'Hammamet est connue pour... ?",options:["Ses oliviers","Ses plages et son tourisme","Ses monuments romains","Sa poterie"],correct:1},
  {q:"Le jasmin en Tunisie est surtout vendu sous quelle forme ?",options:["En bouquet","En huile essentielle","En chapelet de fleurs","En sachet séché"],correct:2},
  {q:"L'Espérance Sportive de Tunis joue en... ?",options:["Rouge et Blanc","Rouge et Sang","Vert et Blanc","Jaune et Rouge"],correct:1},
  {q:"La Fête de la République tunisienne est le... ?",options:["20 mars","25 juillet","7 novembre","1er juin"],correct:1},
  {q:"La Fête de l'Indépendance tunisienne est le... ?",options:["20 mars","25 juillet","7 novembre","1er juin"],correct:0},
  {q:"Le Bardo héberge aussi le... ?",options:["Palais présidentiel","Parlement tunisien","Musée national","Les deux, musée et parlement"],correct:3},
  {q:"La Stambali est pratiquée par les descendants de... ?",options:["Berbères","Esclaves sub-sahariens","Andalous","Turcs ottomans"],correct:1},
  {q:"La Wosta est un terme tunisien désignant... ?",options:["La médiation/piston","Le marché","La cuisine","La fête"],correct:0},
  {q:"Le Chchia en Tunisie se porte surtout lors de... ?",options:["La plage","Mariages et fêtes nationales","Le travail","Le sport"],correct:1},
  {q:"Quelle ville tunisienne est jumelle avec Paris ?",options:["Sfax","Tunis","Sousse","Carthage"],correct:1},
  {q:"La Kerkennah est connue pour sa pêche à la... ?",options:["Ligne","Nasse (charfia)","Filet en haute mer","Plongée"],correct:1},
  {q:"Le Makroudh est une pâtisserie de... ?",options:["Tunis","Sfax","Kairouan","Nabeul"],correct:2},
  {q:"L'Assida est un dessert à base de... ?",options:["Semoule de blé","Riz au lait","Pois chiches sucrés","Dattes et noix"],correct:0},
  {q:"Le Zgougou est une pâte sucrée faite à partir de... ?",options:["Amandes","Pignons de pin d'Alep","Noix","Pistaches"],correct:1},
  {q:"La Assidat Zgougou est traditionnellement servie lors de... ?",options:["L'Aïd el-Kebir","La fête du Mawlid","Le Ramadan","Les mariages"],correct:1},
  {q:"Quel est le plat national officieux de la Tunisie ?",options:["Le Brik","La Chorba","Le Couscous","La Kafteji"],correct:2},
  {q:"La Ojja se distingue de la Chakchouka par... ?",options:["L'absence de tomates","L'ajout de merguez ou fruits de mer","Le mode de cuisson","La couleur"],correct:1},
  {q:"Le Tmar (تمر) désigne les... ?",options:["Figues","Olives","Dattes","Raisins"],correct:2},
  {q:"En Tunisie, le vendredi est considéré comme... ?",options:["Un jour ouvré normal","Le jour de repos hebdomadaire","Un jour de fête nationale","Un jour de marché uniquement"],correct:1},
  {q:"La grande mosquée de Tunis s'appelle... ?",options:["Mosquée de Kairouan","Mosquée Zitouna","Mosquée de Carthage","Mosquée Bourguiba"],correct:1},
  {q:"Le hammam traditionnel est divisé en combien de zones de chaleur ?",options:["1","2","3","4"],correct:2},
];

// ─── 30 QUESTIONS QUIZ MOTS (ancien) ─────────────────────────────────────────
const ALL_QUIZ = [
  {q:"Que signifie 'Aslema' ?",options:["Au revoir","Bonjour/Salut","Merci","S'il te plaît"],correct:1},
  {q:"Comment dit-on 'beaucoup' ?",options:["Chwaya","Fissa","Barcha","Koll"],correct:2},
  {q:"'Hamdoullah' signifie :",options:["Si Dieu le veut","Dieu merci","Félicitations","Ça suffit"],correct:1},
  {q:"Que veut dire 'Jou3an' ?",options:["J'ai soif","Je suis fatigué","J'ai faim","Je suis malade"],correct:2},
  {q:"'Mabrook' signifie :",options:["Désolé","Bonne chance","Félicitations !","Bon appétit"],correct:2},
  {q:"Comment dit-on 'ma mère' ?",options:["Bouy","Khouya","Ommi","Jiddi"],correct:2},
  {q:"'Kesra' c'est :",options:["La soupe","Le pain plat","Le fromage","Le beurre"],correct:1},
  {q:"Que signifie 'Bislama' ?",options:["Bonjour","Merci","Au revoir","S'il te plaît"],correct:2},
  {q:"'El bhar' désigne :",options:["La montagne","Le désert","La forêt","La mer"],correct:3},
  {q:"Comment dit-on 'demain' ?",options:["Lbereh","El youm","Ghodwa","El 9bel"],correct:2},
  {q:"'Yekol' signifie :",options:["Boire","Dormir","Manger","Parler"],correct:2},
  {q:"'Eddor' c'est :",options:["Le marché","La maison","La mosquée","L'école"],correct:1},
  {q:"'3aya' veut dire :",options:["Content","Fatigué","Malade","En forme"],correct:1},
  {q:"Comment dit-on 'eau' ?",options:["Hlib","Kahwa","May","3asir"],correct:2},
  {q:"'Brabi' signifie :",options:["Merci","Au revoir","S'il te plaît","Bonjour"],correct:2},
  {q:"'Khouya' désigne :",options:["Mon père","Ma sœur","Mon frère","Mon ami"],correct:2},
  {q:"Que veut dire 'Rass' ?",options:["La main","Le pied","Le dos","La tête"],correct:3},
  {q:"'Choukran' signifie :",options:["Bonjour","Merci","Pardon","Au revoir"],correct:1},
  {q:"'Souk' désigne :",options:["Le cinéma","L'hôpital","Le marché","L'école"],correct:2},
  {q:"Comment dit-on 'hier' ?",options:["El youm","Ghodwa","Lbereh","El 9bel"],correct:2},
  {q:"'Yezzi' signifie :",options:["Continue !","Ça suffit !","C'est bon","Viens ici"],correct:1},
  {q:"'Barcha' veut dire :",options:["Un peu","Jamais","Beaucoup","Toujours"],correct:2},
  {q:"Comment dit-on 'je veux' ?",options:["Né7abb","N7ebek","Naajem","Nroh"],correct:0},
  {q:"'Ma3lich' signifie :",options:["C'est grave","C'est fini","Ce n'est pas grave","Attention"],correct:2},
  {q:"'9atta' c'est :",options:["Le chien","Le chat","Le lapin","Le mouton"],correct:1},
  {q:"Comment dit-on 'mon père' ?",options:["Ommi","Jiddi","Khouya","Bouy"],correct:3},
  {q:"'Far7an' signifie :",options:["Triste","Malade","Content","Fatigué"],correct:2},
  {q:"'Inchallah' veut dire :",options:["Jamais","Si Dieu le veut","C'est sûr","Peut-être"],correct:1},
  {q:"Comment dit-on 'vite' ?",options:["Chwaya","Bichwaya","Fissa","Mazel"],correct:2},
  {q:"'3atshan' signifie :",options:["J'ai faim","J'ai soif","Je suis fatigué","J'ai chaud"],correct:1},
  {q:"'Sahha' signifie :",options:["Bonne nuit","Bon appétit/Santé","Bonne chance","Au revoir"],correct:1},
  {q:"Comment dit-on 'chien' ?",options:["9atta","Arnab","Kalb","3sfour"],correct:2},
  {q:"'Ghodwa' signifie :",options:["Hier","Aujourd'hui","Demain","Après-demain"],correct:2},
  {q:"'Mridh' veut dire :",options:["Fatigué","Malade","Triste","Fâché"],correct:1},
  {q:"Comment dit-on 'nuit' ?",options:["Nhaar","Lil","Sbah","3chiya"],correct:1},
  {q:"'Sbah el khir' c'est :",options:["Bonne nuit","Bonsoir","Bonjour","Bonne journée"],correct:2},
  {q:"'Ommi' désigne :",options:["Ma grand-mère","Ma tante","Ma sœur","Ma mère"],correct:3},
  {q:"Comment dit-on 'soleil' ?",options:["9mar","Nejma","Chems","Bhar"],correct:2},
  {q:"'Lahm' c'est :",options:["Le poisson","L'œuf","La viande","Le poulet"],correct:2},
  {q:"'Treno' désigne :",options:["L'avion","Le bus","La voiture","Le train"],correct:3},
  {q:"Comment dit-on 'lune' ?",options:["Chems","Nejma","9mar","Sama"],correct:2},
  {q:"'Tomobil' c'est :",options:["Le train","La voiture","Le bus","L'avion"],correct:1},
  {q:"'7azin' signifie :",options:["Heureux","Fatigué","Triste","Malade"],correct:2},
  {q:"Comment dit-on 'argent' ?",options:["Flous","Dinar","Souk","Banka"],correct:0},
  {q:"'Mziane' veut dire :",options:["Mauvais","Bien/Beau","Grand","Petit"],correct:1},
  {q:"'Jbel' désigne :",options:["La mer","Le désert","La montagne","La forêt"],correct:2},
  {q:"'7out' c'est :",options:["Le mouton","Le poisson","Le poulet","L'agneau"],correct:1},
  {q:"Comment dit-on 'maintenant' ?",options:["Taw","Mazel","El youm","Ghodwa"],correct:0},
  {q:"'Mazel' signifie :",options:["Déjà","Encore/Pas encore","Jamais","Toujours"],correct:1},
  {q:"'Jame3' c'est :",options:["L'école","L'hôpital","La mosquée","Le marché"],correct:2},
  {q:"Comment dit-on 'étoile' ?",options:["Chems","9mar","Nejma","Bhar"],correct:2},
  {q:"'Kersh' désigne :",options:["La tête","Le ventre","Le dos","Le bras"],correct:1},
  {q:"'Tfadhel' signifie :",options:["Va-t'en","Assieds-toi","Je t'en prie / Voilà","Dépêche-toi"],correct:2},
  {q:"Comment dit-on 'gauche' ?",options:["Ymin","Liser","Fawk","Ta7t"],correct:1},
  {q:"'Ymin' désigne :",options:["Gauche","Droite","Devant","Derrière"],correct:1},
  {q:"'Fawk' signifie :",options:["En bas","En haut","Devant","Derrière"],correct:1},
  {q:"Comment dit-on 'ciel' ?",options:["Ardh","Bhar","Sama","Jbel"],correct:2},
  {q:"'Barrani' signifie :",options:["Local","Ici","Étranger/De dehors","Ami"],correct:2},
  {q:"'Najem' veut dire :",options:["Je peux","Je veux","Je sais","Je dois"],correct:0},
  {q:"Comment dit-on 'fenêtre' ?",options:["Beb","Drij","Teja","Chbaak"],correct:3},
  {q:"'Beb' désigne :",options:["La fenêtre","La porte","Le mur","Le toit"],correct:1},
  {q:"'7achma' signifie :",options:["Courage","Honte/Pudeur","Joie","Fierté"],correct:1},
  {q:"Comment dit-on 'rouge' ?",options:["Asfar","Azra9","A7mar","A5dhar"],correct:2},
  {q:"'Azra9' c'est :",options:["Rouge","Vert","Jaune","Bleu"],correct:3},
  {q:"'A5dhar' signifie :",options:["Bleu","Jaune","Vert","Rouge"],correct:2},
  {q:"Comment dit-on 'blanc' ?",options:["Abyedh","Khal","Rmadi","Bni"],correct:0},
  {q:"'Khal' désigne :",options:["Blanc","Gris","Noir","Marron"],correct:2},
  {q:"'Shta' signifie :",options:["Été","Printemps","Automne","Hiver"],correct:3},
  {q:"Comment dit-on 'été' ?",options:["Shta","Khrayef","Sayf","Rabi3"],correct:2},
  {q:"'Rabi3' c'est :",options:["Hiver","Été","Automne","Printemps"],correct:3},
  {q:"'Khrayef' désigne :",options:["Printemps","Automne","Hiver","Été"],correct:1},
  {q:"Comment dit-on 'voisin' ?",options:["Sa7eb","Jar","5u","3amm"],correct:1},
  {q:"'Sa7eb' signifie :",options:["Frère","Cousin","Ami","Voisin"],correct:2},
  {q:"'Darsa' veut dire :",options:["Cours/Leçon","Jeu","Examen","Livre"],correct:0},
  {q:"Comment dit-on 'boulangerie' ?",options:["Farran","7anout","Souk","Mat3am"],correct:0},
  {q:"'Falla7' désigne :",options:["Pêcheur","Berger","Agriculteur","Commerçant"],correct:2},
  {q:"Comment dit-on 'nuage' ?",options:["Shemsi","Sa7ab","Rih","Shta"],correct:1},
  {q:"'Rih' signifie :",options:["Pluie","Nuage","Vent","Soleil"],correct:2},
  {q:"'Nroh' veut dire :",options:["Je viens","Je reste","Je pars/Je vais","Je dors"],correct:2},
  {q:"Comment dit-on 'travail' ?",options:["Darsa","Khidma","Flous","Mat3am"],correct:1},
];

// ─── 30 JEUX "Complète la phrase" ────────────────────────────────────────────
const ALL_GAMES = [
  {sentence:"___ ! Bienvenue chez moi !",answer:"Marhba bik",hint:"Formule d'accueil",options:["Bislama","Marhba bik","Choukran","Yezzi"]},
  {sentence:"J'ai très faim, je veux ___ quelque chose.",answer:"yekol",hint:"Verbe manger",options:["yechreb","yer9od","yekol","yemchi"]},
  {sentence:"Le couscous est délicieux, ___ mziane !",answer:"Barcha",hint:"Beaucoup/très",options:["Barcha","Chwaya","Ma3lich","Brabi"]},
  {sentence:"___ ! On est arrivés sains et saufs.",answer:"Hamdoullah",hint:"Expression de gratitude",options:["Inchallah","Hamdoullah","Mabrook","Yezzi"]},
  {sentence:"Je veux du pain, donne-moi de la ___.",answer:"Kesra",hint:"Pain plat tunisien",options:["Batata","Kesra","Lahm","Chorba"]},
  {sentence:"La maison en tunisien s'appelle ___.",answer:"eddor",hint:"Mot pour maison",options:["souk","eddor","bhar","jame3"]},
  {sentence:"Pour dire merci on dit ___.",answer:"Choukran",hint:"Politesse",options:["Aslema","Yezzi","Choukran","Bislama"]},
  {sentence:"Mon père en tunisien c'est ___.",answer:"bouy",hint:"Membre de la famille",options:["ommi","khouya","bouy","jiddi"]},
  {sentence:"Le marché en tunisien s'appelle le ___.",answer:"Souk",hint:"Lieu de commerce",options:["Souk","Jame3","Bhar","Mdressa"]},
  {sentence:"Pour dire au revoir on dit ___.",answer:"Bislama",hint:"Formule de départ",options:["Aslema","Bislama","Mabrook","Choukran"]},
  {sentence:"L'eau en tunisien s'appelle ___.",answer:"May",hint:"Boisson essentielle",options:["Hlib","Kahwa","May","3asir"]},
  {sentence:"___ signifie ça suffit, arrête !",answer:"Yezzi",hint:"Expression d'impatience",options:["Ma3lich","Yezzi","Inchallah","Brabi"]},
  {sentence:"Pour dire s'il te plaît on dit ___.",answer:"Brabi",hint:"Formule de demande",options:["Choukran","Brabi","Aslema","Ma3lich"]},
  {sentence:"Le chat en tunisien c'est ___.",answer:"9atta",hint:"Animal domestique félin",options:["kalb","9atta","arnab","3sfour"]},
  {sentence:"Je suis fatigué, en tunisien : Je suis ___.",answer:"3aya",hint:"État de fatigue",options:["Far7an","3aya","Jou3an","3atshan"]},
  {sentence:"Ma sœur en tunisien c'est ___.",answer:"okhti",hint:"Membre féminin de la famille",options:["ommi","okhti","khouya","3amti"]},
  {sentence:"La tête en tunisien c'est ___.",answer:"Rass",hint:"Partie du corps en haut",options:["Rijel","Ida","Rass","Kersh"]},
  {sentence:"Pour dire bonsoir on dit ___.",answer:"Msa el khir",hint:"Salutation du soir",options:["Sbah el khir","Msa el khir","Bislama","Aslema"]},
  {sentence:"Les yeux en tunisien c'est ___.",answer:"3ioune",hint:"Pour voir",options:["Wedhne","Nif","3ioune","Fomm"]},
  {sentence:"Pour féliciter quelqu'un on dit ___.",answer:"Mabrook!",hint:"Expression de célébration",options:["Ma3lich","Hamdoullah","Mabrook!","Yezzi"]},
  {sentence:"La mer en tunisien c'est ___.",answer:"El bhar",hint:"Grande étendue d'eau",options:["El bhar","El jame3","El mdressa","El souk"]},
  {sentence:"Je veux boire quelque chose : je veux ___.",answer:"yechreb",hint:"Verbe boire",options:["yekol","yechreb","yemchi","yer9od"]},
  {sentence:"Mon oncle paternel en tunisien c'est ___.",answer:"3ammi",hint:"Frère de ton père",options:["khali","3ammi","jiddi","bouy"]},
  {sentence:"La cuisine en tunisien s'appelle ___.",answer:"el bit el kol",hint:"Pièce où on cuisine",options:["el bit","el 7ammam","el bit el kol","el sallon"]},
  {sentence:"Pour dire non on dit ___.",answer:"La",hint:"Négation courte",options:["Eyh","La","Mich","Bass"]},
  {sentence:"Le café en tunisien s'appelle ___.",answer:"Kahwa",hint:"Boisson chaude du matin",options:["Atay","Hlib","Kahwa","3asir"]},
  {sentence:"Je suis content ! En tunisien : Je suis ___.",answer:"Far7an",hint:"Sentiment positif",options:["3aya","7azin","Far7an","Mridh"]},
  {sentence:"L'avion en tunisien c'est ___.",answer:"Tiyara",hint:"Transport aérien",options:["Treno","7afla","Tiyara","Tomobil"]},
  {sentence:"La chambre en tunisien s'appelle ___.",answer:"el bit",hint:"Pièce où on dort",options:["el sallon","el bit","el 7ammam","el drij"]},
  {sentence:"Pour dire 'tu me manques' on dit ___.",answer:"Twahachtech",hint:"Expression affective",options:["N7ebek","Twahachtech","Mar7bé bik","Tfadhel"]},
];

// ─── COULEURS & CONSTANTES ───────────────────────────────────────────────────
const C = {
  bg:"#fdf6ec", sand:"#f5e6c8", terracotta:"#c0522a",
  terracottaLight:"#e8784d", teal:"#1a7a6e", tealLight:"#2aa89a",
  gold:"#d4900a", goldLight:"#f0b429", cream:"#fff9f0",
  dark:"#2c1a0e", text:"#3d2810", muted:"#9a7a5a",
};
const CAT_ICONS = {
  // Cat1 (grandes catégories)
  'Aliments':'🍽️','Chiffres':'🔢','Expressions':'💬','Famille':'👨‍👩‍👧‍👦',
  'Lieux':'📍','Mots Utiles':'💡','Nature':'🌿','Temps/Espace':'⏰',
  'Transport':'🚗','Vie Quotidienne':'🏠',
  // Cat2 (sous-catégories)
  'fruits':'🍎','légumes':'🥕','Nourriture':'🥘','Plats':'🍲',
  'Commerce':'💰','Milliers':'🔢','Nombres':'🔢',
  'Expressions courantes':'🌟','Expressions utiles':'🗨️','Phrases aléatoires':'📝','Questions Utiles':'❓',
  'Adjectifs':'🎨','Adverbes':'💡','Conjonctions':'🔗','Politesse':'🤝','Verbes':'⚡',
  'Animaux':'🐾','Corps':'🫀',
  'Direction / Position':'🧭','Jours de la semaine':'📅','Temps':'⏰',
  'Maison':'🏠','Un problème en Tunisie':'🆘','Vêtements':'👔','Vie courante':'🎯',
  'default':'📚',
};

// ─── EMOJIS PAR MOT ──────────────────────────────────────────────────────────
const WORD_EMOJI = {
  'dattes':'🌴','Pastèque':'🍉','poire':'🍐','pomme':'🍎',
  'carotte':'🥕','courgette':'🥒','haricots blancs':'🫘','olives':'🫒',
  'patate':'🥔','petits pois':'🫛','Poivron/Piment':'🌶️',
  'pomme de terre':'🥔','salade':'🥗','tomate':'🍅',
  'eau':'💧',"huile d'olive":'🫙','lait fermenté':'🥛','le beurre':'🧈',
  'pâtes':'🍝','riz':'🍚','viande':'🥩','viande hachée':'🥩',
  'argent':'💰','marché':'🛒','payer':'💳','prix':'🏷️','réduction':'📉',
  'famille':'👨‍👩‍👧‍👦','femme / ma femme':'👩','fille':'👧','fils':'👦',
  'ma fille':'👧','ma sœur':'👧','mon fils':'👦','mon frère':'👦',
  'mon mari':'👨','moi':'👤',
  'banque':'🏦','Banque':'🏦','désert':'🏜️','France':'🇫🇷',
  'la maison':'🏠','la plage':'🏖️','le jardin':'🌿','le travail':'💼',
  'mer':'🌊','montagne':'⛰️','mosquée':'🕌','pharmacie':'💊',
  'plage':'🏖️','restaurant':'🍽️',
  'arabe':'🌙','beau/belle':'✨','bon (goût)':'😋','cher':'💸',
  'cru':'🥩','cuit':'♨️','difficile':'😰','drôle':'😄','facile':'😊',
  'faible':'😔','fort':'💪','grand':'🏗️','loin':'📍','malade':'🤒',
  'mauvais / moche':'👎','ouvert':'🚪','pas cher':'💚','petit':'🔹','proche':'📍',
  'beaucoup':'💯','doucement':'🐢','jamais':'🚫','maintenant':'⏰',
  'mieux':'⬆️','moins':'➖','Non':'❌','Oui':'✅','peu':'🔹',
  'plus':'➕','tard':'🌙','tôt':'🌅','toujours':'♾️','tout':'🌐',
  'trop':'⚠️','vite':'⚡','vraiment':'💯',
  'bienvenue à toi':'🎉','Bienvenue/Bonjour':'🎉','Merci':'🙏',
  "s'il te plait":'🙏','excuse moi':'🙏',
  'acheter':'🛒','aller':'🚶','apporter':'📦','arriver':'🏁',
  'courir':'🏃','dépenser':'💸','donner':'🤲','écrire':'✍️',
  'faire':'🔨','manger':'🍽️','mentir':'🤥','ouvrir':'🚪',
  'parler/téléphoner':'💬','partir/marcher/aller':'🚶','payer':'💳',
  'prendre':'🤲','se reposer':'😴','se taire':'🤫','travailler':'💼',
  'vouloir':'🙏','voyager':'✈️',
  'chat':'🐱','cheval':'🐴','chien':'🐕','fourmi':'🐜',
  'mouche':'🪰','mouton':'🐑','oiseau':'🐦','poisson':'🐟',
  'poulet':'🍗','vache':'🐄',
  'bouche':'👄','bras':'💪','cheveux':'💇','doigt':'👆',
  'fesses':'🍑','jambe':'🦵','main':'✋','nez':'👃',
  'œil':'👁️','oreille':'👂','pied':'🦶','tête':'🧠',
  'arbre':'🌳','la terre':'🌍','rose/fleur':'🌸',
  'au dessus':'⬆️','côté':'↔️','derrière':'⬅️','devant':'➡️',
  'droite':'➡️','en dessous':'⬇️','gauche':'⬅️','ici':'📍',
  'là bas':'👇','milieu':'⚪',
  'dimanche':'☀️','jeudi':'🟡','lundi':'🔵','mardi':'🔴',
  'mercredi':'🟢','samedi':'🏖️','vendredi':'🕌',
  'demain':'🌅','Hier':'📅','jour':'☀️','mois':'📅',
  'semaine':'📅','soirée':'🌙','tard':'🌙','tôt':'🌅',
  'avion':'✈️','moto':'🏍️','voiture':'🚗',
  'armoire':'🪞','assiette':'🍽️','baignoire':'🛁','canapé':'🛋️',
  'chaise':'🪑','chambre':'🛏️','coussin':'🛋️','cuisine':'🍳',
  'maison':'🏠','porte':'🚪','poubelle':'🗑️','robinet':'🚿',
  'salle de bain':'🚿','salle tv':'📺','salon':'🛋️',
  'table':'🪑','tapis':'🧿','télé':'📺','toilettes':'🚽','verre':'🥛',
  'baskets':'👟','chaussettes':'🧦','chaussures':'👟','chemise':'👔',
  'Manteau':'🧥','pantalon':'👖','Pull':'🧣','Robe':'👗',
  'balançoire':'🎠','ballon':'⚽','cahier':'📓','cartable':'🎒',
  'ciseaux':'✂️','clés':'🔑','congé':'🏖️','crayon':'✏️',
  'feuille':'📄','invité':'🎉','kilo':'⚖️','les gens':'👥',
  'livre':'📚','montre':'⌚','portefeuille':'👛','sable':'🏖️',
  'stylo':'🖊️','tabac':'🚬','trousse':'🖊️','vent':'💨',
  '1':'1️⃣','2':'2️⃣','3':'3️⃣','4':'4️⃣','5':'5️⃣',
  '6':'6️⃣','7':'7️⃣','8':'8️⃣','9':'9️⃣','10':'🔟',
  '11':'1️⃣1️⃣','12':'1️⃣2️⃣','13':'1️⃣3️⃣','14':'1️⃣4️⃣','15':'1️⃣5️⃣',
  '16':'1️⃣6️⃣','17':'1️⃣7️⃣','18':'1️⃣8️⃣','19':'1️⃣9️⃣',
  '20':'2️⃣0️⃣','30':'3️⃣0️⃣','40':'4️⃣0️⃣','50':'5️⃣0️⃣',
  '60':'6️⃣0️⃣','70':'7️⃣0️⃣','80':'8️⃣0️⃣','90':'9️⃣0️⃣',
  '100':'💯','1000':'🔢',
};
function getWordEmoji(french) {
  if (WORD_EMOJI[french]) return WORD_EMOJI[french];
  const f = french.toLowerCase();
  if (f.includes('eau')) return '💧';
  if (f.includes('pain')) return '🍞';
  if (f.includes('caf')) return '☕';
  if (f.includes('maison') || f.includes('dar')) return '🏠';
  if (f.includes('voiture') || f.includes('karhba')) return '🚗';
  if (f.includes('aimer') || f.includes('amour')) return '❤️';
  return '📚';
}
const CAT_COLORS = [
  ['#c0522a','#e8784d'],['#1a7a6e','#2aa89a'],['#7c3aed','#a78bfa'],
  ['#d4900a','#f0b429'],['#be185d','#f472b6'],['#0369a1','#38bdf8'],
  ['#065f46','#34d399'],['#92400e','#fbbf24'],['#1e3a5f','#60a5fa'],
  ['#6b21a8','#c084fc'],['#9f1239','#fb7185'],['#134e4a','#5eead4'],
  ['#1c1917','#78716c'],['#7f1d1d','#fca5a5'],['#14532d','#86efac'],
  ['#1e1b4b','#818cf8'],['#4c1d95','#c4b5fd'],['#0c4a6e','#7dd3fc'],
  ['#064e3b','#6ee7b7'],['#701a75','#f0abfc'],
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const pick = (arr, n) => shuffle(arr).slice(0, n);

const MosaicBorder = () => (
  <div style={{height:5,background:`repeating-linear-gradient(90deg,${C.terracotta} 0,${C.terracotta} 8px,${C.goldLight} 8px,${C.goldLight} 16px,${C.teal} 16px,${C.teal} 24px,${C.goldLight} 24px,${C.goldLight} 32px)`,opacity:0.7}}/>
);

// ─── MAP français → arabe (script) ──────────────────────────────────────────
const FR_TO_AR = {
  // Adjectifs
  'arabe':'عربي','bon(ne)':'بنين','cher(e)':'غالي','grand(e)':'كبير',
  'ouvert':'مفتوح','beau/belle':'مزيان','malade':'مريض','petit(e)':'صغير',
  'grand(e)/long(ue)':'طويل','court(e)/petit(e)':'قصير',
  // Adverbes
  'grâce à/à cause de':'علا خاطر','moins':'أقل','plus':'أكثر','trop/beaucoup':'برشا',
  'doucement':'بشوية',"sérieusement/c'est vrai":'بالحق','de force':'بالسيف',
  'peu':'شوية','tout':'الكل','Oui':'أيه','vite':'فيسا','là/ici':'هوني',
  'Non':'لا','encore/toujours':'مازال','comme il faut':'مريقل',
  // Temps
  'demain':'غدوة','maintenant':'تاو',"aujourd'hui":'اليوم','avant-hier':'وقت البارح',
  'hier':'البارح','avant':'القبل','après':'بعد',
  'lundi':'الاثنين','mardi':'الثلاثاء','mercredi':'الأربعاء','jeudi':'الخميس',
  'vendredi':'الجمعة','samedi':'السبت','dimanche':'الأحد',
  // Chiffres
  '4':'أربعة','7':'سبعة','5':'خمسة','6':'ستة','8':'ثمانية','3':'ثلاثة',
  '9':'تسعة','1':'واحد','2':'زوز','10':'عشرة','20':'عشرين','30':'ثلاثين',
  '100':'ميّة','1000':'ألف','moitié':'نص',
  // Conjonctions
  'car':'علا خاطر',"jusqu'à":'حتى','avant que':'قبل ما','après que':'بعد ما',
  'comme':'كيما','ou bien':'ولا','mais':'باس',
  // Expressions
  'tu as':'عندك','écoute moi bien':'اسماني','vas-y/dehors':'برّا','ok/bien':'بيهي',
  'donne moi':'أعطيني','il y a':'فما',"t'as compris?":'فمتح؟','ramène moi':'جيبلي',
  "il n'y a pas":'لا فما','bienvenue à toi':'مرحبى بيك',"je t'aime":'نحبك',
  'je veux':'نحب',"c'est fini":'راlass','je vous en prie':'تفضل',
  'tu me manques':'تواحشتك','au top':'طيارة',"c'est bon?":'سمح؟',
  // Politesse
  'bonjour/salut':'أسلامة','au revoir':'بسلامة','merci':'شكرا',
  "s'il vous plaît":'من فضلك','excuse moi':'سماحلي','merci (informel)':'يسلمك',
  'bonsoir':'مسا الخير','bonjour (matin)':'صباح الخير','bonne nuit':'تصبح على خير',
  "s'il te plaît":'برابي',
  // Maison
  'la maison':'الدار','la chambre':'البيت','la porte':'الباب','la fenêtre':'الشرجم',
  'la salle de bain':'الحمام','la cuisine':'بيت الأكل','le salon':'السالون',
  'le lit':'السرير','la chaise':'الكرسي','la table':'الطابلة',
  'le réfrigérateur':'الفريجو','le four':'الفار','le toit/terrasse':'السطح',
  "l'escalier":'الدريج','les toilettes':'التواليت','le garage':'الغاراج',
  'le jardin':'الجردان','le balcon':'البالكون','le bureau':'المكتب','la pièce':'الغرفة',
  // Animaux
  'chien':'كلب','chat':'قطة','mouton':'غنمي','vache':'بقرة','âne':'حمار',
  'cheval':'حصان','poule':'دجاجة','lapin':'أرنب','oiseau':'عصفور',
  'lion':'سبع','loup':'ذيب','éléphant':'فيل',
  // Famille
  'ma mère':'أمي','mon père':'بويا','mon frère':'خويا','ma sœur':'أختي',
  'mon grand-père':'جدي','ma grand-mère':'نينة','mon oncle paternel':'عمي',
  'mon oncle maternel':'خالي','ma tante paternelle':'عمتي','ma tante maternelle':'خالتي',
  'ma fille':'بنتي','mon fils':'ولدي','ma femme':'مراتي','mon mari':'رجالي',
  'mon frère (affectueux)':'خويا',
  // Lieux
  'marché':'سوق','la mosquée':'الجامع','le restaurant':'المطعم',"l'école":'المدرسة',
  'la vieille ville':'المدينة',"l'hôpital":'المستشفى','la mer/la plage':'البحر',
  "l'aéroport":'المطار','la gare':'المحطة',"l'université":'الجامعة',
  'la banque':'البنكة','le cinéma':'السينما','la place publique':'البلاصة',
  'le quartier':'الحي',"l'épicerie":'الحانوت',
  // Aliments
  'pomme de terre':'بطاطا','œuf':'بيضة','glace':'بوزة','brik':'بريك',
  'soupe':'شوربة','couscous':'كسكسي','poivron/piment':'فلفل','lait':'حليب',
  'café':'قهوة','pain plat':'كسرة','soupe de pois chiches':'لبلابي',
  'viande':'لحم','pâtes':'مكرونة','eau':'ماء','grillades':'مشوي','ail':'ثوم',
  'huile':'زيت','harissa':'هريسة','baklava':'بكلاوة','jus':'عصير','thé':'أتاي',
  // Véhicules
  'voiture':'كرهبة','moto':'موتور','bus':'حافلة','train':'قطار','avion':'طيارة','taxi':'تاكسي',
  // Prépositions
  'de/depuis':'من','dans/en':'في','sur/à':'على',"jusqu'à":'حتى',
  'dehors/hors':'برّا','là-bas':'ثمّة','ici':'هاذيا',
  // Pronoms
  'moi/je':'أنا','toi (m)':'أنت','toi (f)':'أنتي','lui/il':'هو','elle':'هي',
  'nous':'أحنا','vous':'أنتم','eux/elles':'هوما',
  'le mien/la mienne':'متاعي','le tien/la tienne':'متاعك',
  // Questions
  "Qu'est-ce que c'est?":'شنوا؟','Où?':'وين؟','Quand?':'وقتاه؟',
  'Pourquoi?':'علاش؟','Comment?':'كيفاش؟','Qui?':'شكون؟',
  'Combien?':'قداه؟',"D'où?":'منين؟','Comment tu vas?':'كيحوالك؟',
  "Tu viens d'où?":'منين أنت؟',
  // Verbes
  'il/elle va/part':'يمشي','il/elle mange':'يأكل','il/elle boit':'يشرب',
  'il/elle se repose':'يرتاح','il/elle fait/travaille':'يعمل','il/elle vient':'يجي',
  'il/elle parle':'يتحدث','il/elle attend':'يستنّى','il/elle dort':'يرقد',
  'il/elle comprend':'يفهم','il/elle achète':'يشري','il/elle vend':'يبيع',
  'il/elle aime':'يحب','il/elle lit/étudie':'يقرأ','il/elle écrit':'يكتب',
  'il/elle rit':'يضحك',
  // Expressions courantes
  'Bonjour/Salut!':'أسلامة!','Au revoir!':'بسلامة!',"C'est pas grave":'معليش',
  'Dieu merci':'الحمد لله','Si Dieu le veut':'إن شاء الله','Ça suffit!':'يزّي!',
  'Très bien/Délicieux':'برشا مزيان','Bon appétit/Santé':'صحة وعافية',
  'Félicitations!':'مبروك!','Attention!':'صالّك!','Extraordinaire':'فوق العادة',
  'Pareil/Kif kif':'بهال بهال',"C'est-à-dire":'يعني','Comme tu veux':'على راسك',
  'Il faut':'لازم',"Je suis pas pressé":'مانيش موجّع',"C'est facile!":'خبزة!',
  "J'ai soif":'عطشان',"J'ai faim":'جوعان','Fatigué(e)':'عيا',
  'Content(e)':'فرحان',"J'ai assez mangé":'شبعت','Merci beaucoup':'شكران برشا',
  'Tu vas où?':'وين تمشي؟','Je vais voir':'تاو نشوف',
  // Vêtements
  'veste':'جبدة','manteau':'كابوط','chemise':'قميجة','pantalon':'سروال',
  'chaussure':'سفيز','couverture':'لحاف','voile blanc tunisien':'سفساري',
  'chapeau traditionnel':'شاشية','robe/vêtement':'لبسة','chaussette':'شراب',
  // Corps
  'tête':'راس','yeux':'عيون','oreilles':'وذنة','nez':'نيف','bouche':'فم',
  'dents':'سنان','épaule':'كتف','main':'إيد','pied/jambe':'رجل','dos':'ظهر',
  'ventre':'كرش','cœur':'قلب','bras':'ساعد','doigt':'سباع','visage':'وجه',
  // Mots communs
  'non/pas':'ميش','et':'و','avec':'مع','sans':'بلا','tous/chaque':'كل',
  'pour/afin de':'باش','si (condition)':'كان','même/aussi':'حتى',
  'mais/seulement':'باس','parce que':'خاطر','toujours':'ديما',
  'une seule fois':'مرة واحدة','chaque jour':'كل يوم',
};

// ─── MOTS-CLÉS ANGLAIS pour images Unsplash ──────────────────────────────────
const IMG_KEYWORDS = {
  // Animaux
  'chien':'dog','chat':'cat','mouton':'sheep','vache':'cow','âne':'donkey',
  'cheval':'horse','poule':'chicken','lapin':'rabbit','oiseau':'bird',
  'lion':'lion','loup':'wolf','éléphant':'elephant',
  // Aliments
  'pomme de terre':'potato','œuf':'egg','glace':'ice cream','brik':'tunisian brik',
  'soupe':'soup bowl','couscous':'couscous','poivron/piment':'red pepper','lait':'milk glass',
  'café':'coffee cup','pain plat':'flatbread','soupe de pois chiches':'chickpea soup',
  'viande':'meat','pâtes':'pasta','eau':'water glass','grillades':'grilled meat',
  'ail':'garlic','huile':'olive oil bottle','harissa':'harissa paste','baklava':'baklava',
  'jus':'orange juice','thé':'tea cup mint',
  // Maison
  'la maison':'house exterior','la chambre':'bedroom','la porte':'door wooden',
  'la fenêtre':'window','la salle de bain':'bathroom','la cuisine':'kitchen',
  'le salon':'living room','le lit':'bed','la chaise':'chair','la table':'dining table',
  'le réfrigérateur':'refrigerator','le four':'oven','le toit/terrasse':'rooftop terrace',
  "l'escalier":'staircase','les toilettes':'toilet bathroom','le garage':'garage',
  'le jardin':'garden','le balcon':'balcony','le bureau':'office desk','la pièce':'room interior',
  // Lieux
  'marché':'market bazaar','la mosquée':'mosque','le restaurant':'restaurant',
  "l'école":'school building',"l'hôpital":'hospital','la mer/la plage':'beach sea',
  "l'aéroport":'airport terminal','la gare':'train station',"l'université":'university campus',
  'la banque':'bank building','le cinéma':'cinema theater','la place publique':'town square',
  'le quartier':'neighbourhood',"l'épicerie":'grocery store',
  'la vieille ville':'medina tunisia',
  // Famille
  'ma mère':'mother woman','mon père':'father man','mon frère':'brother young man',
  'ma sœur':'sister young woman','mon grand-père':'grandfather elderly','ma grand-mère':'grandmother elderly',
  'mon oncle paternel':'uncle man','mon oncle maternel':'uncle man',
  'ma tante paternelle':'aunt woman','ma tante maternelle':'aunt woman',
  'ma fille':'daughter girl','mon fils':'son boy','ma femme':'wife woman','mon mari':'husband man',
  'mon frère (affectueux)':'brother friends',
  // Véhicules
  'voiture':'car','moto':'motorcycle','bus':'city bus','train':'train railway',
  'avion':'airplane sky','taxi':'yellow taxi',
  // Corps
  'tête':'head face','yeux':'eyes close up','oreilles':'ear','nez':'nose face',
  'bouche':'mouth lips','dents':'teeth smile','épaule':'shoulder','main':'hand',
  'pied/jambe':'foot leg','dos':'back spine','ventre':'belly abdomen','cœur':'heart',
  'bras':'arm','doigt':'finger','visage':'face portrait',
  // Vêtements
  'veste':'jacket clothing','manteau':'coat winter','chemise':'shirt','pantalon':'pants trousers',
  'chaussure':'shoes','couverture':'blanket','voile blanc tunisien':'sefsari tunisian veil',
  'chapeau traditionnel':'chechia hat tunisia','robe/vêtement':'dress clothing','chaussette':'socks',
  // Temps
  'demain':'sunrise morning','maintenant':'clock present',"aujourd'hui":'sunny day today',
  'avant-hier':'calendar past','hier':'yesterday calendar','avant':'before arrow',
  'après':'after arrow','lundi':'monday calendar','mardi':'tuesday calendar',
  'mercredi':'wednesday calendar','jeudi':'thursday calendar','vendredi':'friday mosque',
  'samedi':'saturday weekend','dimanche':'sunday rest',
  // Chiffres
  '1':'number one','2':'number two','3':'number three','4':'number four','5':'number five',
  '6':'number six','7':'number seven','8':'number eight','9':'number nine','10':'number ten',
  '20':'number twenty','30':'thirty','100':'hundred','1000':'thousand','moitié':'half cut',
  // Adjectifs
  'arabe':'arabic calligraphy','bon(ne)':'thumbs up good','cher(e)':'luxury expensive',
  'grand(e)':'tall building','ouvert':'open door','beau/belle':'beautiful landscape',
  'malade':'sick person','petit(e)':'small tiny','grand(e)/long(ue)':'long road',
  'court(e)/petit(e)':'short small',
  // Questions
  "Qu'est-ce que c'est?":'question mark','Où?':'map location pin','Quand?':'clock time',
  'Pourquoi?':'why question','Comment?':'how question mark','Qui?':'person silhouette',
  'Combien?':'counting money','Comment tu vas?':'greeting wave',"Tu viens d'où?":'map origin',
  // Verbes
  'il/elle va/part':'person walking','il/elle mange':'eating food','il/elle boit':'drinking water',
  'il/elle se repose':'resting relaxing','il/elle fait/travaille':'working desk','il/elle vient':'person arriving',
  'il/elle parle':'talking conversation','il/elle attend':'waiting person','il/elle dort':'sleeping bed',
  'il/elle comprend':'lightbulb understanding','il/elle achète':'shopping','il/elle vend':'selling market',
  'il/elle aime':'love heart','il/elle lit/étudie':'reading book','il/elle écrit':'writing pen',
  'il/elle rit':'laughing smiling',
  // Expressions courantes
  'Bonjour/Salut!':'greeting wave hello','Au revoir!':'goodbye waving',"C'est pas grave":'relaxed calm',
  'Dieu merci':'thankful grateful','Si Dieu le veut':'sky light hope','Ça suffit!':'stop hand',
  'Très bien/Délicieux':'delicious food','Bon appétit/Santé':'meal table',
  'Félicitations!':'celebration confetti','Attention!':'warning caution',
  'Extraordinaire':'amazing spectacular','Pareil/Kif kif':'equal balance',
  "J'ai soif":'thirsty water',"J'ai faim":'hungry empty plate',
  'Fatigué(e)':'tired yawning','Content(e)':'happy smiling','Merci beaucoup':'thank you grateful',
};

// ─── ARABIZI → ARABE (script) ────────────────────────────────────────────────
function arabiziToArabic(text) {
  let s = text;
  // Étape 1 : chiffres arabes (avec voyelle suivante)
  const numMap = [
    ['3a','عا'],['3e','عي'],['3i','عي'],['3o','عو'],['3u','عو'],['3','ع'],
    ['7a','حا'],['7e','حي'],['7i','حي'],['7o','حو'],['7u','حو'],['7','ح'],
    ['9a','قا'],['9e','قي'],['9i','قي'],['9o','قو'],['9u','قو'],['9','ق'],
    ['5a','خا'],['5e','خي'],['5i','خي'],['5o','خو'],['5u','خو'],['5','خ'],
    ['2a','أا'],['2e','أي'],['2i','أي'],['2o','أو'],['2u','أو'],['2','ء'],
    ['8a','غا'],['8e','غي'],['8i','غي'],['8o','غو'],['8u','غو'],['8','غ'],
  ];
  for (const [from, to] of numMap) {
    const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'gi');
    s = s.replace(re, to);
  }
  // Étape 2 : latin → arabe (digraphes d'abord)
  const latinMap = [
    ['ch','ش'],['sh','ش'],['gh','غ'],['kh','خ'],['th','ث'],['dh','ذ'],
    ['ou','و'],['au','و'],['ei','ي'],['ai','ي'],['ay','ي'],['aw','او'],
    ['wa','وا'],['wi','وي'],['ya','يا'],['yi','يي'],['yo','يو'],
    ['a','ا'],['â','ا'],['b','ب'],['c','ك'],['d','د'],
    ['e','ي'],['é','ي'],['è','ي'],['ê','ي'],['f','ف'],['g','ڤ'],
    ['h','ه'],['i','ي'],['î','ي'],['j','ج'],['k','ك'],['l','ل'],
    ['m','م'],['n','ن'],['o','و'],['ô','و'],['p','ب'],['q','ق'],
    ['r','ر'],['s','س'],['t','ت'],['u','و'],['û','و'],['v','ف'],
    ['w','و'],['x','كس'],['y','ي'],['z','ز'],
    [' ',' '],['-',' '],["'",'ء'],['/','/'],
  ];
  let result = '';
  let i = 0;
  const lower = s.toLowerCase();
  while (i < s.length) {
    let matched = false;
    for (const [from, to] of latinMap) {
      if (lower.startsWith(from, i)) {
        result += to;
        i += from.length;
        matched = true;
        break;
      }
    }
    if (!matched) { result += s[i]; i++; }
  }
  return result;
}

// ─── TTS ARABE — voix égyptienne ar-EG (+ fallback ar-SA / ar) ───────────────
function getArabicVoice() {
  return new Promise((resolve) => {
    const pick = (voices) =>
      voices.find(v => v.lang === 'ar-EG') ||
      voices.find(v => v.lang === 'ar-SA') ||
      voices.find(v => v.lang.startsWith('ar')) ||
      null;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) { resolve(pick(voices)); return; }
    const h = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) {
        window.speechSynthesis.removeEventListener('voiceschanged', h);
        resolve(pick(v));
      }
    };
    window.speechSynthesis.addEventListener('voiceschanged', h);
    setTimeout(() => resolve(pick(window.speechSynthesis.getVoices())), 2000);
  });
}

async function speakTunisian(tunisianText, onStart, onEnd) {
  if (!window.speechSynthesis) { onEnd && onEnd(); return; }
  window.speechSynthesis.cancel();
  const arabicText = arabiziToArabic(tunisianText);
  const voice = await getArabicVoice();
  const utt = new SpeechSynthesisUtterance(arabicText);
  // ar-EG en priorité — si pas trouvé on force quand même ar-EG pour le moteur
  utt.lang = voice ? voice.lang : 'ar-EG';
  if (voice) utt.voice = voice;
  utt.rate = 0.82;
  utt.pitch = 1;
  utt.onstart = () => onStart && onStart();
  utt.onend   = () => onEnd && onEnd();
  utt.onerror = () => onEnd && onEnd();
  window.speechSynthesis.speak(utt);
}

// ─── IMAGE SVG GÉNÉRÉE PAR IA ─────────────────────────────────────────────────
const svgCache = {};

function WordImage({ french, size = 60 }) {
  const [svg, setSvg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (svgCache[french]) { setSvg(svgCache[french]); return; }
    setLoading(true);
    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": "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", "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 600,
        messages: [{
          role: "user",
          content: `Create a simple, cute SVG illustration for the word "${french}". 
Rules:
- viewBox="0 0 60 60", no width/height attributes
- Use simple geometric shapes, clean and colorful
- No text, no labels
- Max 8 elements, bright cheerful colors
- Respond with ONLY the raw SVG code, nothing else, no markdown`
        }]
      })
    })
    .then(r => r.json())
    .then(data => {
      const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
      const match = text.match(/<svg[\s\S]*<\/svg>/i);
      if (match) {
        svgCache[french] = match[0];
        setSvg(match[0]);
      }
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, [french]);

  if (loading) return <div style={{width:size,height:size,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#aaa"}}>⏳</div>;
  if (!svg) return null;
  return <div style={{width:size,height:size}} dangerouslySetInnerHTML={{__html: svg}} />;
}

// ─── CARTE VOCABULAIRE ───────────────────────────────────────────────────────
function VocabCard({ item }) {
  const [flipped, setFlipped] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const arabic = FR_TO_AR[item.french] || '';
  const emoji = getWordEmoji(item.french);
  const needsGeneratedImage = emoji === '📚';

  const handleSpeak = (e) => {
    e.stopPropagation();
    speakTunisian(item.tunisian, () => setSpeaking(true), () => setSpeaking(false));
  };

  return (
    <div
      onClick={() => setFlipped(f => !f)}
      style={{
        cursor:"pointer",
        borderRadius:14,
        border:`2px solid ${flipped ? C.teal : C.sand}`,
        overflow:"hidden",
        display:"flex",
        flexDirection:"column",
        transition:"all 0.25s",
        transform: flipped ? "scale(1.03)" : "scale(1)",
        boxShadow: flipped ? `0 6px 20px ${C.teal}44` : "0 2px 8px rgba(44,26,14,0.08)",
        background: flipped ? `linear-gradient(160deg,${C.teal},${C.tealLight})` : C.cream,
        minHeight: 130,
        position: "relative",
      }}
    >
      {/* Bouton audio 🔊 */}
      <button
        onClick={handleSpeak}
        title="Écouter la prononciation"
        style={{
          position:"absolute",
          top:6,
          right:6,
          width:28,
          height:28,
          borderRadius:"50%",
          border:"none",
          background: speaking
            ? (flipped ? "rgba(255,255,255,0.5)" : C.terracotta)
            : (flipped ? "rgba(255,255,255,0.2)" : C.sand),
          cursor:"pointer",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          fontSize:13,
          zIndex:10,
          transition:"all 0.2s",
          boxShadow: speaking ? "0 0 0 3px rgba(255,255,255,0.4)" : "none",
          animation: speaking ? "pulse 0.8s infinite alternate" : "none",
        }}
      >
        {speaking ? "🔈" : "🔊"}
      </button>

      {/* Partie image + mot français */}
      {!flipped ? (
        <>
          <div style={{padding:"14px 6px 10px",display:"flex",flexDirection:"column",alignItems:"center",gap:6,flex:1,justifyContent:"center"}}>
            {needsGeneratedImage
              ? <WordImage french={item.french} size={52} />
              : <div style={{fontSize:32}}>{emoji}</div>
            }
            <div style={{fontSize:12,fontWeight:700,color:C.terracotta,textAlign:"center",lineHeight:1.3,paddingRight:8}}>{item.french}</div>
          </div>
        </>
      ) : (
        /* Partie arabe + phonétique */
        <div style={{padding:"12px 8px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:7,flex:1}}>
          {arabic && (
            <div style={{fontFamily:"'Amiri',serif",fontSize:20,fontWeight:700,color:"#fff",textAlign:"center",direction:"rtl",lineHeight:1.3}}>
              {arabic}
            </div>
          )}
          <div style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.9)",textAlign:"center",fontStyle:"italic",lineHeight:1.3}}>
            {item.tunisian}
          </div>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.65)",textAlign:"center"}}>{item.french}</div>
        </div>
      )}
    </div>
  );
}

// ─── PAGE CATÉGORIE ──────────────────────────────────────────────────────────
function CategoryPage({ cat, colorPair, onBack }) {
  const words = VOCABULARY.filter(v => v.cat1 === cat || v.cat2 === cat);
  // Get subcategories if this is a cat1
  const isCat1 = VOCABULARY.some(v => v.cat1 === cat);
  const subCats = isCat1 ? [...new Set(VOCABULARY.filter(v => v.cat1 === cat).map(v => v.cat2))] : null;
  const [selectedCat2, setSelectedCat2] = useState(null);
  const sortByNumber = (words) => {
    const numericCats = ['Nombres', 'Milliers', 'Commerce'];
    if (numericCats.includes(selectedCat2 || cat)) {
      return [...words].sort((a, b) => {
        const na = parseFloat(a.french.replace(/[^0-9.]/g, '')) || 0;
        const nb = parseFloat(b.french.replace(/[^0-9.]/g, '')) || 0;
        if (na && nb) return na - nb;
        return 0;
      });
    }
    return words;
  };
  const displayWords = isCat1 && selectedCat2 
    ? sortByNumber(VOCABULARY.filter(v => v.cat1 === cat && v.cat2 === selectedCat2))
    : isCat1 && !selectedCat2 ? [] : sortByNumber(words);
  const [search, setSearch] = useState("");
  const filteredSource = (!isCat1 || selectedCat2) ? displayWords : [];
  const filtered = search ? filteredSource.filter(w =>
    w.french.toLowerCase().includes(search.toLowerCase()) ||
    w.tunisian.toLowerCase().includes(search.toLowerCase())
  ) : filteredSource;

  return (
    <div style={{display:"flex",flexDirection:"column",background:C.bg,maxWidth:480,margin:"0 auto",height:"100%"}}>
      <div style={{background:`linear-gradient(135deg,${colorPair[0]},${colorPair[1]})`,padding:"0 0 14px",flexShrink:0}}>
        <MosaicBorder/>
        <div style={{padding:"12px 16px 0",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={selectedCat2 ? () => setSelectedCat2(null) : onBack} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:10,padding:"6px 12px",color:"#fff",fontSize:16,cursor:"pointer",fontWeight:700}}>←</button>
          <div>
            <div style={{fontFamily:"'Amiri',serif",fontSize:18,fontWeight:700,color:"#fff"}}>{CAT_ICONS[selectedCat2||cat]||"📚"} {selectedCat2||cat}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.8)"}}>{selectedCat2 ? VOCABULARY.filter(v=>v.cat1===cat&&v.cat2===selectedCat2).length : words.length} mots</div>
          </div>
        </div>
      </div>
      <div style={{padding:"12px 14px 8px",flexShrink:0}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Filtrer..." style={{width:"100%",padding:"9px 14px",borderRadius:12,border:`1.5px solid ${C.sand}`,background:C.cream,fontSize:13,color:C.text,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
        {search && <div style={{fontSize:11,color:C.muted,marginTop:4}}>{filtered.length} résultat(s)</div>}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 14px 20px"}}>
        {isCat1 && !selectedCat2 && (
          <div style={{display:"flex",flexDirection:"column",gap:10,paddingTop:4}}>
            {subCats.map((sc, i) => {
              const scCount = VOCABULARY.filter(v => v.cat1 === cat && v.cat2 === sc).length;
              const pair = CAT_COLORS[i % CAT_COLORS.length];
              return (
                <div key={sc} onClick={() => setSelectedCat2(sc)}
                  style={{cursor:"pointer",background:`linear-gradient(135deg,${pair[0]},${pair[1]})`,borderRadius:14,padding:"14px 18px",display:"flex",alignItems:"center",gap:12,boxShadow:`0 3px 12px ${pair[0]}33`,transition:"transform 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="scale(1.01)"}
                  onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
                  <div style={{fontSize:28}}>{CAT_ICONS[sc]||"📚"}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>{sc}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.8)",marginTop:2}}>{scCount} mots →</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {(!isCat1 || selectedCat2) && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,paddingTop:4}}>
            {filtered.map(item => <VocabCard key={item.id} item={item}/>)}
          </div>
        )}
        {(!isCat1 || selectedCat2) && filtered.length === 0 && (
          <div style={{textAlign:"center",color:C.muted,marginTop:40,fontSize:14}}>Aucun résultat 🔍</div>
        )}
      </div>
    </div>
  );
}

// ─── QUIZ IMAGE SESSION (5/50) ────────────────────────────────────────────────
function ImageQuizSession({ onDone }) {
  const [questions] = useState(() => pick(ALL_IMAGE_QUIZ, 5));
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[idx];

  const choose = (i) => {
    if (sel !== null) return;
    setSel(i);
    if (i === q.correct) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true);
      else { setIdx(c => c + 1); setSel(null); }
    }, 1200);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16,padding:"30px 20px"}}>
        <div style={{fontSize:64}}>{pct===100?"🏆":pct>=60?"🥈":"🎗️"}</div>
        <div style={{fontFamily:"'Amiri',serif",fontSize:22,fontWeight:700,color:C.terracotta,textAlign:"center"}}>{pct===100?"Parfait !":pct>=60?"Bien joué !":"Continue !"}</div>
        <div style={{fontSize:44,fontWeight:800,color:C.teal}}>{score}/{questions.length}</div>
        <div style={{width:"100%",height:10,background:C.sand,borderRadius:99,overflow:"hidden"}}>
          <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${C.terracotta},${C.goldLight})`,borderRadius:99}}/>
        </div>
        <button onClick={onDone} style={{background:`linear-gradient(135deg,${C.terracotta},${C.terracottaLight})`,color:"#fff",border:"none",borderRadius:14,padding:"13px 32px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Rejouer 🔄</button>
        <div style={{fontSize:12,color:C.muted}}>5 nouvelles images aléatoires !</div>
      </div>
    );
  }

  return (
    <div style={{padding:"14px 16px",display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{flex:1,height:7,background:C.sand,borderRadius:99,overflow:"hidden"}}>
          <div style={{width:`${(idx/questions.length)*100}%`,height:"100%",background:`linear-gradient(90deg,${C.terracotta},${C.goldLight})`,transition:"width 0.4s"}}/>
        </div>
        <span style={{fontSize:11,color:C.muted,fontWeight:600}}>{idx+1}/5</span>
      </div>
      {/* Image / Emoji */}
      <div style={{background:C.cream,borderRadius:18,padding:"22px 18px",textAlign:"center",border:`2px solid ${C.sand}`,boxShadow:"0 3px 16px rgba(44,26,14,0.08)"}}>
        <div style={{fontSize:68,marginBottom:6}}>{q.emoji}</div>
        <div style={{fontFamily:"'Amiri',serif",fontSize:26,fontWeight:700,color:C.dark,direction:"rtl"}}>{q.word}</div>
        <div style={{fontSize:11,color:C.muted,marginTop:4}}>Choisis le bon mot — arabe · phonétique · français</div>
      </div>
      {/* Options */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {q.options.map((opt,i) => {
          let bg=C.cream,border=C.sand,colAr=C.dark,colPh=C.muted,colFr=C.muted;
          if (sel!==null){
            if(i===q.correct){bg=C.teal;border=C.teal;colAr="#fff";colPh="rgba(255,255,255,0.8)";colFr="rgba(255,255,255,0.7)";}
            else if(i===sel){bg=C.terracotta;border=C.terracotta;colAr="#fff";colPh="rgba(255,255,255,0.8)";colFr="rgba(255,255,255,0.7)";}
          }
          return(
            <button key={i} onClick={()=>choose(i)} disabled={sel!==null} style={{background:bg,border:`2px solid ${border}`,borderRadius:12,padding:"10px 8px",cursor:sel!==null?"default":"pointer",transition:"all 0.25s",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
              <div style={{fontSize:16,fontWeight:700,color:colAr,fontFamily:"'Amiri',serif",direction:"rtl"}}>
                {sel!==null&&i===q.correct?"✅ ":sel!==null&&i===sel&&i!==q.correct?"❌ ":""}{opt.ar}
              </div>
              <div style={{fontSize:11,fontWeight:600,color:colPh,fontFamily:"inherit"}}>{opt.ph}</div>
              {sel !== null && <div style={{fontSize:10,color:colFr,fontStyle:"italic"}}>{opt.fr}</div>}
            </button>
          );
        })}
      </div>
      <div style={{textAlign:"center",fontSize:12,color:C.muted}}>Score : <strong style={{color:C.teal}}>{score}</strong> pts 🌟</div>
    </div>
  );
}

// ─── CULTURE SESSION (5/50) ───────────────────────────────────────────────────
function CultureSession({ onDone }) {
  const [questions] = useState(() => pick(ALL_CULTURE, 5));
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[idx];

  const choose = (i) => {
    if (sel !== null) return;
    setSel(i);
    if (i === q.correct) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true);
      else { setIdx(c => c + 1); setSel(null); }
    }, 1200);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16,padding:"30px 20px"}}>
        <div style={{fontSize:64}}>{pct===100?"🏆":pct>=60?"🥈":"🎗️"}</div>
        <div style={{fontFamily:"'Amiri',serif",fontSize:22,fontWeight:700,color:C.teal,textAlign:"center"}}>{pct===100?"Expert culturel !":pct>=60?"Bien joué !":"Continue !"}</div>
        <div style={{fontSize:44,fontWeight:800,color:C.terracotta}}>{score}/{questions.length}</div>
        <div style={{width:"100%",height:10,background:C.sand,borderRadius:99,overflow:"hidden"}}>
          <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${C.teal},${C.goldLight})`,borderRadius:99}}/>
        </div>
        <button onClick={onDone} style={{background:`linear-gradient(135deg,${C.teal},${C.tealLight})`,color:"#fff",border:"none",borderRadius:14,padding:"13px 32px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Rejouer 🔄</button>
        <div style={{fontSize:12,color:C.muted}}>5 nouvelles questions de culture !</div>
      </div>
    );
  }

  return (
    <div style={{padding:"14px 16px",display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{flex:1,height:7,background:C.sand,borderRadius:99,overflow:"hidden"}}>
          <div style={{width:`${(idx/questions.length)*100}%`,height:"100%",background:`linear-gradient(90deg,${C.teal},${C.goldLight})`,transition:"width 0.4s"}}/>
        </div>
        <span style={{fontSize:11,color:C.muted,fontWeight:600}}>{idx+1}/5</span>
      </div>
      <div style={{background:C.cream,borderRadius:18,padding:"24px 18px",textAlign:"center",border:`2px solid ${C.sand}`,boxShadow:"0 3px 16px rgba(44,26,14,0.08)"}}>
        <div style={{fontSize:32,marginBottom:8}}>🇹🇳</div>
        <div style={{fontFamily:"'Amiri',serif",fontSize:17,fontWeight:700,color:C.dark,lineHeight:1.5}}>{q.q}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {q.options.map((opt,i) => {
          let bg=C.cream,border=C.sand,col=C.text;
          if (sel!==null){
            if(i===q.correct){bg=C.teal;border=C.teal;col="#fff";}
            else if(i===sel){bg=C.terracotta;border=C.terracotta;col="#fff";}
          }
          return(
            <button key={i} onClick={()=>choose(i)} disabled={sel!==null} style={{background:bg,border:`2px solid ${border}`,borderRadius:12,padding:"14px 16px",fontSize:14,fontWeight:600,color:col,cursor:sel!==null?"default":"pointer",transition:"all 0.25s",textAlign:"left",fontFamily:"inherit"}}>
              {sel!==null&&i===q.correct?"✅ ":sel!==null&&i===sel&&i!==q.correct?"❌ ":`${["A","B","C","D"][i]}. `}{opt}
            </button>
          );
        })}
      </div>
      <div style={{textAlign:"center",fontSize:12,color:C.muted}}>Score : <strong style={{color:C.teal}}>{score}</strong> pts 🌟</div>
    </div>
  );
}

// ─── SNAKE TUNISIEN ───────────────────────────────────────────────────────────
const GRID = 16;
const CELL = 22;

function SnakeGame({ onBack }) {
  const [snake, setSnake] = useState([[8,8],[8,7],[8,6]]);
  const [dir, setDir] = useState([0,1]);
  const [food, setFood] = useState([4,4]);
  const [score, setScore] = useState(0);
  const [alive, setAlive] = useState(true);
  const [started, setStarted] = useState(false);
  const [speed, setSpeed] = useState(220);
  const dirRef = useRef([0,1]);
  const snakeRef = useRef([[8,8],[8,7],[8,6]]);
  const foodRef = useRef([4,4]);
  const aliveRef = useRef(true);
  const scoreRef = useRef(0);

  const randomFood = useCallback((s) => {
    let f;
    do {
      f = [Math.floor(Math.random()*GRID), Math.floor(Math.random()*GRID)];
    } while (s.some(([r,c]) => r===f[0]&&c===f[1]));
    return f;
  }, []);

  const resetGame = () => {
    const initSnake = [[8,8],[8,7],[8,6]];
    const initDir = [0,1];
    const initFood = [4,4];
    setSnake(initSnake);
    setDir(initDir);
    setFood(initFood);
    setScore(0);
    setAlive(true);
    setStarted(false);
    setSpeed(220);
    dirRef.current = initDir;
    snakeRef.current = initSnake;
    foodRef.current = initFood;
    aliveRef.current = true;
    scoreRef.current = 0;
  };

  useEffect(() => {
    const handleKey = (e) => {
      const map = {
        ArrowUp:[-1,0], ArrowDown:[1,0], ArrowLeft:[0,-1], ArrowRight:[0,1],
        w:[-1,0], s:[1,0], a:[0,-1], d:[0,1]
      };
      const nd = map[e.key];
      if (!nd) return;
      const cur = dirRef.current;
      if (nd[0]===-cur[0]&&nd[1]===-cur[1]) return;
      dirRef.current = nd;
      setDir(nd);
      if (!started) setStarted(true);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [started]);

  useEffect(() => {
    if (!started || !aliveRef.current) return;
    const interval = setInterval(() => {
      const s = snakeRef.current;
      const d = dirRef.current;
      const head = [s[0][0]+d[0], s[0][1]+d[1]];
      if (head[0]<0||head[0]>=GRID||head[1]<0||head[1]>=GRID||s.some(([r,c])=>r===head[0]&&c===head[1])) {
        aliveRef.current = false;
        setAlive(false);
        return;
      }
      const f = foodRef.current;
      const ate = head[0]===f[0]&&head[1]===f[1];
      const newSnake = ate ? [head,...s] : [head,...s.slice(0,-1)];
      snakeRef.current = newSnake;
      setSnake([...newSnake]);
      if (ate) {
        const ns = scoreRef.current + 1;
        scoreRef.current = ns;
        setScore(ns);
        const nf = randomFood(newSnake);
        foodRef.current = nf;
        setFood(nf);
        setSpeed(prev => Math.max(80, prev - 8));
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, speed, randomFood]);

  const swipe = (dx, dy) => {
    const cur = dirRef.current;
    let nd = null;
    if (Math.abs(dx) > Math.abs(dy)) nd = dx > 0 ? [0,1] : [0,-1];
    else nd = dy > 0 ? [1,0] : [-1,0];
    if (nd[0]===-cur[0]&&nd[1]===-cur[1]) return;
    dirRef.current = nd;
    setDir(nd);
    if (!started) setStarted(true);
  };

  const touchStart = useRef(null);
  const onTouchStart = (e) => { touchStart.current = [e.touches[0].clientX, e.touches[0].clientY]; };
  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current[0];
    const dy = e.changedTouches[0].clientY - touchStart.current[1];
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
    swipe(dx, dy);
    touchStart.current = null;
  };

  const gridSize = GRID * CELL;
  const headDir = dirRef.current;
  const headPos = snake[0];

  // Visage bonhomme selon direction
  const face = headDir[1]===1?"😄":headDir[1]===-1?"😄":headDir[0]===-1?"😄":"😄";

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"14px 16px",gap:12}}>
      {/* Header score */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"}}>
        <button onClick={onBack} style={{background:C.sand,border:"none",borderRadius:10,padding:"6px 12px",fontSize:13,cursor:"pointer",fontWeight:700,color:C.text}}>← Retour</button>
        <div style={{fontFamily:"'Amiri',serif",fontSize:16,fontWeight:700,color:C.terracotta}}>🌶️ Score : {score}</div>
        <button onClick={resetGame} style={{background:C.sand,border:"none",borderRadius:10,padding:"6px 12px",fontSize:13,cursor:"pointer",fontWeight:700,color:C.text}}>↺ Reset</button>
      </div>

      {/* Plateau de jeu */}
      <div
        style={{position:"relative",width:gridSize,height:gridSize,background:"#1a3a2a",borderRadius:12,overflow:"hidden",border:`3px solid ${C.teal}`,boxShadow:`0 0 20px ${C.teal}55`,flexShrink:0}}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Grille légère */}
        {Array.from({length:GRID}).map((_,r)=>Array.from({length:GRID}).map((_,c)=>(
          <div key={`${r}-${c}`} style={{position:"absolute",left:c*CELL,top:r*CELL,width:CELL,height:CELL,borderRight:"1px solid rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,255,255,0.04)"}}/>
        )))}

        {/* Nourriture (harissa) */}
        <div style={{position:"absolute",left:food[1]*CELL,top:food[0]*CELL,width:CELL,height:CELL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:CELL-4,lineHeight:1,transition:"left 0.1s,top 0.1s"}}>🌶️</div>

        {/* Snake */}
        {snake.map(([r,c],i) => {
          const isHead = i===0;
          return (
            <div key={i} style={{
              position:"absolute",
              left:c*CELL+1,top:r*CELL+1,
              width:CELL-2,height:CELL-2,
              borderRadius:isHead?8:5,
              background:isHead?`linear-gradient(135deg,${C.gold},${C.goldLight})`:`linear-gradient(135deg,${C.terracotta},${C.terracottaLight})`,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:isHead?CELL-6:CELL-10,
              boxShadow:isHead?`0 2px 8px ${C.gold}88`:"none",
              zIndex:isHead?2:1,
            }}>
              {isHead ? "👳" : ""}
            </div>
          );
        })}

        {/* Overlay démarrage */}
        {!started && alive && (
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.65)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,borderRadius:12}}>
            <div style={{fontSize:40}}>👳</div>
            <div style={{color:"#fff",fontFamily:"'Amiri',serif",fontSize:17,fontWeight:700,textAlign:"center"}}>Hamdoullah !</div>
            <div style={{color:"rgba(255,255,255,0.8)",fontSize:12,textAlign:"center",padding:"0 20px"}}>Swipe ou flèches pour jouer</div>
            <div style={{color:C.goldLight,fontSize:12,fontWeight:700}}>Mange les 🌶️ harissas !</div>
          </div>
        )}

        {/* Game over */}
        {!alive && (
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,borderRadius:12}}>
            <div style={{fontSize:48}}>💀</div>
            <div style={{color:"#fff",fontFamily:"'Amiri',serif",fontSize:20,fontWeight:700}}>Ya latif !</div>
            <div style={{color:C.goldLight,fontSize:28,fontWeight:800}}>{score} 🌶️</div>
            <button onClick={resetGame} style={{background:`linear-gradient(135deg,${C.terracotta},${C.terracottaLight})`,color:"#fff",border:"none",borderRadius:12,padding:"12px 28px",fontSize:15,fontWeight:700,cursor:"pointer",marginTop:4}}>Rejouer 🔄</button>
          </div>
        )}
      </div>

      {/* Contrôles tactiles */}
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
        <button onClick={()=>swipe(0,-10)} style={btnStyle}>↑</button>
        <div style={{display:"flex",gap:4}}>
          <button onClick={()=>swipe(-10,0)} style={btnStyle}>←</button>
          <div style={{width:44,height:44}}/>
          <button onClick={()=>swipe(10,0)} style={btnStyle}>→</button>
        </div>
        <button onClick={()=>swipe(0,10)} style={btnStyle}>↓</button>
      </div>

      <div style={{fontSize:11,color:C.muted,textAlign:"center"}}>Flèches clavier ou swipe sur mobile · Score record : {score} 🌶️</div>
    </div>
  );
}

const btnStyle = {
  width:44,height:44,borderRadius:10,border:`2px solid ${C.sand}`,
  background:C.cream,fontSize:18,cursor:"pointer",fontWeight:700,
  color:C.terracotta,display:"flex",alignItems:"center",justifyContent:"center",
  boxShadow:"0 2px 6px rgba(0,0,0,0.1)"
};

// ─── MENU JEUX ───────────────────────────────────────────────────────────────
function GamesMenu({ onSelect }) {
  const games = [
    {id:'word-quiz', icon:"🎯", label:"Quiz Mots", desc:`5 questions parmi ${ALL_QUIZ.length} — trouve la traduction !`, color:["#7c3aed","#a78bfa"]},
    {id:'image-quiz', icon:"🖼️", label:"Quiz Images", desc:`5 images parmi ${ALL_IMAGE_QUIZ.length} — reconnais le mot en arabe !`, color:["#c0522a","#e8784d"]},
    {id:'culture', icon:"🇹🇳", label:"Culture Tunisienne", desc:`5 questions parmi ${ALL_CULTURE.length} sur l'histoire, la cuisine et la culture !`, color:["#1a7a6e","#2aa89a"]},
    {id:'snake', icon:"👳", label:"Snake Tunisien", desc:`Dirige le bonhomme tunisien pour manger les 🌶️ harissas !`, color:["#d4900a","#f0b429"]},
  ];
  return (
    <div style={{padding:"16px 14px",display:"flex",flexDirection:"column",gap:14}}>
      <div style={{fontFamily:"'Amiri',serif",fontSize:19,fontWeight:700,color:C.gold}}>🎮 Choisir un jeu</div>
      {games.map(g => (
        <div
          key={g.id}
          onClick={() => onSelect(g.id)}
          style={{cursor:"pointer",background:`linear-gradient(135deg,${g.color[0]},${g.color[1]})`,borderRadius:18,padding:"18px 16px",display:"flex",alignItems:"center",gap:14,boxShadow:`0 4px 18px ${g.color[0]}44`,transition:"transform 0.15s"}}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
        >
          <div style={{fontSize:42,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.3))"}}>{g.icon}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:17,fontWeight:700,color:"#fff"}}>{g.label}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.8)",marginTop:3,lineHeight:1.4}}>{g.desc}</div>
          </div>
          <div style={{fontSize:22,color:"rgba(255,255,255,0.7)"}}>▶</div>
        </div>
      ))}
    </div>
  );
}

// ─── SESSION QUIZ MOTS (ancien, conservé) ────────────────────────────────────
function QuizSession({ onDone }) {
  const [questions] = useState(() => pick(ALL_QUIZ, 5));
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[idx];

  const choose = (i) => {
    if (sel !== null) return;
    setSel(i);
    if (i === q.correct) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true);
      else { setIdx(c => c + 1); setSel(null); }
    }, 1100);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16,padding:"30px 20px"}}>
        <div style={{fontSize:64}}>{pct===100?"🏆":pct>=60?"🥈":"🎗️"}</div>
        <div style={{fontFamily:"'Amiri',serif",fontSize:22,fontWeight:700,color:C.terracotta,textAlign:"center"}}>{pct===100?"Parfait !":pct>=60?"Bien joué !":"Continue !"}</div>
        <div style={{fontSize:44,fontWeight:800,color:C.teal}}>{score}/{questions.length}</div>
        <div style={{width:"100%",height:10,background:C.sand,borderRadius:99,overflow:"hidden"}}>
          <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${C.terracotta},${C.goldLight})`,borderRadius:99}}/>
        </div>
        <button onClick={onDone} style={{background:`linear-gradient(135deg,${C.terracotta},${C.terracottaLight})`,color:"#fff",border:"none",borderRadius:14,padding:"13px 32px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Rejouer 🔄</button>
        <div style={{fontSize:12,color:C.muted}}>5 nouvelles questions aléatoires à chaque fois !</div>
      </div>
    );
  }

  return (
    <div style={{padding:"14px 16px",display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{flex:1,height:7,background:C.sand,borderRadius:99,overflow:"hidden"}}>
          <div style={{width:`${(idx/questions.length)*100}%`,height:"100%",background:`linear-gradient(90deg,${C.terracotta},${C.goldLight})`,transition:"width 0.4s"}}/>
        </div>
        <span style={{fontSize:11,color:C.muted,fontWeight:600}}>{idx+1}/5</span>
      </div>
      <div style={{background:C.cream,borderRadius:18,padding:"24px 18px",textAlign:"center",border:`2px solid ${C.sand}`,boxShadow:"0 3px 16px rgba(44,26,14,0.08)"}}>
        <div style={{fontFamily:"'Amiri',serif",fontSize:18,fontWeight:700,color:C.dark,lineHeight:1.5}}>{q.q}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {q.options.map((opt,i) => {
          let bg=C.cream,border=C.sand,col=C.text;
          if (sel!==null){
            if(i===q.correct){bg=C.teal;border=C.teal;col="#fff";}
            else if(i===sel){bg=C.terracotta;border=C.terracotta;col="#fff";}
          }
          return(
            <button key={i} onClick={()=>choose(i)} disabled={sel!==null} style={{background:bg,border:`2px solid ${border}`,borderRadius:12,padding:"14px 16px",fontSize:14,fontWeight:600,color:col,cursor:sel!==null?"default":"pointer",transition:"all 0.25s",textAlign:"left",fontFamily:"inherit"}}>
              {sel!==null&&i===q.correct?"✅ ":sel!==null&&i===sel&&i!==q.correct?"❌ ":`${["A","B","C","D"][i]}. `}{opt}
            </button>
          );
        })}
      </div>
      <div style={{textAlign:"center",fontSize:12,color:C.muted}}>Score : <strong style={{color:C.teal}}>{score}</strong> pts 🌟</div>
    </div>
  );
}

// ─── SESSION JEU (5 phrases) ─────────────────────────────────────────────────
function GameSession({ onDone }) {
  const [questions] = useState(() => pick(ALL_GAMES, 5));
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[idx];

  const choose = (opt) => {
    if (sel) return;
    setSel(opt);
    const ok = opt === q.answer;
    if (ok) {
      setScore(s => s+1);
      const ns = streak+1;
      setStreak(ns);
      if (ns>bestStreak) setBestStreak(ns);
    } else setStreak(0);
    setTimeout(() => {
      if (idx+1>=questions.length) setDone(true);
      else { setIdx(i=>i+1); setSel(null); }
    }, 1300);
  };

  if (done) {
    const pct = Math.round((score/questions.length)*100);
    return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16,padding:"30px 20px"}}>
        <div style={{fontSize:64}}>{pct===100?"🏆":pct>=60?"🥈":"🎗️"}</div>
        <div style={{fontFamily:"'Amiri',serif",fontSize:22,fontWeight:700,color:C.teal,textAlign:"center"}}>{pct===100?"Parfait !":pct>=60?"Bien joué !":"Continue !"}</div>
        <div style={{fontSize:44,fontWeight:800,color:C.terracotta}}>{score}/{questions.length}</div>
        <div style={{background:C.sand,borderRadius:12,padding:"10px 18px",fontSize:13,color:C.text}}>🔥 Meilleure série : <strong>{bestStreak}</strong></div>
        <div style={{width:"100%",height:10,background:C.sand,borderRadius:99,overflow:"hidden"}}>
          <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${C.teal},${C.goldLight})`,borderRadius:99}}/>
        </div>
        <button onClick={onDone} style={{background:`linear-gradient(135deg,${C.teal},${C.tealLight})`,color:"#fff",border:"none",borderRadius:14,padding:"13px 32px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Rejouer 🔄</button>
        <div style={{fontSize:12,color:C.muted}}>5 nouvelles phrases aléatoires à chaque fois !</div>
      </div>
    );
  }

  const parts = q.sentence.split('___');
  return (
    <div style={{padding:"14px 16px",display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <div style={{flex:1,height:7,background:C.sand,borderRadius:99,overflow:"hidden"}}>
          <div style={{width:`${(idx/questions.length)*100}%`,height:"100%",background:`linear-gradient(90deg,${C.teal},${C.goldLight})`,transition:"width 0.4s"}}/>
        </div>
        <span style={{fontSize:11,color:C.muted,fontWeight:600}}>{idx+1}/5</span>
        {streak>=2&&<span style={{fontSize:12,color:C.gold,fontWeight:700}}>🔥{streak}</span>}
      </div>
      <div style={{background:C.cream,borderRadius:18,padding:"20px 16px",border:`2px solid ${C.sand}`,boxShadow:"0 3px 16px rgba(44,26,14,0.08)"}}>
        <div style={{fontSize:11,color:C.muted,marginBottom:12,fontWeight:600}}>📝 Complète la phrase :</div>
        <div style={{fontSize:16,lineHeight:2,color:C.dark,fontFamily:"'Amiri',serif",textAlign:"center"}}>
          {parts[0]}
          <span style={{display:"inline-block",minWidth:90,padding:"2px 14px",background:sel?(sel===q.answer?C.teal:C.terracotta):C.sand,color:sel?"#fff":C.muted,borderRadius:8,fontWeight:700,transition:"all 0.3s",verticalAlign:"middle",fontSize:15,margin:"0 4px"}}>
            {sel || " ___ "}
          </span>
          {parts[1]}
        </div>
        <div style={{fontSize:11,color:C.muted,marginTop:10,textAlign:"center",fontStyle:"italic"}}>💡 {q.hint}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {q.options.map((opt,i) => {
          let bg=C.cream,border=C.sand,col=C.text;
          if(sel){
            if(opt===q.answer){bg=C.teal;border=C.teal;col="#fff";}
            else if(opt===sel){bg=C.terracotta;border=C.terracotta;col="#fff";}
          }
          return(
            <button key={i} onClick={()=>choose(opt)} disabled={!!sel} style={{background:bg,border:`2px solid ${border}`,borderRadius:14,padding:"14px 8px",fontSize:13,fontWeight:700,color:col,cursor:sel?"default":"pointer",transition:"all 0.25s",fontFamily:"'Amiri',serif",textAlign:"center",lineHeight:1.3}}>
              {sel&&opt===q.answer?"✅ ":sel&&opt===sel&&opt!==q.answer?"❌ ":""}
              {opt}
            </button>
          );
        })}
      </div>
      <div style={{textAlign:"center",fontSize:12,color:C.muted}}>
        Score : <strong style={{color:C.teal}}>{score}</strong> · Série : <strong style={{color:C.gold}}>{streak}🔥</strong>
      </div>
    </div>
  );
}

// ─── BARRE & PAGE DE TRADUCTION ──────────────────────────────────────────────
function TranslationBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (trimmed.length < 1) return;
    onSearch(trimmed);
    setInput("");
  };

  return (
    <div style={{background:`linear-gradient(135deg,${C.teal},#0d5c52)`,padding:"14px 14px",flexShrink:0}}>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <div style={{flex:1,display:"flex",alignItems:"center",background:"rgba(255,255,255,0.15)",borderRadius:12,padding:"0 12px",gap:8}}>
          <span style={{fontSize:15}}>🔤</span>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="Traduire un mot ou une phrase en tunisien…"
            style={{flex:1,background:"transparent",border:"none",outline:"none",fontSize:14,color:"#fff",padding:"12px 0",fontFamily:"inherit"}}
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={input.trim().length === 0}
          style={{background:input.trim().length>0?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.1)",border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:10,padding:"8px 14px",color:"#fff",fontSize:13,fontWeight:700,cursor:input.trim().length>0?"pointer":"default",fontFamily:"inherit",transition:"all 0.2s",whiteSpace:"nowrap"}}
        >
          Traduire →
        </button>
      </div>
    </div>
  );
}

function TranslationSpeakBtn({ arabic, phonetic }) {
  const [speaking, setSpeaking] = useState(false);
  const handleClick = () => {
    // On parle le texte phonétique (arabizi) si dispo, sinon le script arabe directement
    const toSpeak = phonetic || arabic;
    speakTunisian(toSpeak, () => setSpeaking(true), () => setSpeaking(false));
  };
  return (
    <button
      onClick={handleClick}
      title="Écouter la prononciation"
      style={{
        flexShrink:0,
        background: speaking
          ? `linear-gradient(135deg,${C.terracotta},${C.sand})`
          : `linear-gradient(135deg,${C.gold},${C.goldLight})`,
        border:"none", borderRadius:12, width:44, height:44,
        display:"flex", alignItems:"center", justifyContent:"center",
        cursor:"pointer", boxShadow:"0 2px 8px rgba(212,144,10,0.35)",
        fontSize:20, transition:"all 0.2s",
        animation: speaking ? "pulse 0.8s infinite alternate" : "none",
      }}
      onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"}
      onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
    >
      {speaking ? "🔈" : "🔊"}
    </button>
  );
}

function TranslationPage({ query, onBack }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setResult(null);
    setError(null);

    const prompt = `Tu es un locuteur natif du dialecte tunisien (darija tunisienne), né et élevé à Tunis.
Tu parles le tunisien tel qu'il est réellement parlé dans la rue, avec ses emprunts au français, à l'italien et au berbère.
L'utilisateur veut traduire ce mot/expression du français vers le tunisien parlé : "${query}"

Règles IMPORTANTES pour la transcription phonétique :
- Utilise les chiffres arabes comme en SMS tunisien : 3=ع, 9=ق, 7=ح, 2=ء
- Retranscris exactement la prononciation orale (ex: "chnou" pas "chnowa", "yezzi" pas "yekfi", "barcha" pas "beaucoup")
- Si un mot français est couramment utilisé tel quel en tunisien (ex: "voiture" → "karhba" mais aussi "tomobil"), mentionne les variantes
- Privilégie la forme orale/familière plutôt que la forme littéraire
- L'exemple doit sonner comme une vraie conversation tunisienne, naturelle et spontanée

Réponds UNIQUEMENT avec un objet JSON valide, sans aucun texte avant ou après, sans backticks, exactement dans ce format :
{
  "french": "le mot en français tel qu'il a été demandé",
  "phonetic": "la transcription phonétique latine du tunisien oral (avec 3, 9, 7, 2...)",
  "arabic": "le mot en lettres arabes tunisiennes",
  "example_phonetic": "une phrase d'exemple en tunisien parlé, naturelle et familière",
  "example_french": "traduction française de cette phrase",
  "tip": "une note sur l'usage réel : variantes régionales, registre (familier/formel), origine du mot, etc. (max 1-2 phrases)"
}

Si le mot n'existe pas directement en tunisien, utilise l'équivalent le plus naturel dans la langue parlée.`;

    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "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",
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    })
    .then(async r => {
      const raw = await r.text();
      console.log("STATUS:", r.status);
      console.log("RAW RESPONSE:", raw);
      return raw;
    })
    .then(raw => {
      const data = JSON.parse(raw);
      if (data.error) {
        console.log("API ERROR:", data.error.message);
        setError("Erreur API : " + data.error.message);
        setLoading(false);
        return;
      }
      const text = data.content?.find(b => b.type === "text")?.text || "";
      console.log("TEXT:", text);
      const clean = text.replace(/```json|```/g, "").trim();
      const jsonStart = clean.indexOf('{');
      const jsonEnd = clean.lastIndexOf('}');
      const jsonStr = clean.slice(jsonStart, jsonEnd + 1);
      const parsed = JSON.parse(jsonStr);
      setResult(parsed);
      setLoading(false);
    })
    .catch(err => {
      console.log("CATCH ERROR:", err.message);
      setError("Erreur : " + err.message);
      setLoading(false);
    });
  }, [query]);

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:C.bg,maxWidth:480,margin:"0 auto"}}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${C.teal},#0d5c52)`,padding:"0 0 14px",flexShrink:0}}>
        <MosaicBorder/>
        <div style={{padding:"12px 16px 0",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:10,padding:"6px 12px",color:"#fff",fontSize:16,cursor:"pointer",fontWeight:700}}>←</button>
          <div>
            <div style={{fontFamily:"'Amiri',serif",fontSize:17,fontWeight:700,color:"#fff"}}>🔤 Traduction</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.75)"}}>Français → Tunisien</div>
          </div>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px",display:"flex",flexDirection:"column",gap:16}}>
        {/* Mot cherché */}
        <div style={{background:`linear-gradient(135deg,${C.teal}22,${C.teal}11)`,border:`2px solid ${C.teal}44`,borderRadius:16,padding:"14px 18px",textAlign:"center"}}>
          <div style={{fontSize:11,color:C.teal,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Vous avez demandé</div>
          <div style={{fontSize:22,fontWeight:800,color:C.dark,fontFamily:"'Amiri',serif"}}>{query}</div>
        </div>

        {loading && (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14,padding:"30px 0"}}>
            <div style={{fontSize:40,animation:"spin 1.2s linear infinite"}}>🔄</div>
            <div style={{fontSize:14,color:C.muted,fontWeight:600}}>Traduction en cours…</div>
            <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
          </div>
        )}

        {error && (
          <div style={{background:"#fff0f0",border:"2px solid #ffb3b3",borderRadius:14,padding:"18px",textAlign:"center",color:C.terracotta,fontSize:14,fontWeight:600}}>
            {error}
          </div>
        )}

        {result && !loading && (
          <>
            {/* Phonétique */}
            <div style={{background:C.cream,border:`2px solid ${C.terracotta}44`,borderRadius:16,padding:"18px 20px",boxShadow:"0 3px 16px rgba(44,26,14,0.08)"}}>
              <div style={{fontSize:10,color:C.terracotta,fontWeight:800,textTransform:"uppercase",letterSpacing:1.2,marginBottom:8}}>🔤 Phonétique (latin)</div>
              <div style={{fontSize:28,fontWeight:800,color:C.terracotta,fontFamily:"'Amiri',serif",letterSpacing:0.5}}>{result.phonetic}</div>
            </div>

            {/* Arabe */}
            <div style={{background:C.cream,border:`2px solid ${C.gold}55`,borderRadius:16,padding:"18px 20px",boxShadow:"0 3px 16px rgba(44,26,14,0.08)"}}>
              <div style={{fontSize:10,color:C.gold,fontWeight:800,textTransform:"uppercase",letterSpacing:1.2,marginBottom:8}}>🌙 En arabe</div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <TranslationSpeakBtn arabic={result.arabic} phonetic={result.phonetic} />
                <div style={{flex:1,fontSize:34,fontWeight:700,color:C.dark,fontFamily:"'Amiri',serif",direction:"rtl",textAlign:"right",lineHeight:1.5}}>{result.arabic}</div>
              </div>
            </div>

            {/* Exemple */}
            <div style={{background:`linear-gradient(135deg,${C.teal}18,${C.tealLight}10)`,border:`2px solid ${C.teal}33`,borderRadius:16,padding:"16px 18px"}}>
              <div style={{fontSize:10,color:C.teal,fontWeight:800,textTransform:"uppercase",letterSpacing:1.2,marginBottom:10}}>💬 Exemple</div>
              <div style={{fontSize:15,fontWeight:700,color:C.dark,fontFamily:"'Amiri',serif",marginBottom:6}}>"{result.example_phonetic}"</div>
              <div style={{fontSize:13,color:C.muted,fontStyle:"italic"}}>→ {result.example_french}</div>
            </div>

            {/* Astuce */}
            {result.tip && (
              <div style={{background:`linear-gradient(135deg,${C.gold}18,${C.goldLight}10)`,border:`2px solid ${C.gold}44`,borderRadius:14,padding:"14px 16px",display:"flex",gap:10,alignItems:"flex-start"}}>
                <span style={{fontSize:18,flexShrink:0}}>💡</span>
                <div style={{fontSize:12,color:C.text,lineHeight:1.6}}>{result.tip}</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── PAGE MONNAIE ─────────────────────────────────────────────────────────────

// Conversion d'un nombre entier en arabe phonétique tunisien
function numberToPhonetic(n) {
  n = Math.round(n);
  if (isNaN(n) || n === 0) return 'sifr';

  const ones = ['','wa7ed','zouz','tleta','arb3a','7amsa','setta','sab3a','thmanya','tsa3','3achra'];
  const teens = ['3achra','7da3ch','tnach','tlatt3ch','arb3att3ch','7amst3ch','sett3ch','sab3att3ch','thmantach','tsa3tt3ch'];
  const tens = ['','3achra','3achrin','tlatin','arb3in','7amsin','settin','sab3in','thmanin','tsa3in'];
  const hundreds = ['','mia','miatayn','tlett mia','arb3 mia','7amt mia','sett mia','sab3 mia','thment mia','tsa3 mia'];

  function convertBelow1000(n) {
    if (n === 0) return '';
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    const t = Math.floor(n / 10), o = n % 10;
    return o > 0 ? `${ones[o]} w ${tens[t]}` : tens[t];
  }

  function convert(n) {
    if (n === 0) return 'sifr';
    let result = '';
    if (n >= 1000) {
      const k = Math.floor(n / 1000);
      result += (k === 1 ? 'alf' : k === 2 ? 'alfayn' : `${convertBelow1000(k)} alf`) + ' ';
      n %= 1000;
    }
    if (n >= 100) {
      result += hundreds[Math.floor(n / 100)] + ' ';
      n %= 100;
    }
    if (n > 0) result += convertBelow1000(n);
    return result.trim();
  }

  return convert(n) || 'sifr';
}

function MonnaieApp() {
  const [amount, setAmount] = useState('');
  const [direction, setDirection] = useState('EUR_TO_TND'); // 'EUR_TO_TND' | 'TND_TO_EUR'
  const [rate, setRate] = useState(null);
  const [rateLoading, setRateLoading] = useState(true);
  const [rateError, setRateError] = useState(false);
  const [rateUpdated, setRateUpdated] = useState(null);

  useEffect(() => {
    setRateLoading(true);
    setRateError(false);
    fetch('https://api.frankfurter.app/latest?from=EUR&to=TND')
      .then(r => r.json())
      .then(data => {
        setRate(data.rates.TND);
        setRateUpdated(data.date);
        setRateLoading(false);
      })
      .catch(() => {
        setRate(3.37); // fallback
        setRateError(true);
        setRateLoading(false);
      });
  }, []);

  const num = parseFloat(amount) || 0;
  const isEurToTnd = direction === 'EUR_TO_TND';
  const converted = rate ? (isEurToTnd ? num * rate : num / rate) : null;
  const convertedDisplay = converted !== null ? converted.toFixed(isEurToTnd ? 3 : 2) : '…';
  const phoneticInput = num > 0 ? numberToPhonetic(Math.round(num)) : '';
  const phoneticResult = converted !== null ? numberToPhonetic(Math.round(converted)) : '';

  const fromLabel = isEurToTnd ? 'EUR 🇫🇷' : 'TND 🇹🇳';
  const toLabel   = isEurToTnd ? 'TND 🇹🇳' : 'EUR 🇫🇷';
  const fromName  = isEurToTnd ? '"Yoro"' : '"Dinar Tounsi"';
  const toName    = isEurToTnd ? '"Dinar Tounsi"' : '"Yoro"';

  return (
    <div style={{padding:"14px",display:"flex",flexDirection:"column",gap:14}}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:18,padding:"16px",textAlign:"center",boxShadow:`0 4px 18px ${C.gold}44`}}>
        <div style={{fontFamily:"'Amiri',serif",fontSize:21,fontWeight:700,color:"#fff",marginBottom:2}}>💰 Convertisseur</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.85)"}}>Euro ⇄ Dinar Tounsi</div>
      </div>

      {/* Taux actuel */}
      <div style={{background:C.cream,borderRadius:14,padding:"12px 16px",border:`2px solid ${C.sand}`}}>
        <div style={{fontSize:11,color:C.muted,fontWeight:700,marginBottom:2}}>📈 Taux actuel</div>
        {rateLoading
          ? <div style={{fontSize:13,color:C.muted}}>Chargement…</div>
          : <div style={{fontSize:16,fontWeight:800,color:C.terracotta}}>
              1 EUR = {rate?.toFixed(4)} TND
            </div>
        }
        {!rateLoading && !rateError && <div style={{fontSize:10,color:C.muted,fontStyle:"italic",marginTop:2}}>
          Mis à jour : {rateUpdated}
        </div>}
      </div>

      {/* Convertisseur */}
      <div style={{background:C.cream,borderRadius:16,border:`2px solid ${C.sand}`,overflow:"hidden"}}>
        {/* Champ de saisie */}
        <div style={{padding:"16px 16px 12px"}}>
          <div style={{fontSize:11,color:C.muted,fontWeight:700,marginBottom:6}}>{fromLabel} — {fromName}</div>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            min="0"
            placeholder="0"
            style={{width:"100%",fontSize:36,fontWeight:800,color:C.terracotta,border:"none",outline:"none",background:"transparent",fontFamily:"inherit",boxSizing:"border-box"}}
          />
          {num > 0 && <div style={{fontSize:12,color:C.terracotta,fontStyle:"italic",marginTop:2,opacity:0.75}}>"{phoneticInput}"</div>}
        </div>

        {/* Bouton intervertir */}
        <div style={{display:"flex",alignItems:"center",padding:"0 16px",gap:10}}>
          <div style={{flex:1,height:1,background:C.sand}}/>
          <button
            onClick={() => setDirection(d => d === 'EUR_TO_TND' ? 'TND_TO_EUR' : 'EUR_TO_TND')}
            style={{background:`linear-gradient(135deg,${C.terracotta},${C.terracottaLight})`,border:"none",borderRadius:999,width:38,height:38,fontSize:18,cursor:"pointer",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 3px 10px ${C.terracotta}55`,flexShrink:0}}
          >⇅</button>
          <div style={{flex:1,height:1,background:C.sand}}/>
        </div>

        {/* Résultat */}
        <div style={{padding:"12px 16px 16px"}}>
          <div style={{fontSize:11,color:C.muted,fontWeight:700,marginBottom:6}}>{toLabel} — {toName}</div>
          <div style={{fontSize:36,fontWeight:800,color:C.teal}}>{convertedDisplay}</div>
          {converted !== null && num > 0 && <div style={{fontSize:12,color:C.teal,fontStyle:"italic",marginTop:2,opacity:0.75}}>"{phoneticResult}"</div>}
        </div>
      </div>

      {/* Note BCT */}
      <div style={{background:`${C.gold}22`,borderRadius:12,padding:"10px 14px",border:`1px solid ${C.gold}55`}}>
        <div style={{fontSize:11,color:C.muted,lineHeight:1.6}}>⚠️ Taux fourni par Frankfurter API (BCE). Consultez la BCT — "El bank el markezi ettounsi" — pour le taux officiel.</div>
      </div>
    </div>
  );
}

// ─── APP PRINCIPALE ──────────────────────────────────────────────────────────
export default function TunisianApp() {
  const [page, setPage] = useState('home');
  const [gameMode, setGameMode] = useState(null); // null | 'image-quiz' | 'culture' | 'snake'
  const [search, setSearch] = useState("");
  const [quizKey, setQuizKey] = useState(0);
  const [gameKey, setGameKey] = useState(0);
  const [imageQuizKey, setImageQuizKey] = useState(0);
  const [cultureKey, setCultureKey] = useState(0);
  const [translationQuery, setTranslationQuery] = useState(null);

  const allCats = useMemo(() => [...new Set(VOCABULARY.map(v => v.cat1))].sort(), []);
  const catCounts = useMemo(() => {
    const m = {};
    VOCABULARY.forEach(v => { m[v.cat1] = (m[v.cat1]||0)+1; });
    return m;
  }, []);

  const searchResults = useMemo(() =>
    search.length > 1 ? VOCABULARY.filter(v =>
      v.tunisian.toLowerCase().includes(search.toLowerCase()) ||
      v.french.toLowerCase().includes(search.toLowerCase())
    ) : [],
  [search]);

  const tabs = [
    {id:'home', label:'Accueil', icon:'🏠'},
    {id:'monnaie', label:'Monnaie', icon:'💰'},
    {id:'jeux', label:'Jeux', icon:'🎮'},
  ];

  const currentTab = typeof page === 'string' ? page : 'home';

  // Page traduction IA
  if (translationQuery) {
    return (
      <TranslationPage
        query={translationQuery}
        onBack={() => setTranslationQuery(null)}
      />
    );
  }

  if (page && page.type === 'cat') {
    return (
      <div style={{height:"100vh",background:C.bg,maxWidth:480,margin:"0 auto",fontFamily:"'DM Sans','Segoe UI',sans-serif",display:"flex",flexDirection:"column",color:C.text,overflow:"hidden"}}>
        <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <div style={{flex:1,overflowY:"auto",overflowX:"hidden"}}>
          <CategoryPage
            cat={page.cat}
            colorPair={CAT_COLORS[page.colorIdx % CAT_COLORS.length]}
            onBack={() => setPage('home')}
          />
        </div>
        {/* ── Barre de navigation ── */}
        <div style={{flexShrink:0,background:C.cream,borderTop:`2px solid ${C.sand}`,boxShadow:"0 -3px 20px rgba(44,26,14,0.09)"}}>
          <MosaicBorder/>
          <div style={{display:"flex"}}>
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => { setPage(t.id); setSearch(""); setGameMode(null); }}
                style={{flex:1,padding:"9px 4px 11px",background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}
              >
                <div style={{fontSize:22,filter:currentTab===t.id?"none":"grayscale(1) opacity(0.4)"}}>{t.icon}</div>
                <div style={{fontSize:10,fontWeight:700,color:currentTab===t.id?C.terracotta:C.muted}}>{t.label}</div>
                {currentTab===t.id && <div style={{width:22,height:3,background:C.terracotta,borderRadius:99}}/>}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Page Snake (plein écran)
  if (page === 'jeux' && gameMode === 'snake') {
    return (
      <div style={{height:"100vh",background:"#0d2018",maxWidth:480,margin:"0 auto",fontFamily:"'DM Sans','Segoe UI',sans-serif",display:"flex",flexDirection:"column",color:C.text,overflow:"hidden"}}>
        <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <div style={{background:`linear-gradient(135deg,${C.gold},#a06800)`,padding:"10px 18px 8px",flexShrink:0}}>
          <MosaicBorder/>
          <div style={{paddingTop:6,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{fontFamily:"'Amiri',serif",fontSize:17,fontWeight:700,color:"#fff"}}>🌶️ Snake Tunisien</div>
            <button onClick={()=>setGameMode(null)} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:10,padding:"5px 12px",color:"#fff",fontSize:12,cursor:"pointer",fontWeight:700}}>← Jeux</button>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",background:"#0d2018"}}>
          <SnakeGame onBack={()=>setGameMode(null)}/>
        </div>
        {/* ── Barre de navigation ── */}
        <div style={{flexShrink:0,background:C.cream,borderTop:`2px solid ${C.sand}`,boxShadow:"0 -3px 20px rgba(44,26,14,0.09)"}}>
          <MosaicBorder/>
          <div style={{display:"flex"}}>
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => { setPage(t.id); setSearch(""); setGameMode(null); }}
                style={{flex:1,padding:"9px 4px 11px",background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}
              >
                <div style={{fontSize:22,filter:currentTab===t.id?"none":"grayscale(1) opacity(0.4)"}}>{t.icon}</div>
                <div style={{fontSize:10,fontWeight:700,color:currentTab===t.id?C.terracotta:C.muted}}>{t.label}</div>
                {currentTab===t.id && <div style={{width:22,height:3,background:C.terracotta,borderRadius:99}}/>}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{height:"100vh",background:C.bg,maxWidth:480,margin:"0 auto",fontFamily:"'DM Sans','Segoe UI',sans-serif",display:"flex",flexDirection:"column",color:C.text,overflow:"hidden"}}>
      <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>

      {/* ── Header ── */}
      <div style={{background:`linear-gradient(135deg,${C.terracotta},#a03820)`,padding:"10px 18px 10px",flexShrink:0}}>
        <MosaicBorder/>
        <div style={{paddingTop:8,display:"flex",alignItems:"center",gap:12}}>
          <img
            src="data:image/png;base64,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"
            alt="logo"
            style={{width:54,height:54,borderRadius:14,objectFit:"cover",boxShadow:"0 3px 12px rgba(0,0,0,0.3)",flexShrink:0}}
          />
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Amiri',serif",fontSize:20,fontWeight:700,color:"#fff"}}>تعلّم التونسي</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.75)",marginTop:1}}>Apprendre le Tunisien</div>
          </div>
          <div style={{background:"rgba(255,255,255,0.15)",borderRadius:12,padding:"5px 12px",fontSize:11,color:"#fff",fontWeight:600,flexShrink:0}}>{VOCABULARY.length} mots</div>
        </div>
      </div>

      {/* ── Barre de traduction ── */}
      <TranslationBar onSearch={(q) => setTranslationQuery(q)} />

      {/* ── Contenu scrollable ── */}
      <div style={{flex:1,overflowY:"auto",overflowX:"hidden"}}>

        {/* ════ ACCUEIL ════ */}
        {page === 'home' && (
          <div style={{padding:"14px",display:"flex",flexDirection:"column",gap:12}}>
            <>
                <div style={{fontFamily:"'Amiri',serif",fontSize:17,fontWeight:700,color:C.terracotta}}>📚 Catégories</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {allCats.map((cat, idx) => {
                    const pair = CAT_COLORS[idx % CAT_COLORS.length];
                    return (
                      <div
                        key={cat}
                        onClick={() => setPage({type:'cat', cat, colorIdx:idx})}
                        style={{cursor:"pointer",background:`linear-gradient(135deg,${pair[0]},${pair[1]})`,borderRadius:16,padding:"14px 14px",display:"flex",alignItems:"center",gap:10,boxShadow:`0 4px 16px ${pair[0]}44`,transition:"transform 0.15s"}}
                        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
                        onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                      >
                        <div style={{fontSize:26,filter:"drop-shadow(0 1px 2px rgba(0,0,0,0.3))"}}>{CAT_ICONS[cat]||CAT_ICONS.default}</div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:13,fontWeight:700,color:"#fff",lineHeight:1.2}}>{cat}</div>
                          <div style={{fontSize:10,color:"rgba(255,255,255,0.75)",marginTop:2}}>{catCounts[cat]} mots →</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
            </>
          </div>
        )}

        {/* ════ MONNAIE ════ */}
        {page === 'monnaie' && <MonnaieApp />}

        {/* ════ JEUX ════ */}
        {page === 'jeux' && (
          <div>
            {/* Menu des jeux */}
            {gameMode === null && (
              <GamesMenu onSelect={(mode) => setGameMode(mode)} />
            )}

            {/* Quiz Mots */}
            {gameMode === 'word-quiz' && (
              <div>
                <div style={{padding:"14px 14px 4px",display:"flex",alignItems:"center",gap:10}}>
                  <button onClick={()=>setGameMode(null)} style={{background:C.sand,border:"none",borderRadius:10,padding:"6px 12px",fontSize:12,cursor:"pointer",fontWeight:700,color:C.text}}>← Jeux</button>
                  <div>
                    <div style={{fontFamily:"'Amiri',serif",fontSize:17,fontWeight:700,color:"#7c3aed"}}>🎯 Quiz Mots</div>
                    <div style={{fontSize:11,color:C.muted}}>5 questions parmi {ALL_QUIZ.length}</div>
                  </div>
                </div>
                <QuizSession key={quizKey} onDone={() => setQuizKey(k => k+1)}/>
              </div>
            )}

            {/* Quiz Images */}
            {gameMode === 'image-quiz' && (
              <div>
                <div style={{padding:"14px 14px 4px",display:"flex",alignItems:"center",gap:10}}>
                  <button onClick={()=>setGameMode(null)} style={{background:C.sand,border:"none",borderRadius:10,padding:"6px 12px",fontSize:12,cursor:"pointer",fontWeight:700,color:C.text}}>← Jeux</button>
                  <div>
                    <div style={{fontFamily:"'Amiri',serif",fontSize:17,fontWeight:700,color:C.terracotta}}>🖼️ Quiz Images</div>
                    <div style={{fontSize:11,color:C.muted}}>5 images parmi {ALL_IMAGE_QUIZ.length}</div>
                  </div>
                </div>
                <ImageQuizSession key={imageQuizKey} onDone={() => setImageQuizKey(k => k+1)}/>
              </div>
            )}

            {/* Culture Tunisienne */}
            {gameMode === 'culture' && (
              <div>
                <div style={{padding:"14px 14px 4px",display:"flex",alignItems:"center",gap:10}}>
                  <button onClick={()=>setGameMode(null)} style={{background:C.sand,border:"none",borderRadius:10,padding:"6px 12px",fontSize:12,cursor:"pointer",fontWeight:700,color:C.text}}>← Jeux</button>
                  <div>
                    <div style={{fontFamily:"'Amiri',serif",fontSize:17,fontWeight:700,color:C.teal}}>🇹🇳 Culture Tunisienne</div>
                    <div style={{fontSize:11,color:C.muted}}>5 questions parmi {ALL_CULTURE.length}</div>
                  </div>
                </div>
                <CultureSession key={cultureKey} onDone={() => setCultureKey(k => k+1)}/>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Barre de navigation ── */}
      <div style={{flexShrink:0,background:C.cream,borderTop:`2px solid ${C.sand}`,boxShadow:"0 -3px 20px rgba(44,26,14,0.09)"}}>
        <MosaicBorder/>
        <div style={{display:"flex"}}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => { setPage(t.id); setSearch(""); setGameMode(null); }}
              style={{flex:1,padding:"9px 4px 11px",background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}
            >
              <div style={{fontSize:22,filter:currentTab===t.id?"none":"grayscale(1) opacity(0.4)"}}>{t.icon}</div>
              <div style={{fontSize:10,fontWeight:700,color:currentTab===t.id?C.terracotta:C.muted}}>{t.label}</div>
              {currentTab===t.id && <div style={{width:22,height:3,background:C.terracotta,borderRadius:99}}/>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
