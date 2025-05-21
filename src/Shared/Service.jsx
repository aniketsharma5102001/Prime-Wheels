import axios from "axios";

const SendBirdApplicationId = import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN;

// Format backend data to combine car listings with their images
const FormatResult = (resp) => {
  const resultMap = new Map();

  resp.forEach((item) => {
    const car = item.carListing;
    const image = item.carImages;

    if (!car) return;

    if (!resultMap.has(car.id)) {
      resultMap.set(car.id, {
        ...car,
        images: [],
      });
    }

    if (image) {
      resultMap.get(car.id).images.push(image);
    }
  });

  return Array.from(resultMap.values());
};

// Create a user in SendBird
const CreateSendBirdUser = (userId, nickName, profileUrl) => {
  return axios.post(
    `https://api-${SendBirdApplicationId}.sendbird.com/v3/users`,
    {
      user_id: userId,
      nickname: nickName,
      profile_url: profileUrl,
      issue_access_token: false,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': SendBirdApiToken,
      },
    }
  );
};

// Create a group channel between two users
const CreateSenBirdChannel = (users, title) => {
  return axios.post(
    `https://api-${SendBirdApplicationId}.sendbird.com/v3/group_channels`,
    {
      user_ids: users,
      is_distinct: true,
      name: title,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': SendBirdApiToken,
      },
    }
  );
};

export default {
  FormatResult,
  CreateSendBirdUser,
  CreateSenBirdChannel,
};
