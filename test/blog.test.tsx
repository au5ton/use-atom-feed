import { AtomAuthor, AtomLink, AtomTitle, Guards, Parser } from '../src';
import { readFileSync } from './util';

describe('blog', () => {
  const data = readFileSync('samples', 'blog.cougargrades.io', 'blog.atom.xml');
  it('call parseAtomFeed() without crashing', () => {
    Parser.parseAtomFeed(data);
  });
  it('type guard sanity check (isAtomFeed)', () => {
    expect(Guards.isAtomFeed(Parser.parseAtomFeed(data))).toBeTruthy();
  });
  it('has expected feed info', () => {
    const feed = Parser.parseAtomFeed(data);
    expect(feed.id).toEqual<string>('https://blog.cougargrades.io');
    expect(feed.title).toEqual<AtomTitle>({ type: undefined, value: 'CougarGrades.io' });
    expect(feed.updated instanceof Date).toBe(true);
    expect(Array.isArray(feed.entries)).toBe(true);
    expect(feed.author).toContainEqual<AtomAuthor>({
      name: 'Austin Jackson',
      email: 'austinjckson@gmail.com',
      uri: undefined
    });
    expect(feed.link).toContainEqual<AtomLink>({
      href: 'https://blog.cougargrades.io/atom.xml',
      rel: 'self',
      type: undefined,
      hreflang: undefined,
      title: undefined,
      length: undefined
    });
    expect(feed.link).toContainEqual<AtomLink>({
      href: 'https://blog.cougargrades.io/',
      rel: undefined,
      type: undefined,
      hreflang: undefined,
      title: undefined,
      length: undefined
    });
  });
});
