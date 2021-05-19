import useSWR, { SWRConfiguration } from 'swr';
import { parseFeed } from './Parser';
import { AtomFeed } from './AtomFeed';

export interface Response<Data> {
  data?: Data;
  error?: Error;
  isValidating: boolean;
}

export function useAtomFeed(feedURL: string, options?: SWRConfiguration): Response<AtomFeed> {
  const fetcher = (url: string) => fetch(url).then(res => res.text());
  const { data, error, isValidating } = useSWR(feedURL, fetcher, options);

  // if data is defined
  if(data) {
    // attempt to decode
    try {
      const decoded = parseFeed(data);
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
