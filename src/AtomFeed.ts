//
// Adapted from:
// https://validator.w3.org/feed/docs/atom.html
//

import { AtomAuthor, AtomCategory, AtomContributor, AtomLink, AtomRights, AtomTitle } from './AtomCommon';
import { AtomEntry } from './AtomEntry';

/** A Feed consists of some metadata, followed by any number of entries.  */
export interface AtomFeed {
  /** Identifies the feed using a universally unique and permanent URI. If you have a long-term, renewable lease on your Internet domain name, then you can feel free to use your website's address. */
  id: string;
  /** Contains a human readable title for the feed. Often the same as the title of the associated website. This value should not be blank. */
  title: AtomTitle;
  /** Indicates the last time the feed was modified in a significant way. */
  updated: Date;
  /** The entries within the feed */
  entries: AtomEntry[];
  /** Names one author of the feed. A feed may have multiple author elements. A feed must contain at least one author element unless all of the entry elements contain at least one author element. */
  author?: AtomAuthor[];
  /** Identifies a related Web page. The type of relation is defined by the rel attribute. A feed is limited to one alternate per type and hreflang. A feed should contain a link back to the feed itself. */
  link?: AtomLink[];
  /** Specifies a category that the feed belongs to. A feed may have multiple category elements. */
  category?: AtomCategory[];
  /** Names one contributor to the feed. An feed may have multiple contributor elements. */
  contributor?: AtomContributor[];
  /** Identifies the software used to generate the feed, for debugging and other purposes. Both the `uri` and `version` attributes are optional. */
  generator?: AtomGenerator;
  /** Identifies a small image which provides iconic visual identification for the feed. Icons should be square. */
  icon?: string;
  /** Identifies a larger image which provides visual identification for the feed. Images should be twice as wide as they are tall. */
  logo?: string;
  /** Conveys information about rights, e.g. copyrights, held in and over the feed. */
  rights?: AtomRights;
  /** Contains a human-readable description or subtitle for the feed. */
  subtitle?: string;
}

/**
 * Identifies the software used to generate the feed, for debugging and other purposes. Both the `uri` and `version` attributes are optional.
 */
export interface AtomGenerator {
  value: string;
  uri?: string;
  version?: string;
}