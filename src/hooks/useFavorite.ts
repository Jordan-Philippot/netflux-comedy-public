import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import useMessage from "hooks/useMessage";
import { addFavorite, getUserFavoriteList, removeFavorite } from "api/favorite";
import { FavoriteType } from "api/favorite.type";
import { useAuth } from "./useAuth";

interface FavoriteHook {
  userFavorites: FavoriteType[] | undefined;
  addFavorite: (videoId: string) => void;
  removeFavorite: (videoId: string) => void;
  findUserFavorite: (
    videoId: string,
    setIsFavorite: (bool: boolean) => void
  ) => void;
  isLoading: boolean;
}

export function useFavorite(): FavoriteHook {
  const queryClient = useQueryClient();
  const { sendInformation, sendError } = useMessage();

  const { user } = useAuth();

  const shouldFetchUserResume = user !== null;

  const { data, isLoading } = useQuery({
    queryKey: ["userFavorites"],
    queryFn: shouldFetchUserResume
      ? getUserFavoriteList
      : () => Promise.resolve([]),
  });

  const mutationUserFavorite = useMutation({
    mutationFn: getUserFavoriteList,
    mutationKey: ["userFavorites"],
    onSuccess: async () => {
      if (user) {
        await queryClient.invalidateQueries({ queryKey: ["userFavorites"] });
        const initialDataQuery = await queryClient.getQueryData([
          "userFavorites",
        ]);
        await queryClient.setQueryData(["userFavorites"], initialDataQuery);
      }
    },
    onError: () => {
      queryClient.removeQueries({ queryKey: ["userFavorites"] });
    },
  });

  const handleAddFavorite = async (videoId: string) => {
    try {
      const response = await addFavorite(videoId);
      if (response) {
        sendInformation("Ajouté à votre liste");
        mutationUserFavorite.mutate();
      }
    } catch (error) {
      sendError("Erreur lors de l'enregistrement");
    }
  };

  const handleRemove = async (videoId: string) => {
    try {
      const response = await removeFavorite(videoId);
      if (response) {
        sendInformation("Supprimé de votre liste");
        mutationUserFavorite.mutate();
      }
    } catch (error) {
      sendError("Erreur lors de la suppression");
    }
  };

  function findUserFavorite(
    videoId: string,
    setIsFavorite: (bool: boolean) => void
  ) {
    if (data) {
      if (data.find((favorite) => favorite?.video.videoId === videoId)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }

  return {
    userFavorites: data,
    addFavorite: handleAddFavorite,
    removeFavorite: handleRemove,
    findUserFavorite: findUserFavorite,
    isLoading: isLoading,
  };
}
