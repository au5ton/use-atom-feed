import { Parser } from '../src';
import { readFileSync } from './util';

describe('blog', () => {
  const data = readFileSync('samples', 'blog.cougargrades.io', 'atom.xml');
  it('parseAtomFeed', () => {
    Parser.parseAtomFeed(data);
  });
  // TODO: verify that the output looks like it's supposed to
});
