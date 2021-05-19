//
// Adapted from:
// https://validator.w3.org/feed/docs/atom.html
//

/** representation of &lt;category&gt; element */
export interface AtomCategory {
  /** identifies the category */
  term: string;
  /** identifies the categorization scheme via a URI. */
  scheme?: string;
  /** provides a human-readable label for display */
  label?: string;
}

/**
 * &lt;content&gt; either contains, or links to, the complete content of the entry.
 * In the most common case, the `type` attribute is either `text`, `html`, `xhtml`, in which case the content element is defined identically to other text constructs, which are described here.
 * Otherwise, if the `src` attribute is present, it represents the URI of where the content can be found. The `type` attribute, if present, is the media type of the content.
 * Otherwise, if the `type` attribute ends in `+xml` or `/xml`, then an xml document of this type is contained inline.
 * Otherwise, if the `type` attribute starts with `text`, then an escaped document of this type is contained inline.
 * Otherwise, a base64 encoded document of the indicated media type is contained inline.
 */
export interface AtomContent {
  type?: string;
  src?: string;
  value: string;
}

/**
 * &lt;link&gt; is patterned after html's link element. It has one required attribute, `href`, and five optional attributes: `rel`, `type`, `hreflang`, `title`, and `length`.
 */
export interface AtomLink {
  /** `href` is the URI of the referenced resource (typically a Web page) */
  href: string;
  /**
   * rel contains a single link relationship type. It can be a full URI (see extensibility), or one of the following predefined values (default=`alternate`):
   * - `alternate`: an alternate representation of the entry or feed, for example a permalink to the html version of the entry, or the front page of the weblog.
   * - `enclosure`: a related resource which is potentially large in size and might require special handling, for example an audio or video recording.
   * - `related`: an document related to the entry or feed.
   * - `self`: the feed itself.
   * - `via`: the source of the information provided in the entry.
   */
  rel?: AtomLinkRelType;
  /** `type` indicates the media type of the resource. */
  type?: string;
  /** `hreflang` indicates the language of the referenced resource. */
  hreflang?: string;
  /** `title`, human readable information about the link, typically for display purposes. */
  title?: string;
  /** `length`, the length of the resource, in bytes. */
  length?: string;
}

/** describes a person, corporation, or similar entity.  */
export interface AtomPerson {
  /** conveys a human-readable name for the person. */
  name: string;
  /** contains a home page for the person. */
  uri?: string;
  /** contains an email address for the person. */
  email?: string;
}

export type AtomLinkRelType = 'alternate' | 'enclosure' | 'related' | 'self' | 'via';

/** representation of &lt;author&gt; element */
export interface AtomAuthor extends AtomPerson {}
/** representation of &lt;contributor&gt; element */
export interface AtomContributor extends AtomPerson {}

/**
 * &lt;title&gt;, &lt;summary&gt;, &lt;content&gt;, and &lt;rights&gt; contain human-readable text, usually in small quantities. The type attribute determines how this information is encoded (default="text")
 * - If `type="text"`, then this element contains plain text with no entity escaped html.
 * - If `type="html"`, then this element contains entity escaped html.
 * - If `type="xhtml"`, then this element contains inline xhtml, wrapped in a div element.
 */
export interface AtomText {
  type?: AtomTextType;
  value: string;
}

export type AtomTextType = 'text' | 'html' | 'xhtml';

/** representation of &lt;title&gt; element */
export interface AtomTitle extends AtomText {}
/** representation of &lt;summary&gt; element */
export interface AtomSummary extends AtomText {}
/** representation of &lt;rights&gt; element */
export interface AtomRights extends AtomText {}

