import { getAuthenticationConfig } from "./app";
import { SubscriptionResponseType } from "./subscription.type";

const BASE_URL = process.env.REACT_APP_API_URL_SYMFONY;

export const getUserSubscriptions = async (): Promise<SubscriptionResponseType> => {
    const response = await fetch(
      `${BASE_URL}auth/subscription/list`,
      getAuthenticationConfig()
    );
    const data = await response.json();
    return data;
  };

  
export const addSubscription = async (
  channelId: string,
): Promise<{ subscribed: boolean }> => {
  const response = await fetch(`${BASE_URL}auth/subscription/add`, {
    ...getAuthenticationConfig(),
    method: "POST",
    body: JSON.stringify(channelId),
  });
  const data = await response.json();
  return data.subscribed;
};

export const removeSubscription = async (
    channelId: string
): Promise<{ unsubscribed: boolean }> => {
  const response = await fetch(`${BASE_URL}auth/subscription/remove`, {
    ...getAuthenticationConfig(),
    method: "POST",
    body: JSON.stringify(channelId),
  });
  const data = await response.json();
  return data.unsubscribed;
};
