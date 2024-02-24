import { callExternalApi } from "./external-api.service";

// const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
const apiServerUrl =" http://django:8000/api/v1/users";

export const getPublicResource = async () => {
  const config = {
    url: `${apiServerUrl}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const getProtectedResource = async () => {
  const config = {
    url: `${apiServerUrl}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const getAdminResource = async () => {
  const config = {
    url: `${apiServerUrl}/api/messages/admin`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};
