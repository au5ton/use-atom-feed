//
// Adapted from:
// https://validator.w3.org/feed/docs/atom.html
//

import { AtomAuthor, AtomCategory, AtomContent, AtomContributor, AtomLink, AtomRights, AtomSummary, AtomText, AtomTitle } from './AtomCommon';

/** An example of an entry would be a single post on a weblog.  */
export interface AtomEntry {
  /** Identifies the entry using a universally unique and permanent URI. Suggestions on how to make a good id can be found here. Two entries in a feed can have the same value for id if they represent the same entry at different points in time. */
  id: string;
  /** Contains a human readable title for the entry. This value should not be blank. */
  title: AtomTitle;
  /** Indicates the last time the entry was modified in a significant way. This value need not change after a typo is fixed, only after a substantial modification. Generally, different entries in a feed will have different updated timestamps. */
  updated: Date;
  /** Names one author of the entry. An entry may have multiple authors. An entry must contain at least one author element unless there is an author element in the enclosing feed, or there is an author element in the enclosed source element. */
  author?: AtomAuthor[];
  /** Contains or links to the complete content of the entry. Content must be provided if there is no alternate link, and should be provided if there is no summary. */
  content?: AtomContent;
  /** Identifies a related Web page. The type of relation is defined by the rel attribute. An entry is limited to one alternate per type and hreflang. An entry must contain an alternate link if there is no content element. */
  link?: AtomLink[];
  /** Conveys a short summary, abstract, or excerpt of the entry. Summary should be provided if there either is no content provided for the entry, or that content is not inline (i.e., contains a src attribute), or if the content is encoded in base64. */
  summary?: AtomSummary;
  /** Specifies a category that the entry belongs to. A entry may have multiple category elements. */
  category?: AtomCategory[];
  /** Names one contributor to the entry. An entry may have multiple contributor elements. */
  contributor?: AtomContributor[];
  /** Contains the time of the initial creation or first availability of the entry. */
  published?: Date;
  /** Conveys information about rights, e.g. copyrights, held in and over the entry. */
  rights?: AtomRights;
  /** Contains metadata from the source feed if this entry is a copy. */
  source?: AtomSource;
}

export interface AtomSource {
  id: string;
  title: string;
  updated: Date;
}