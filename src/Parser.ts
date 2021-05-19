import { AtomLinkRelType, AtomTextType } from './AtomCommon';
import { AtomEntry } from './AtomEntry';
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
      entries: filterChildTags(feed, 'entry').map(e => parseEntry(e)),
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

export function parseEntry(entry: Element): AtomEntry {
  return {
    id: findChildTag(entry, 'id')?.textContent ?? '',
    title: {
      type: (findChildTag(entry, 'title')?.getAttribute('type') as AtomTextType) ?? undefined,
      value: findChildTag(entry, 'title')?.textContent ?? ''
    },
    updated: new Date(findChildTag(entry, 'updated')?.textContent ?? 0),
    author: filterChildTags(entry, 'author').map(author => ({
      name: findChildTag(author, 'name')?.textContent ?? '', 
      uri: findChildTag(author, 'uri')?.textContent ?? undefined,
      email: findChildTag(author, 'email')?.textContent ?? undefined,
    })),
    content: undefined,
    link: filterChildTags(entry, 'link').map(link => ({
      href: link.getAttribute('href') ?? '',
      rel: link.getAttribute('rel') ? link.getAttribute('rel') as AtomLinkRelType : undefined,
      type: link.getAttribute('type') ?? undefined,
      hreflang: link.getAttribute('hreflang') ?? undefined,
      title: link.getAttribute('title') ?? undefined,
      length: link.getAttribute('length') ?? undefined,
    })),
    summary: {
      type: (findChildTag(entry, 'summary')?.getAttribute('type') as AtomTextType) ?? undefined,
      value: findChildTag(entry, 'summary')?.textContent ?? ''
    },
    category: filterChildTags(entry, 'category').map(category => ({
      term: category.getAttribute('term') ?? '',
      scheme: category.getAttribute('scheme') ?? undefined,
      label: category.getAttribute('label') ?? undefined
    })),
    contributor: filterChildTags(entry, 'contributor').map(contributor => ({
      name: findChildTag(contributor, 'name')?.textContent ?? '', 
      uri: findChildTag(contributor, 'uri')?.textContent ?? undefined,
      email: findChildTag(contributor, 'email')?.textContent ?? undefined,
    })),
    published: findChildTag(entry, 'published') ? new Date(findChildTag(entry, 'published')?.textContent ?? 0) : undefined,
    rights: {
      type: (findChildTag(entry, 'rights')?.getAttribute('type') as AtomTextType) ?? undefined,
      value: findChildTag(entry, 'rights')?.textContent ?? ''
    },
    source: findChildTag(entry, 'source') ? {
      id: findChildTag(findChildTag(entry, 'source')!, 'id')?.textContent ?? '',
      title: findChildTag(findChildTag(entry, 'source')!, 'title')?.textContent ?? '',
      updated: new Date(findChildTag(findChildTag(entry, 'source')!, 'title')?.textContent ?? 0)
    } : undefined,
  };
}