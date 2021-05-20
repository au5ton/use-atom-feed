import useSWR, { SWRConfiguration } from 'swr';
import { parseFeed } from 'htmlparser2';

export interface Response<Data> {
  data?: Data;
  error?: Error;
  isValidating: boolean;
}

export type Feed = ReturnType<typeof parseFeed>;

/**
 * The React hook used for reading the Atom feed.
 * @param feedURL The URL of the Atom feed
 * @param options Options that are passed to `useSWR()` behind the scenes.
 *  More info: https://swr.vercel.app/docs/options#options
 * @returns The decoded Atom feed or any errors seen along the way
 */
export function useAtomFeed(feedURL: string, options?: SWRConfiguration): Response<Feed> {
  const fetcher = (url: string) => fetch(url).then(res => res.text());
  const { data, error, isValidating } = useSWR(feedURL, fetcher, options);

  // if data is defined
  if(data) {
    // attempt to decode
    try {
      const decoded = parseFeed(data, { xmlMode: true });
      // return a good decode
      return {
        data: decoded,
        error,
        isValidating
      }
    }
    catch(parseError) {
      // return a decode failure
      return {
        data: undefined,
        error: parseError,
        isValidating
      }
    }
  }
  else {
    // data is undefined
    return {
      data: undefined,
      error,
      isValidating
    }
  }
}
