import { Parser } from '../src';
import { readFileSync } from './util';

describe('private', () => {
  const data = readFileSync('samples', 'github.com', 'private.atom.xml');
  it('parseAtomFeed', () => {
    Parser.parseAtomFeed(data);
  });
  // TODO: verify that the output looks like it's supposed to
});

describe('releases', () => {
  const data = readFileSync('samples', 'github.com', 'releases.atom.xml');
  it('parseAtomFeed', () => {
    Parser.parseAtomFeed(data);
  });
  // TODO: verify that the output looks like it's supposed to
});
