import useSWR from 'swr';

export const fetcher = (url: string) => fetch(url).then(res => res.text());

export function useAtomFeed(feedURL: string) {
  const { data, error } = useSWR(feedURL, fetcher);

  console.log(data);
  console.log(error);

  return null;
}
