import { Guards } from '../src';
import * as Parser from '../src/Parser';
import { readFileSync } from './util';

describe('r_all', () => {
  const data = readFileSync('samples', 'reddit.com', 'r_all.atom.xml');
  it('parseAtomFeed', () => {
    Parser.parseAtomFeed(data);
  });
  it('isAtomFeed', () => {
    expect(Guards.isAtomFeed(Parser.parseAtomFeed(data))).toBeTruthy();
  });
  // TODO: verify that the output looks like it's supposed to
});
