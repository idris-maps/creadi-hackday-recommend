import wikijs from 'wikijs/dist/wiki'
import { WikiPage } from '../models'
// types
import { WikiCoordinates, WikiPageContent } from './getWikiPage.d'


const wikivoyage = wikijs({ apiUrl: `https://de.wikivoyage.org/w/api.php` })
const wikipedia = wikijs({ apiUrl: `https://de.wikipedia.org/w/api.php` })

const getPage = (wiki, name: string): Promise<WikiPageContent> =>
  wiki.search(name)
  .then(({ results }) => results.length !== 0
    ? wiki.page(results[0])
    : null)
  .then(page => page
    ? Promise.all([
        page.content(),
        page.coordinates(),
      ])
    : [])
  .then(([content, coordinates]) => ({
    content: content || null,
    coordinates: coordinates || null,
  }))

const isInDatabase = (name: string): Promise<string> =>
  WikiPage.findOne({ name })
    .then(page => page
      ? `WIKIPEDIA:\n${page.wikipedia}\n\nWIKIVOYAGE:\n${page.wikivoyage}`
      : null)

const getPages = (name: string): Promise<string> =>
  Promise.all([
      getPage(wikivoyage, name),
      getPage(wikipedia, name),
    ])
    .then(([wikivoyage, wikipedia]) => WikiPage.create({
      name,
      wikipedia: wikipedia.content,
      wikivoyage: wikivoyage.content,
    }))
    .then(page => page
      ? `WIKIPEDIA:\n${page.wikipedia}\n\nWIKIVOYAGE:\n${page.wikivoyage}`
      : null)

export default (name: string): Promise<string> =>
  isInDatabase(name)
    .then(content => content
      ? content
      : getPages(name))
