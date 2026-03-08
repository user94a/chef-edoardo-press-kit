"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Download, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

// Language translations
const translations = {
  ita: {
    language: "ITA",
    subtitle: "Chef Stellato Michelin",
    about: "About",
    pressMaterials: "Press Materials",
    pressKit: "Press Kit",
    downloadPressKit: "Scarica Press Kit",
    photos: "Foto ad Alta Risoluzione",
    downloadPhotos: "Scarica Foto",
    copyright: "© 2025 Edoardo Menna",
    pressExits: "Rassegna Stampa",
    guideMichelin: "Guide Michelin",
    corseNetInfos: "Corse Net Infos",
    tavolozzaDelGusto: "La Tavolozza del Gusto",
    gastronomie: "Gastronomie",
    viewArticle: "Vedi Articolo",
    bio: {
      intro:
        "Con uno sguardo determinato e una mano raffinata, Edoardo Menna è il nuovo nome da tenere d'occhio nel firmamento della gastronomia europea. Originario di Montespertoli, nel cuore della Toscana, Edoardo ha conquistato la sua prima stella Michelin come chef esecutivo del ristorante Finestra by Italo Bassi a Bonifacio, in Corsica. Un traguardo importante, che corona anni di passione, formazione eccellente e un percorso nelle cucine più prestigiose del mondo.",
      roots: {
        title: "Le radici: la Toscana nel cuore e nel palato",
        content:
          "Cresciuto tra i profumi della cucina toscana, Edoardo ha coltivato fin da giovanissimo un amore autentico per la materia prima e per la cucina d'autore. Dopo gli studi, ha affinato il suo talento lavorando al fianco di Luciano Zazzeri, maestro della cucina di mare e anima del celebre ristorante La Pineta a Marina di Bibbona. È lì che Edoardo ha imparato il rispetto per il pesce, per il ritmo delle stagioni e per una cucina che parla direttamente al cuore.",
      },
      training: {
        title: "La formazione d'élite: Ducasse e Alléno",
        content1:
          "La sua ambizione lo ha poi portato a varcare i confini italiani, approdando in due templi assoluti della gastronomia mondiale: prima nella brigata di Alain Ducasse, il mostro sacro della cucina francese contemporanea, e successivamente con Yannick Alléno, chef visionario e pluristellato, noto per la sua ricerca tecnica e l'eleganza estrema dei suoi piatti.",
        content2:
          "In queste esperienze Edoardo ha assorbito il rigore, la disciplina e la creatività che oggi definiscono la sua cucina: una sintesi di tecnica, rispetto per la materia e identità.",
      },
      bonifacio: {
        title: "La consacrazione a Bonifacio",
        content1:
          "Nel 2023, sotto la guida del maestro Italo Bassi, Edoardo ha preso le redini del ristorante Finestra Situato nel cuore del porto di Bonifacio, il locale si distingue per un design architettonico ispirato alla chiglia di una nave e una spettacolare finestra affacciata sul mare. Qui, Edoardo assieme a Maria Elena Cugusi, anche lei giovanissima toscana chef pasticcera con la quale condivide la cucina, ha costruito una proposta gastronomica che unisce radici italiane e anima corsa, esaltando i prodotti locali attraverso tecniche raffinate e visione contemporanea.",
        content2:
          "La stella Michelin è arrivata come naturale riconoscimento di un lavoro appassionato, intenso, condiviso con una brigata giovane ma talentuosa. Oggi Edoardo supervisiona anche gli altri due ristoranti del gruppo: D'Amore e Da Passano, contribuendo a rafforzare l'identità gastronomica della Corsica del sud.",
      },
      future: {
        title: "Il futuro è adesso",
        content:
          "Con la stella appena conquistata e una solida esperienza alle spalle, Edoardo Menna guarda avanti. Alla ricerca di giovani talenti da formare, nuove sfide da affrontare e sogni ancora da realizzare. Ma sempre con lo stesso spirito che lo ha guidato fin dall'inizio: una cucina che racconta chi sei, da dove vieni e dove vuoi arrivare.",
      },
    },
  },
  eng: {
    language: "ENG",
    subtitle: "Michelin Starred Chef",
    about: "About",
    pressMaterials: "Press Materials",
    pressKit: "Press Kit",
    downloadPressKit: "Download Press Kit",
    photos: "High-Resolution Photos",
    downloadPhotos: "Download Photos",
    copyright: "© 2025 Edoardo Menna",
    pressExits: "Press Coverage",
    guideMichelin: "Guide Michelin",
    corseNetInfos: "Corse Net Infos",
    tavolozzaDelGusto: "La Tavolozza del Gusto",
    gastronomie: "Gastronomie",
    viewArticle: "View Article",
    bio: {
      intro:
        "With a determined gaze and a refined hand, Edoardo Menna is the new name to watch in the European gastronomic firmament. Originally from Montespertoli, in the heart of Tuscany, Edoardo earned his first Michelin star as executive chef of Finestra by Italo Bassi restaurant in Bonifacio, Corsica. An important milestone that crowns years of passion, excellent training, and a journey through the most prestigious kitchens in the world.",
      roots: {
        title: "Roots: Tuscany in Heart and Palate",
        content:
          "Growing up among the aromas of Tuscan cuisine, Edoardo cultivated an authentic love for raw ingredients and signature cuisine from a very young age. After his studies, he refined his talent working alongside Luciano Zazzeri, master of seafood cuisine and soul of the famous La Pineta restaurant in Marina di Bibbona. It is there that Edoardo learned respect for fish, for the rhythm of the seasons, and for a cuisine that speaks directly to the heart.",
      },
      training: {
        title: "Elite Training: Ducasse and Alléno",
        content1:
          "His ambition then led him to cross Italian borders, landing in two absolute temples of world gastronomy: first in Alain Ducasse's brigade, the sacred monster of contemporary French cuisine, and subsequently with Yannick Alléno, visionary and multi-starred chef, known for his technical research and the extreme elegance of his dishes.",
        content2:
          "In these experiences, Edoardo absorbed the rigor, discipline, and creativity that define his cuisine today: a synthesis of technique, respect for ingredients, and identity.",
      },
      bonifacio: {
        title: "Consecration in Bonifacio",
        content1:
          "In 2023, under the guidance of master Italo Bassi, Edoardo took the reins of Finestra restaurant. Located in the heart of Bonifacio's port, the venue stands out for its architectural design inspired by a ship's keel and a spectacular window overlooking the sea. Here, Edoardo, together with Maria Elena Cugusi, also a very young Tuscan pastry chef with whom he shares the kitchen, has built a gastronomic proposal that combines Italian roots and Corsican soul, enhancing local products through refined techniques and contemporary vision.",
        content2:
          "The Michelin star arrived as a natural recognition of passionate, intense work, shared with a young but talented brigade. Today Edoardo also supervises the other two restaurants of the group: D'Amore and Da Passano, helping to strengthen the gastronomic identity of southern Corsica.",
      },
      future: {
        title: "The Future is Now",
        content:
          "With the newly conquered star and solid experience behind him, Edoardo Menna looks ahead. In search of young talents to train, new challenges to face, and dreams yet to be realized. But always with the same spirit that has guided him from the beginning: a cuisine that tells who you are, where you come from, and where you want to go.",
      },
    },
  },
  fra: {
    language: "FRA",
    subtitle: "Chef Étoilé Michelin",
    about: "À Propos",
    pressMaterials: "Matériel de Presse",
    pressKit: "Dossier de Presse",
    downloadPressKit: "Télécharger le Dossier",
    photos: "Photos Haute Résolution",
    downloadPhotos: "Télécharger les Photos",
    copyright: "© 2025 Edoardo Menna",
    pressExits: "Revue de Presse",
    guideMichelin: "Guide Michelin",
    corseNetInfos: "Corse Net Infos",
    tavolozzaDelGusto: "La Tavolozza del Gusto",
    gastronomie: "Gastronomie",
    viewArticle: "Voir l'Article",
    bio: {
      intro:
        "Avec un regard déterminé et une main raffinée, Edoardo Menna est le nouveau nom à surveiller dans le firmament gastronomique européen. Originaire de Montespertoli, au cœur de la Toscane, Edoardo a décroché sa première étoile Michelin en tant que chef exécutif du restaurant Finestra by Italo Bassi à Bonifacio, en Corse. Une étape importante qui couronne des années de passion, une formation excellente et un parcours dans les cuisines les plus prestigieuses du monde.",
      roots: {
        title: "Les racines : la Toscane au cœur et au palais",
        content:
          "Ayant grandi parmi les arômes de la cuisine toscane, Edoardo a cultivé dès son plus jeune âge un amour authentique pour les matières premières et la cuisine d'auteur. Après ses études, il a affiné son talent aux côtés de Luciano Zazzeri, maître de la cuisine de la mer et âme du célèbre restaurant La Pineta à Marina di Bibbona. C'est là qu'Edoardo a appris le respect du poisson, du rythme des saisons et d'une cuisine qui parle directement au cœur.",
      },
      training: {
        title: "Formation d'élite : Ducasse et Alléno",
        content1:
          "Son ambition l'a ensuite conduit à franchir les frontières italiennes, atterrissant dans deux temples absolus de la gastronomie mondiale : d'abord dans la brigade d'Alain Ducasse, le monstre sacré de la cuisine française contemporaine, puis avec Yannick Alléno, chef visionnaire et multi-étoilé, connu pour sa recherche technique et l'élégance extrême de ses plats.",
        content2:
          "Dans ces expériences, Edoardo a absorbé la rigueur, la discipline et la créativité qui définissent aujourd'hui sa cuisine : une synthèse de technique, de respect de la matière et d'identité.",
      },
      bonifacio: {
        title: "La consécration à Bonifacio",
        content1:
          "En 2023, sous la direction du maître Italo Bassi, Edoardo a pris les rênes du restaurant Finestra. Situé au cœur du port de Bonifacio, l'établissement se distingue par son design architectural inspiré de la quille d'un navire et une fenêtre spectaculaire donnant sur la mer. Ici, Edoardo, avec Maria Elena Cugusi, également une très jeune chef pâtissière toscane avec qui il partage la cuisine, a construit une proposition gastronomique qui allie racines italiennes et âme corse, valorisant les produits locaux à travers des techniques raffinées et une vision contemporaine.",
        content2:
          "L'étoile Michelin est arrivée comme une reconnaissance naturelle d'un travail passionné, intense, partagé avec une brigade jeune mais talentueuse. Aujourd'hui, Edoardo supervise également les deux autres restaurants du groupe : D'Amore et Da Passano, contribuant à renforcer l'identité gastronomique du sud de la Corse.",
      },
      future: {
        title: "Le futur, c'est maintenant",
        content:
          "Avec l'étoile nouvellement conquise et une solide expérience derrière lui, Edoardo Menna regarde vers l'avenir. À la recherche de jeunes talents à former, de nouveaux défis à relever et de rêves encore à réaliser. Mais toujours avec le même esprit qui l'a guidé depuis le début : une cuisine qui raconte qui vous êtes, d'où vous venez et où vous voulez aller.",
      },
    },
  },
}

// Social media links
const socialLinks = {
  instagram: "https://www.instagram.com/edoardomenna?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  facebook: "https://www.facebook.com/edoardo.menna.9",
  linkedin: "https://www.linkedin.com/in/edoardo-menna-871252158/",
}

// Download links
const downloadLinks = {
  pressKit:
    "https://docs.google.com/document/d/1gtPFpSaXEXUUlLe2I-75ztZJ5AHOuBvq/edit?usp=sharing&ouid=100330227582308784623&rtpof=true&sd=true",
  photos: "https://drive.google.com/drive/folders/1GaBxWU2rYNPTOI8qD_f_Og475nNo6ewU?usp=sharing",
}

// Press links
const pressLinks = {
  guideMichelin:
    "https://guide.michelin.com/fr/fr/article/travel/corse-nouveaux-restaurants-etoiles-et-hotels...-ca-bouge-dans-l-ile-de-beaute?utm_source=newsletter&utm_medium=email&utm_campaign=250503_B2C_NL_FR_Sushi&utm_term=pos3_corse_travelarticle&hashed_email=75f5c4344287d53b1580bdc694eda1afe98b2eed446c0b8b875e717d9e309b73",
  corseNetInfos:
    "https://www.corsenetinfos.corsica/A-Bonifacio-une-Finestra-avec-vue-sur-sur-l-etoile-Michelin-d-un-jeune-chef-italien_a84339.html",
  tavolozzaDelGusto:
    "https://latavolozzadelgustodidracopulos.blogspot.com/2025/04/ristorante-finestra-by-italo-bassi.html",
  gastronomie: "/images/gastronomie-article.jpeg",
}

// Function to detect browser language and map to available languages
const detectBrowserLanguage = (): "ita" | "eng" | "fra" => {
  // Default to English if not in browser environment
  if (typeof window === "undefined" || !navigator) {
    return "eng"
  }

  // Get browser language (e.g., "en-US", "it-IT", "fr-FR")
  const browserLang = navigator.language || (navigator.languages && navigator.languages[0])

  if (!browserLang) return "eng"

  // Map browser language to our available languages
  const langCode = browserLang.toLowerCase().substring(0, 2)

  if (langCode === "it") return "ita"
  if (langCode === "fr") return "fra"

  // Default to English for all other languages
  return "eng"
}

export default function Home() {
  const [language, setLanguage] = useState<"ita" | "eng" | "fra">("eng") // Default fallback
  const t = translations[language]

  // Detect browser language on component mount
  useEffect(() => {
    const detectedLang = detectBrowserLanguage()
    setLanguage(detectedLang)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      {/* Language Selector - Fixed Position */}
      <div className="fixed right-8 top-8 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1 rounded-none border-black px-3 text-xs">
              <Globe className="h-3.5 w-3.5" />
              <span>{t.language}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-none border-black">
            <DropdownMenuItem className="text-xs" onClick={() => setLanguage("ita")}>
              ITA
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs" onClick={() => setLanguage("eng")}>
              ENG
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs" onClick={() => setLanguage("fra")}>
              FRA
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <main className="flex-1 px-4 md:px-8">
        {/* Hero Section with photo */}
        <section className="flex min-h-[70vh] flex-col items-center justify-center pt-16 md:flex-row md:items-center md:justify-start md:gap-12 lg:gap-16">
          <div className="mb-8 md:mb-0">
            <div className="relative h-64 w-64 overflow-hidden rounded-full border border-black/10 md:h-80 md:w-80">
              <Image
                src="/images/edoardo-menna.png"
                alt="Edoardo Menna"
                fill
                sizes="(max-width: 768px) 16rem, 20rem"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div>
            <h1 className="text-center text-4xl font-bold tracking-tight md:text-left md:text-5xl lg:text-6xl">
              EDOARDO MENNA
            </h1>
            <p className="mt-4 text-center text-sm uppercase tracking-widest md:text-left">{t.subtitle}</p>
          </div>
        </section>

        {/* About Section */}
        <section className="my-24 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-sm font-medium uppercase tracking-widest">{t.about}</h2>
          </div>
          <div className="space-y-6 md:col-span-8">
            <p className="max-w-2xl text-lg leading-relaxed">{t.bio.intro}</p>

            <h3 className="mt-8 text-sm font-medium uppercase tracking-widest">{t.bio.roots.title}</h3>
            <p className="max-w-2xl text-lg leading-relaxed">{t.bio.roots.content}</p>

            <h3 className="mt-8 text-sm font-medium uppercase tracking-widest">{t.bio.training.title}</h3>
            <p className="max-w-2xl text-lg leading-relaxed">{t.bio.training.content1}</p>
            <p className="max-w-2xl text-lg leading-relaxed">{t.bio.training.content2}</p>

            <h3 className="mt-8 text-sm font-medium uppercase tracking-widest">{t.bio.bonifacio.title}</h3>
            <p className="max-w-2xl text-lg leading-relaxed">{t.bio.bonifacio.content1}</p>
            <p className="max-w-2xl text-lg leading-relaxed">{t.bio.bonifacio.content2}</p>

            <h3 className="mt-8 text-sm font-medium uppercase tracking-widest">{t.bio.future.title}</h3>
            <p className="max-w-2xl text-lg leading-relaxed">{t.bio.future.content}</p>
          </div>
        </section>

        <Separator className="my-12 bg-black" />

        {/* Download Section */}
        <section className="my-24 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-sm font-medium uppercase tracking-widest">{t.pressMaterials}</h2>
          </div>
          <div className="md:col-span-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="text-lg font-medium">{t.pressKit}</h3>
                <Button
                  variant="outline"
                  className="mt-4 rounded-none border-black px-6 text-xs hover:bg-black hover:text-white"
                  asChild
                >
                  <a href={downloadLinks.pressKit} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    {t.downloadPressKit}
                  </a>
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-medium">{t.photos}</h3>
                <Button
                  variant="outline"
                  className="mt-4 rounded-none border-black px-6 text-xs hover:bg-black hover:text-white"
                  asChild
                >
                  <a href={downloadLinks.photos} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    {t.downloadPhotos}
                  </a>
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-medium">{t.pressExits}</h3>
                <div className="mt-4 flex flex-col gap-3">
                  <Link
                    href={pressLinks.guideMichelin}
                    className="text-sm hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.guideMichelin} (FR)
                  </Link>
                  <Link
                    href={pressLinks.corseNetInfos}
                    className="text-sm hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.corseNetInfos} (FR)
                  </Link>
                  <Link
                    href={pressLinks.tavolozzaDelGusto}
                    className="text-sm hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.tavolozzaDelGusto} (IT)
                  </Link>
                  <Link
                    href={pressLinks.gastronomie}
                    className="text-sm hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.gastronomie} (FR)
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-black py-8">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
          <p className="text-xs uppercase tracking-widest">{t.copyright}</p>
          <div className="flex gap-6">
            <Link
              href={socialLinks.instagram}
              className="text-xs uppercase tracking-widest hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </Link>
            <Link
              href={socialLinks.facebook}
              className="text-xs uppercase tracking-widest hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </Link>
            <Link
              href={socialLinks.linkedin}
              className="text-xs uppercase tracking-widest hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
