import { AtomTextType } from './AtomCommon';
import { AtomFeed } from './AtomFeed';

/** searches for a tag in the node list, prevents the recursive searches */
export const searchForTag = (nodes: Iterable<Element> | ArrayLike<Element> | HTMLCollection, tagName: string) => Array.from(nodes).find(e => e.nodeName === tagName);

/** parses the feed */
export function parseFeed(data: string): AtomFeed {
  const parser = new DOMParser();
  const xml = parser.parseFromString(data, 'text/xml');
  const feed = searchForTag(xml.children, 'feed');

  if(feed) {
    return {
      id: searchForTag(feed.children, 'id')?.textContent ?? '',
      title: {
        type: (searchForTag(feed.children, 'title')?.getAttribute('type') as AtomTextType) ?? undefined,
        value: searchForTag(feed.children, 'title')?.textContent ?? ''
      },
      updated: new Date(searchForTag(feed.children, 'updated')?.textContent ?? 0),
      entries: []
    };
  }
  throw Error('No <feed> tag found.');
}
