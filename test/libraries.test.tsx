import { Guards, Parser } from '../src';
import { readFileSync } from './util';

describe('npm versions', () => {
  const data = readFileSync('samples', 'libraries.io', 'npm_versions.atom.xml');
  it('parseAtomFeed', () => {
    Parser.parseAtomFeed(data);
  });
  it('isAtomFeed', () => {
    expect(Guards.isAtomFeed(Parser.parseAtomFeed(data))).toBeTruthy();
  });
  // TODO: verify that the output looks like it's supposed to
});
