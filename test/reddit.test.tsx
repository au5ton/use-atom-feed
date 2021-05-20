import { Parser } from '../src';
import { readFileSync } from './util';

describe('r_all', () => {
  const data = readFileSync('samples', 'reddit.com', 'r_all.atom.xml');
  it('parseAtomFeed', () => {
    Parser.parseAtomFeed(data);
  });
  // TODO: verify that the output looks like it's supposed to
});
