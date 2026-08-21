export type Participant = {
  id: string; name: string; nickname: string; bio: string; initials: string; color: string;
  photo?: string;
  stats: { label: string; icon: string; value: number }[];
};

export type TripEvent = {
  time: string; icon: string; activity: string; place?: string; note: string;
  status: "confirmed" | "decide" | "survival";
};

export const tripData = {
  title: "IBIZA 2026",
  dates: {
    label: "18 → 21 SEPTEMBRE",
    footerLabel: "18 — 21 septembre 2026",
    departure: "2026-09-18T11:30:00+02:00",
    start: "2026-09-18T00:00:00+02:00",
    end: "2026-09-22T00:00:00+02:00",
  },
  tagline: "4 jours. Des potes. Des décisions discutables.",
  participants: [
    { id: "tommy", name: "Tommy", nickname: "Le gardien du Picasso", initials: "TO", color: "coral", photo: "/team/tommy.png", bio: "Responsable du véhicule à l’aller. Pour le reste, aucune garantie contractuelle.", stats: [
      { label: "Résistance", icon: "🍺", value: 6 }, { label: "Danse", icon: "🕺", value: 5 }, { label: "Conduite", icon: "🚙", value: 10 }, { label: "Ponctualité", icon: "⏱️", value: 8 },
    ]},
    { id: "valze", name: "Val zé", nickname: "Le finisseur", initials: "VZ", color: "violet", photo: "/team/val-ze.jpg", bio: "Ne laisse jamais une occasion passer. Sur le terrain comme devant une dernière tournée.", stats: [
      { label: "Résistance", icon: "🍺", value: 8 }, { label: "Danse", icon: "🕺", value: 7 }, { label: "Finition", icon: "⚽", value: 10 }, { label: "Réveil difficile", icon: "😵", value: 7 },
    ]},
    { id: "dam-the-goal", name: "Dam the Goal", nickname: "L’électron libre", initials: "DG", color: "pink", photo: "/team/dam-the-goal.jpg", bio: "Peut transformer une pause de cinq minutes en histoire racontée pendant dix ans.", stats: [
      { label: "Résistance", icon: "🍺", value: 7 }, { label: "Danse", icon: "🕺", value: 9 }, { label: "Orientation", icon: "🧭", value: 3 }, { label: "Imprévisibilité", icon: "⚡", value: 10 },
    ]},
    { id: "fred", name: "Fred", nickname: "Le calme suspect", initials: "FR", color: "blue", photo: "/team/fred.jpg", bio: "Discret au briefing. Beaucoup moins discret quand la playlist devient sérieuse.", stats: [
      { label: "Résistance", icon: "🍺", value: 7 }, { label: "Danse", icon: "🕺", value: 8 }, { label: "Sang-froid", icon: "🧊", value: 9 }, { label: "Disparition", icon: "🫥", value: 5 },
    ]},
    { id: "titine", name: "Titine", nickname: "Le capitaine officieux", initials: "TI", color: "teal", photo: "/team/titine.jpg", bio: "Toujours prêt pour le prochain plan, surtout quand personne ne sait encore lequel.", stats: [
      { label: "Résistance", icon: "🍺", value: 8 }, { label: "Danse", icon: "🕺", value: 6 }, { label: "Orientation", icon: "🧭", value: 5 }, { label: "Motivation", icon: "🔥", value: 10 },
    ]},
    { id: "tibus", name: "Tibus", nickname: "Le ministre du programme", initials: "TB", color: "orange", photo: "/team/tibus.jpg", bio: "A tout centralisé dans un site. Pense encore que le groupe respectera les horaires.", stats: [
      { label: "Résistance", icon: "🍺", value: 7 }, { label: "Danse", icon: "🕺", value: 3 }, { label: "Organisation", icon: "🗓️", value: 10 }, { label: "On se fait plaisir", icon: "💸", value: 10 },
    ]},
  ] satisfies Participant[],
  program: [
    { id: "fri", eyebrow: "Jour 01", short: "Ven. 18", date: "Vendredi 18 septembre", title: "Direction Ibiza", events: [
      { time: "11:30", icon: "🚙", activity: "Départ de Créances", place: "En Picasso", note: "Direction la gare de Carentan. La mission commence officiellement.", status: "confirmed" },
      { time: "12:16", icon: "🚆", activity: "Train vers Paris", place: "Carentan → Paris-Saint-Lazare", note: "Arrivée à 15 h 04 · trajet de 2 h 48.", status: "confirmed" },
      { time: "15:04", icon: "🚇", activity: "Transfert vers Paris-Orly", place: "Paris-Saint-Lazare → Orly", note: "Objectif : rejoindre l’aéroport sans perdre un membre du groupe.", status: "confirmed" },
      { time: "17:50", icon: "✈️", activity: "Décollage pour Ibiza", place: "Paris-Orly · Transavia", note: "Vol direct de 2 h 05 · arrivée prévue à Ibiza à 19 h 55.", status: "confirmed" },
      { time: "19:55", icon: "🌴", activity: "Arrivée à Ibiza", place: "Aéroport d’Ibiza", note: "Récupération des bagages puis transfert vers Port des Torrent.", status: "confirmed" },
      { time: "Après", icon: "🏨", activity: "Installation à l’hôtel", place: "Occidental Ibiza", note: "Pose des valises, attribution stratégique des chambres et première tournée.", status: "confirmed" },
      { time: "Soir", icon: "🪩", activity: "Programme à décider sur place", note: "La seule certitude : personne ne voudra aller dormir immédiatement.", status: "decide" },
    ] satisfies TripEvent[] },
    { id: "sat", eyebrow: "Jour 02", short: "Sam. 19", date: "Samedi 19 septembre", title: "Bateau et soirée", events: [
      { time: "Matin", icon: "🏊", activity: "Détente à l’hôtel", place: "Occidental Ibiza", note: "Piscine, repas et récupération avant la suite des opérations.", status: "confirmed" },
      { time: "15:00", icon: "⛵", activity: "Sortie en bateau", place: "Ibiza", note: "Départ à 15 h · retour prévu à 20 h 30. Mer, musique et coucher de soleil.", status: "confirmed" },
      { time: "20:30", icon: "🚿", activity: "Retour et préparation", place: "Occidental Ibiza", note: "Douche express, repas et négociations vestimentaires.", status: "confirmed" },
      { time: "23:00", icon: "🪩", activity: "Soirée au Hï Ibiza", place: "Hï Ibiza", note: "À partir de 23 h. La partie raisonnable du programme s’arrête ici.", status: "confirmed" },
    ] satisfies TripEvent[] },
    { id: "sun", eyebrow: "Jour 03", short: "Dim. 20", date: "Dimanche 20 septembre", title: "Piscine et pool party", events: [
      { time: "Matin", icon: "🏊", activity: "Piscine à l’hôtel", place: "Occidental Ibiza", note: "Réveil progressif, transat et hydratation hautement recommandée.", status: "confirmed" },
      { time: "Après-midi", icon: "🍹", activity: "Pool party", place: "O Beach Ibiza", note: "Soleil, musique et lunettes de soleil obligatoires, même pour se cacher.", status: "confirmed" },
      { time: "Soir", icon: "🌙", activity: "Quartier libre ou boîte de nuit", note: "Décision collective selon l’énergie restante et les promesses faites le matin.", status: "decide" },
    ] satisfies TripEvent[] },
    { id: "mon", eyebrow: "Jour 04", short: "Lun. 21", date: "Lundi 21 septembre", title: "Retour en France", events: [
      { time: "Matin", icon: "🧳", activity: "Temps libre et préparation", place: "Occidental Ibiza", note: "Check-list : papiers, chargeurs, lunettes et tous les membres du groupe.", status: "confirmed" },
      { time: "Avant 15:20", icon: "🚕", activity: "Transfert vers l’aéroport", place: "Port des Torrent → Aéroport d’Ibiza", note: "Départ suffisamment tôt pour éviter un dernier sprint inutile.", status: "confirmed" },
      { time: "15:20", icon: "✈️", activity: "Décollage vers Paris", place: "Ibiza · Transavia", note: "Vol direct de 2 h 05 · arrivée à Paris-Orly à 17 h 25.", status: "confirmed" },
      { time: "17:25", icon: "🚇", activity: "Transfert vers Saint-Lazare", place: "Paris-Orly → Paris-Saint-Lazare", note: "Direction la gare pour attraper le dernier trajet de la mission.", status: "confirmed" },
      { time: "18:59", icon: "🚆", activity: "Train vers Carentan", place: "Paris-Saint-Lazare → Carentan", note: "Arrivée à 21 h 47 · trajet de 2 h 48.", status: "confirmed" },
      { time: "21:47", icon: "🚙", activity: "Retour vers Créances", place: "En Picasso", note: "Fin officielle du séjour. Débrief autorisé après récupération complète.", status: "confirmed" },
    ] satisfies TripEvent[] },
  ],
  status: {
    group: { label: "ENCORE FONCTIONNEL", value: 82 }, budget: { label: "ÇA COMMENCE À PIQUER", value: 61 },
    sleep: { label: "4H12", value: 35 }, hangover: { label: "73 %", value: 73 },
  },
  bingo: ["Cocktail hors de prix", "Photo avec un inconnu", "Voir un coucher de soleil", "Dire « juste une dernière »", "Manger après 3h", "Baignade nocturne", "Commander en espagnol", "Perdre quelqu’un 20 min", "Danser avant minuit", "Dire « demain tranquille »", "Acheter un truc inutile", "Rater une sortie"],
  roulette: ["Direction plage", "Trouver un bar", "Tapas", "Baignade", "Aller voir le sunset", "Commander un cocktail", "Faire une sieste", "On sort", "Trouver la meilleure glace d’Ibiza", "Vous êtes trop vieux : retour au logement"],
  rouletteFinals: ["🍻 Beer pong express", "🥃 Je n’ai jamais", "🃏 La pyramide", "🎯 Action ou gorgée", "🔢 Le jeu du 21", "👑 Le roi de l’apéro"],
  predictions: ["Qui sera le premier bourré ?", "Qui voudra rentrer le premier ?", "Qui perdra quelque chose ?", "Qui dépensera le plus ?", "Qui aura le pire réveil ?", "Qui sera le plus en retard ?", "Qui dira le premier « plus jamais je bois » ?"],
  awards: [["🥴", "Premier bourré"], ["🕺", "Meilleur danseur"], ["🪵", "Pire danseur"], ["⏰", "Plus gros retard"], ["🎙️", "Phrase du séjour"], ["🦞", "Meilleur coup de soleil"], ["💸", "Dépense inutile"], ["🫥", "Premier disparu"], ["😇", "Soirée tranquille"]],
  checklist: ["Carte d’identité / passeport", "Carte bancaire", "Billets", "Chargeur", "Batterie externe", "Maillot", "Lunettes de soleil", "Crème solaire", "Tenues du soir", "Médicaments personnels", "Écouteurs", "Réservation du logement"],
  phrases: {
    before: "Pour le moment tout le monde pense encore que ce voyage va être raisonnable.",
    "2026-09-18": "On ne va quand même pas rentrer tôt le premier soir.", "2026-09-19": "Plus jamais je bois.",
    "2026-09-20": "Allez, juste une petite bière.", "2026-09-21": "Pourquoi on a réservé un vol aussi tôt ?",
    after: "On ne parlera pas de tout. Mais on se souviendra du reste.",
  },
  survival: {
    hotelName: "Occidental Ibiza — All Inclusive",
    address: "Carrer de València, 23-27, 07829 Port d’Es Torrent, Ibiza",
    hotelUrl: "https://www.barcelo.com/es-es/occidental-ibiza/",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Occidental+Ibiza%2C+Carrer+de+Valencia+23-27%2C+07829+Port+d%27Es+Torrent%2C+Spain",
    taxiPhone: "+34971800080",
    returnFlight: "Transavia · Ibiza 15 h 20 → Paris-Orly 17 h 25",
    usefulContact: "+34971340512",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Occidental+Ibiza%2C+Carrer+de+Valencia+23-27%2C+07829+Port+d%27Es+Torrent%2C+Spain",
  },
  links: {
    spotify: "https://open.spotify.com/playlist/3z9BoYFsLaWal4jdXrOMkZ?si=vhcCX64QSZeDwPR0BW6Vlg",
    youtubeMusic: "https://music.youtube.com/playlist?list=RDCLAK5uy_kLOUqzpsRstsNHQHxnsycefGH9gwEV-74&playnext=1&si=R_I_ooOC8s0NPQ6X",
    photos: "https://photos.google.com/",
  },
} as const;
