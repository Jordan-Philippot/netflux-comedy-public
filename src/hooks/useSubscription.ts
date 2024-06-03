import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import useMessage from "hooks/useMessage";
import { SubscriptionResponseType } from "api/subscription.type";
import {
  addSubscription,
  removeSubscription,
  getUserSubscriptions,
} from "api/subscription";
import { useAuth } from "./useAuth";

interface SubscriptionHook {
  userSubscriptions: SubscriptionResponseType | undefined;
  addSubscription: (channelId: string) => void;
  removeSubscription: (channelId: string) => void;
  findUserSubscription: (
    channelId: string,
    setIsSubscribed: (bool: boolean) => void
  ) => void;
  isLoading: boolean;
}

export function useSubscription(): SubscriptionHook {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const shouldFetchUserResume = user !== null;

  const { data, isLoading } = useQuery({
    queryKey: ["userSubscriptions"],
    queryFn: shouldFetchUserResume
      ? getUserSubscriptions
      : () => Promise.resolve(undefined),
  });

  const { sendInformation, sendError } = useMessage();

  const mutationUserSubscription = useMutation({
    mutationFn: getUserSubscriptions,
    mutationKey: ["userSubscriptions"],
    onSuccess: async () => {
      if (user) {
        await queryClient.invalidateQueries({
          queryKey: ["userSubscriptions"],
        });
        const initialDataQuery = await queryClient.getQueryData([
          "userSubscriptions",
        ]);
        await queryClient.setQueryData(["userSubscriptions"], initialDataQuery);
      }
    },
    onError: () => {
      queryClient.removeQueries({ queryKey: ["userSubscriptions"] });
    },
  });

  const handleAddSubscription = async (channelId: string) => {
    try {
      const response = await addSubscription(channelId);
      if (response) {
        sendInformation("Ajouté à vos abonnements");
        mutationUserSubscription.mutate();
      }
    } catch (error) {
      sendError("Erreur lors de l'enregistrement");
    }
  };

  const handleRemove = async (channelId: string) => {
    try {
      const response = await removeSubscription(channelId);
      if (response) {
        sendInformation("Supprimé de vos abonnements");
        mutationUserSubscription.mutate();
      }
    } catch (error) {
      sendError("Erreur lors de la suppression");
    }
  };

  function findUserSubscription(
    channelId: string,
    setIsSubscribed: (bool: boolean) => void
  ) {
    if (data?.subscriptions) {
      if (
        data.subscriptions.find(
          (subscription) => subscription?.channel.channelId === channelId
        )
      ) {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    }
  }

  return {
    userSubscriptions: data,
    addSubscription: handleAddSubscription,
    removeSubscription: handleRemove,
    findUserSubscription,
    isLoading: isLoading,
  };
}
