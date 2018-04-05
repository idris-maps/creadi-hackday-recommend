import wikijs from 'wikijs/dist/wiki'
import { WikiPage } from '../models'
import isNear from './isNear'
// types
import { WikiCoordinates, WikiPageContent } from './getWikiPage.d'
import { Place } from './getCoordinates.d'

const wikivoyage = wikijs({ apiUrl: `https://de.wikivoyage.org/w/api.php` })
const wikipedia = wikijs({ apiUrl: `https://de.wikipedia.org/w/api.php` })

const getContentAndCoords = (page): Promise<WikiPageContent|null> =>
  page
    ? Promise.all([
        page.content(),
        page.coordinates(),
      ])
      .then(([content, coordinates]) => ({ content, coordinates }))
    : Promise.resolve(null)

const getWikivoyagePage = (name: string): Promise<WikiPageContent|null> =>
  wikivoyage.search(name)
  .then(({ results }) => results.length !== 0
    ? wikivoyage.page(results[0])
    : null)
  .then(getContentAndCoords)

const getWikipediaResults = (name: string): Promise<string[]> =>
  wikipedia.search(name)
    .then(({ results }) => results)

const getWikipediaPage = (name: string, place: Place): Promise<WikiPageContent|null> =>
  getWikipediaResults(name)
    .then(pages => pages[0]
      ? wikipedia.page(pages[0])
      : null)
    .then(getContentAndCoords)
    .then(result => result && isNear(result.coordinates, place)
      ? result
      : null)

const isInDatabase = (name: string): Promise<string> =>
  WikiPage.findOne({ name })
    .then(page => page
      ? `WIKIPEDIA:\n${page.wikipedia}\n\nWIKIVOYAGE:\n${page.wikivoyage}`
      : null)

const getPages = (name: string, place: Place): Promise<string> =>
  Promise.all([
      getWikivoyagePage(name),
      getWikipediaPage(name, place),
    ])
    .then(([wikivoyage, wikipedia]) => WikiPage.create({
      name,
      wikipedia: wikipedia && wikipedia.content ? wikipedia.content : null,
      wikivoyage: wikivoyage && wikivoyage.content ? wikivoyage.content : null,
    }))
    .then(page => page
      ? `WIKIPEDIA:\n${page.wikipedia}\n\nWIKIVOYAGE:\n${page.wikivoyage}`
      : null)

export default (place: Place): Promise<string> =>
  isInDatabase(place.name)
    .then(content => content
      ? content
      : getPages(place.name, place))
