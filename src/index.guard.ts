/*
 * Generated type guards for "index.ts".
 * WARNING: Do not manually change this file.
 */
import { AtomFeed, AtomGenerator, AtomEntry, AtomSource, AtomCategory, AtomContent, AtomLink, AtomPerson, AtomLinkRelType, AtomAuthor, AtomContributor, AtomText, AtomTextType, AtomTitle, AtomSummary, AtomRights } from "./index";

export function isAtomFeed(obj: any, _argumentName?: string): obj is AtomFeed {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "string" &&
        isAtomTitle(obj.title) as boolean &&
        obj.updated instanceof Date &&
        Array.isArray(obj.entries) &&
        obj.entries.every((e: any) =>
            isAtomEntry(e) as boolean
        ) &&
        (typeof obj.author === "undefined" ||
            Array.isArray(obj.author) &&
            obj.author.every((e: any) =>
                isAtomAuthor(e) as boolean
            )) &&
        (typeof obj.link === "undefined" ||
            Array.isArray(obj.link) &&
            obj.link.every((e: any) =>
                isAtomLink(e) as boolean
            )) &&
        (typeof obj.category === "undefined" ||
            Array.isArray(obj.category) &&
            obj.category.every((e: any) =>
                isAtomCategory(e) as boolean
            )) &&
        (typeof obj.contributor === "undefined" ||
            Array.isArray(obj.contributor) &&
            obj.contributor.every((e: any) =>
                isAtomContributor(e) as boolean
            )) &&
        (typeof obj.generator === "undefined" ||
            isAtomGenerator(obj.generator) as boolean) &&
        (typeof obj.icon === "undefined" ||
            typeof obj.icon === "string") &&
        (typeof obj.logo === "undefined" ||
            typeof obj.logo === "string") &&
        (typeof obj.rights === "undefined" ||
            isAtomRights(obj.rights) as boolean) &&
        (typeof obj.subtitle === "undefined" ||
            typeof obj.subtitle === "string")
    )
}

export function isAtomGenerator(obj: any, _argumentName?: string): obj is AtomGenerator {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.value === "string" &&
        (typeof obj.uri === "undefined" ||
            typeof obj.uri === "string") &&
        (typeof obj.version === "undefined" ||
            typeof obj.version === "string")
    )
}

export function isAtomEntry(obj: any, _argumentName?: string): obj is AtomEntry {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "string" &&
        isAtomTitle(obj.title) as boolean &&
        obj.updated instanceof Date &&
        (typeof obj.author === "undefined" ||
            Array.isArray(obj.author) &&
            obj.author.every((e: any) =>
                isAtomAuthor(e) as boolean
            )) &&
        (typeof obj.content === "undefined" ||
            isAtomContent(obj.content) as boolean) &&
        (typeof obj.link === "undefined" ||
            Array.isArray(obj.link) &&
            obj.link.every((e: any) =>
                isAtomLink(e) as boolean
            )) &&
        (typeof obj.summary === "undefined" ||
            isAtomSummary(obj.summary) as boolean) &&
        (typeof obj.category === "undefined" ||
            Array.isArray(obj.category) &&
            obj.category.every((e: any) =>
                isAtomCategory(e) as boolean
            )) &&
        (typeof obj.contributor === "undefined" ||
            Array.isArray(obj.contributor) &&
            obj.contributor.every((e: any) =>
                isAtomContributor(e) as boolean
            )) &&
        (typeof obj.published === "undefined" ||
            obj.published instanceof Date) &&
        (typeof obj.rights === "undefined" ||
            isAtomRights(obj.rights) as boolean) &&
        (typeof obj.source === "undefined" ||
            isAtomSource(obj.source) as boolean)
    )
}

export function isAtomSource(obj: any, _argumentName?: string): obj is AtomSource {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "string" &&
        typeof obj.title === "string" &&
        obj.updated instanceof Date
    )
}

export function isAtomCategory(obj: any, _argumentName?: string): obj is AtomCategory {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.term === "string" &&
        (typeof obj.scheme === "undefined" ||
            typeof obj.scheme === "string") &&
        (typeof obj.label === "undefined" ||
            typeof obj.label === "string")
    )
}

export function isAtomContent(obj: any, _argumentName?: string): obj is AtomContent {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.type === "undefined" ||
            obj.type === "text" ||
            obj.type === "html" ||
            obj.type === "xhtml") &&
        (typeof obj.src === "undefined" ||
            typeof obj.src === "string") &&
        typeof obj.value === "string"
    )
}

export function isAtomLink(obj: any, _argumentName?: string): obj is AtomLink {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.href === "string" &&
        (typeof obj.rel === "undefined" ||
            obj.rel === "alternate" ||
            obj.rel === "enclosure" ||
            obj.rel === "related" ||
            obj.rel === "self" ||
            obj.rel === "via") &&
        (typeof obj.type === "undefined" ||
            typeof obj.type === "string") &&
        (typeof obj.hreflang === "undefined" ||
            typeof obj.hreflang === "string") &&
        (typeof obj.title === "undefined" ||
            typeof obj.title === "string") &&
        (typeof obj.length === "undefined" ||
            typeof obj.length === "string")
    )
}

export function isAtomPerson(obj: any, _argumentName?: string): obj is AtomPerson {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.name === "string" &&
        (typeof obj.uri === "undefined" ||
            typeof obj.uri === "string") &&
        (typeof obj.email === "undefined" ||
            typeof obj.email === "string")
    )
}

export function isAtomLinkRelType(obj: any, _argumentName?: string): obj is AtomLinkRelType {
    return (
        (obj === "alternate" ||
            obj === "enclosure" ||
            obj === "related" ||
            obj === "self" ||
            obj === "via")
    )
}

export function isAtomAuthor(obj: any, _argumentName?: string): obj is AtomAuthor {
    return (
        isAtomPerson(obj) as boolean
    )
}

export function isAtomContributor(obj: any, _argumentName?: string): obj is AtomContributor {
    return (
        isAtomPerson(obj) as boolean
    )
}

export function isAtomText(obj: any, _argumentName?: string): obj is AtomText {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.type === "undefined" ||
            obj.type === "text" ||
            obj.type === "html" ||
            obj.type === "xhtml") &&
        typeof obj.value === "string"
    )
}

export function isAtomTextType(obj: any, _argumentName?: string): obj is AtomTextType {
    return (
        (obj === "text" ||
            obj === "html" ||
            obj === "xhtml")
    )
}

export function isAtomTitle(obj: any, _argumentName?: string): obj is AtomTitle {
    return (
        isAtomText(obj) as boolean
    )
}

export function isAtomSummary(obj: any, _argumentName?: string): obj is AtomSummary {
    return (
        isAtomText(obj) as boolean
    )
}

export function isAtomRights(obj: any, _argumentName?: string): obj is AtomRights {
    return (
        isAtomText(obj) as boolean
    )
}
