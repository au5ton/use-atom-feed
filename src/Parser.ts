import { AtomContent, AtomLinkRelType, AtomPerson, AtomText, AtomTextType } from './AtomCommon';
import { AtomEntry } from './AtomEntry';
import { AtomFeed } from './AtomFeed';

import * as sanitizeHtml from 'sanitize-html';

/** searches for a tag in the node list, prevents recursive searches */
const findByTag = (nodes: Iterable<Element> | ArrayLike<Element> | HTMLCollection, tagName: string) => Array.from(nodes).find(e => e.nodeName === tagName);
/** searches for nodes which have a matching tagName, prevents recursive searches */
const filterByTag = (nodes: Iterable<Element> | ArrayLike<Element> | HTMLCollection, tagName: string) => Array.from(nodes).filter(e => e.nodeName === tagName);
/** shortcut method for `findByTag()` that accesses children */
const findChildTag = (parent: Document | Element, tagName: string) => findByTag(parent.children, tagName);
/** shortcut method for `filterByTag()` that accesses children */
const filterChildTags = (parent: Document | Element, tagName: string) => filterByTag(parent.children, tagName);

/** parses the feed */
export function parseAtomFeed(data: string): AtomFeed {
  const parser = new DOMParser();
  const xml = parser.parseFromString(data, 'text/xml');
  const feed = findChildTag(xml, 'feed');

  if(feed) {
    return {
      id: findChildTag(feed, 'id')?.textContent ?? '',
      title: parseAtomText(findChildTag(feed, 'title')),
      updated: new Date(findChildTag(feed, 'updated')?.textContent ?? 0),
      entries: filterChildTags(feed, 'entry').map(e => parseAtomEntry(e)),
      author: filterChildTags(feed, 'author').map(author => parseAtomPerson(author)),
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
      contributor: filterChildTags(feed, 'contributor').map(contributor => parseAtomPerson(contributor)),
      generator: {
        value: findChildTag(feed, 'generator')?.textContent ?? '',
        uri: findChildTag(feed, 'generator')?.getAttribute('uri') ?? undefined,
        version: findChildTag(feed, 'generator')?.getAttribute('version') ?? undefined
      },
      icon: findChildTag(feed, 'icon')?.textContent ?? undefined,
      logo: findChildTag(feed, 'logo')?.textContent ?? undefined,
      rights: parseAtomText(findChildTag(feed, 'rights')),
      subtitle: findChildTag(feed, 'subtitle')?.textContent ?? undefined,
    };
  }
  throw Error('No <feed> tag found.');
}

export function parseAtomEntry(entry: Element): AtomEntry {
  return {
    id: findChildTag(entry, 'id')?.textContent ?? '',
    title: parseAtomText(findChildTag(entry, 'title')),
    updated: new Date(findChildTag(entry, 'updated')?.textContent ?? 0),
    author: filterChildTags(entry, 'author').map(author => parseAtomPerson(author)),
    content: parseAtomContent(findChildTag(entry, 'content')), // TODO
    link: filterChildTags(entry, 'link').map(link => ({
      href: link.getAttribute('href') ?? '',
      rel: link.getAttribute('rel') ? link.getAttribute('rel') as AtomLinkRelType : undefined,
      type: link.getAttribute('type') ?? undefined,
      hreflang: link.getAttribute('hreflang') ?? undefined,
      title: link.getAttribute('title') ?? undefined,
      length: link.getAttribute('length') ?? undefined,
    })),
    summary: parseAtomText(findChildTag(entry, 'summary')),
    category: filterChildTags(entry, 'category').map(category => ({
      term: category.getAttribute('term') ?? '',
      scheme: category.getAttribute('scheme') ?? undefined,
      label: category.getAttribute('label') ?? undefined
    })),
    contributor: filterChildTags(entry, 'contributor').map(contributor => parseAtomPerson(contributor)),
    published: findChildTag(entry, 'published') ? new Date(findChildTag(entry, 'published')?.textContent ?? 0) : undefined,
    rights: parseAtomText(findChildTag(entry, 'rights')),
    source: findChildTag(entry, 'source') ? {
      id: findChildTag(findChildTag(entry, 'source')!, 'id')?.textContent ?? '',
      title: findChildTag(findChildTag(entry, 'source')!, 'title')?.textContent ?? '',
      updated: new Date(findChildTag(findChildTag(entry, 'source')!, 'title')?.textContent ?? 0)
    } : undefined,
  };
}

/** safely decode text content */
export function safelyDecode(type: AtomTextType, element: Element | undefined): string {
  if(element !== undefined) {
    // If type="xhtml", then this element contains inline xhtml, wrapped in a div element.
    // This means that the existing `.innerHTML` is ready to be santized
    if(type === 'xhtml') return sanitizeHtml(element.innerHTML);
    // If type="html", then this element contains entity escaped html.
    // using `.textContent` will un-escape the text
    else if(type === 'html') return sanitizeHtml(element.textContent ?? '');
    // If type="text", then this element contains plain text with no entity escaped html.
    // This means that the content of `.innerHTML` are **intended** to be safe.
    // However, we don't want to leave an attack vector open, so we're going to sanitize it anyway.
    else if(type === 'text') return sanitizeHtml(element.innerHTML);
  }
  return '';
}

export function parseAtomContent(content: Element | undefined): AtomContent {
  const type = (content?.getAttribute('type') as AtomTextType) ?? undefined;
  return {
    type,
    src: content?.getAttribute('src') ?? undefined,
    value: safelyDecode(type, content),
  }
}


export function parseAtomText(text: Element | undefined): AtomText {
  const type = (text?.getAttribute('type') as AtomTextType) ?? undefined;
  return {
    type,
    value: safelyDecode(type, text)
  }
}

export function parseAtomPerson(person: Element): AtomPerson {
  return {
    name: findChildTag(person, 'name')?.textContent ?? '', 
    uri: findChildTag(person, 'uri')?.textContent ?? undefined,
    email: findChildTag(person, 'email')?.textContent ?? undefined,
  }
}
