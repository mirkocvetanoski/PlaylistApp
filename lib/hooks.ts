import useSWR from "swr";
import fetcher from "./fetcher";

export const useMe = () => {
  const { data, error, isLoading } = useSWR("/me", fetcher);

  return {
    user: data,
    isLoading,
    error,
  };
};

export const usePlaylist = () => {
  const { data, error, isLoading } = useSWR("/playlist", fetcher);

  return {
    playlists: (data as any) || [],
    isLoading,
    error,
  };
};

export const useArtist = () => {
  const { data, error, isLoading } = useSWR("/artist", fetcher);

  return {
    artists: (data as any) || [],
    isLoading,
    error,
  };
};
