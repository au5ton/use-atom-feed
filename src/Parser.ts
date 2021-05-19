import { AtomLinkRelType, AtomTextType } from './AtomCommon';
import { AtomFeed } from './AtomFeed';

/** searches for a tag in the node list, prevents recursive searches */
const findByTag = (nodes: Iterable<Element> | ArrayLike<Element> | HTMLCollection, tagName: string) => Array.from(nodes).find(e => e.nodeName === tagName);
/** searches for nodes which have a matching tagName, prevents recursive searches */
const filterByTag = (nodes: Iterable<Element> | ArrayLike<Element> | HTMLCollection, tagName: string) => Array.from(nodes).filter(e => e.nodeName === tagName);
/** shortcut method for `findByTag()` that accesses children */
const findChildTag = (parent: Document | Element, tagName: string) => findByTag(parent.children, tagName);
/** shortcut method for `filterByTag()` that accesses children */
const filterChildTags = (parent: Document | Element, tagName: string) => filterByTag(parent.children, tagName);

/** parses the feed */
export function parseFeed(data: string): AtomFeed {
  const parser = new DOMParser();
  const xml = parser.parseFromString(data, 'text/xml');
  const feed = findChildTag(xml, 'feed');

  if(feed) {
    return {
      id: findChildTag(feed, 'id')?.textContent ?? '',
      title: {
        type: (findChildTag(feed, 'title')?.getAttribute('type') as AtomTextType) ?? undefined,
        value: findChildTag(feed, 'title')?.textContent ?? ''
      },
      updated: new Date(findChildTag(feed, 'updated')?.textContent ?? 0),
      entries: [],
      author: filterChildTags(feed, 'author').map(author => ({
        name: findChildTag(author, 'name')?.textContent ?? '', 
        uri: findChildTag(author, 'uri')?.textContent ?? undefined,
        email: findChildTag(author, 'email')?.textContent ?? undefined,
      })),
      link: filterChildTags(feed, 'link').map(link => ({
        href: link.getAttribute('href') ?? '',
        rel: link.getAttribute('rel') ? link.getAttribute('rel') as AtomLinkRelType : undefined,
        type: link.getAttribute('type') ?? undefined,
        hreflang: link.getAttribute('hreflang') ?? undefined,
        title: link.getAttribute('title') ?? undefined,
        length: link.getAttribute('length') ?? undefined,
      })),
      category: filterChildTags(feed, 'category').map(category => ({
        term: category.getAttribute('term') ?? '',
        scheme: category.getAttribute('scheme') ?? undefined,
        label: category.getAttribute('label') ?? undefined
      })),
      contributor: filterChildTags(feed, 'contributor').map(contributor => ({
        name: findChildTag(contributor, 'name')?.textContent ?? '', 
        uri: findChildTag(contributor, 'uri')?.textContent ?? undefined,
        email: findChildTag(contributor, 'email')?.textContent ?? undefined,
      })),
      generator: {
        value: findChildTag(feed, 'generator')?.textContent ?? '',
        uri: findChildTag(feed, 'generator')?.getAttribute('uri') ?? undefined,
        version: findChildTag(feed, 'generator')?.getAttribute('version') ?? undefined
      },
      icon: findChildTag(feed, 'icon')?.textContent ?? undefined,
      logo: findChildTag(feed, 'logo')?.textContent ?? undefined,
      rights: {
        type: (findChildTag(feed, 'rights')?.getAttribute('type') as AtomTextType) ?? undefined,
        value: findChildTag(feed, 'rights')?.textContent ?? ''
      },
      subtitle: findChildTag(feed, 'subtitle')?.textContent ?? undefined,
    };
  }
  throw Error('No <feed> tag found.');
}
