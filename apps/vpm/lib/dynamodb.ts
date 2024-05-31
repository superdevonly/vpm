"use server";
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import AWS from "aws-sdk";

import { unmarshall } from "@aws-sdk/util-dynamodb";
import { livestreamItemType } from "@/utils/types";

const client = new DynamoDBClient({});
export const createUser = async (userId: string) => {
  const Item = {
    userID: { S: userId },
    imageCredits: { N: process.env.NEXT_PUBLIC_USER_IMAGES_CREDITS_DEFAULT! },
    videoCredits: { N: process.env.NEXT_PUBLIC_USER_VIDEOS_CREDITS_DEFAULT! },
  };
  try {
    await client.send(
      new PutItemCommand({
        TableName: process.env.DYNAMODB_USER_CREDITS_TABLE_NAME,
        ConditionExpression: "attribute_not_exists(userID)",
        Item,
      })
    );
  } catch (error) {
    console.log("User exists");
  }
};

export const getItemAttributes = async (userId: string) => {
  const { Item } = await client.send(
    new GetItemCommand({
      TableName: process.env.DYNAMODB_LIVESTREAM_USER_IMAGES_TABLE_NAME!,
      Key: {
        userID: { S: userId },
      },
    })
  );

  return Item ? unmarshall(Item) : null;
};

export const addUserLivestreamImages = async (
  userId: string,
  livestreamID: string,
  artistName: string,
  songId: string,
  imageUrl: string
) => {
  const attributes = await getItemAttributes(userId);
  let dataToUpdate;
  if (!attributes) {
    const Item = {
      userID: { S: userId },
      images: { M: {} },
      livestreamId: { S: livestreamID },
    };
    try {
      await client.send(
        new PutItemCommand({
          TableName: process.env.DYNAMODB_LIVESTREAM_USER_IMAGES_TABLE_NAME,
          ConditionExpression: "attribute_not_exists(userID)",
          Item,
        })
      );
    } catch (error) {
      console.log("User exists");
    }
  }

  if (attributes?.images[artistName]) {
    if (attributes?.images[artistName][songId]) {
      const existingImagesArray = Array.from(
        attributes.images[artistName][songId]
      ); // Convert the Set to an Array
      existingImagesArray.push(imageUrl);
      dataToUpdate = {
        M: {
          [songId]: {
            SS: existingImagesArray,
          },
        },
      };
    } else {
      const songs = Object.keys(attributes.images[artistName]);
      let images: any[] = [];
      songs.map((songid) => {
        images.push(Array.from(attributes.images[artistName][songid]));
      });
      const updates = Object.assign(
        {},
        ...songs.map((songId, index) => ({ [songId]: { SS: images[index] } }))
      );
      dataToUpdate = {
        M: {
          ...updates,
          [songId]: { SS: [imageUrl] },
        },
      };
    }
  } else if (!attributes?.images[artistName]) {
    dataToUpdate = {
      M: {
        [songId]: {
          SS: [imageUrl],
        },
      },
    };
  }

  const params = {
    TableName: process.env.DYNAMODB_LIVESTREAM_USER_IMAGES_TABLE_NAME!,
    Key: {
      userID: { S: userId },
    },
    UpdateExpression: "SET images.#artistName = :data",
    ExpressionAttributeNames: {
      "#artistName": artistName,
    },
    ExpressionAttributeValues: {
      ":data": dataToUpdate,
    },
    ReturnValues: "UPDATED_OLD",
  } as any;

  try {
    return await client.send(new UpdateItemCommand(params));
  } catch (error) {
    console.log("Error occurred while adding images:", error);
  }
};

export const incrementUserCredits = async (
  userId: string,
  contentType: "video" | "image",
  amount: string = "1"
) => {
  const type = contentType === "video" ? "videoCredits" : "imageCredits";
  const { Attributes } = await client.send(
    new UpdateItemCommand({
      TableName: process.env.DYNAMODB_USER_CREDITS_TABLE_NAME,
      Key: {
        userID: { S: userId },
      },
      UpdateExpression: `SET ${type} = ${type} + :increment`,
      ExpressionAttributeValues: {
        ":increment": { N: amount },
      },
      ReturnValues: "ALL_NEW",
    })
  );

  return Attributes;
};

export const decrementUserCredits = async (
  userId: string,
  contentType: "video" | "image"
) => {
  const type = contentType === "video" ? "videoCredits" : "imageCredits";

  const { Attributes } = await client.send(
    new UpdateItemCommand({
      TableName: process.env.DYNAMODB_USER_CREDITS_TABLE_NAME,
      Key: {
        userID: { S: userId },
      },
      UpdateExpression: `SET ${type} = ${type} - :increment`,
      ExpressionAttributeValues: {
        ":increment": { N: "1" },
      },
      ReturnValues: "ALL_NEW",
    })
  );

  return Attributes ? unmarshall(Attributes) : null;
};

export const getUserCredits = async (userId: string) => {
  const { Item } = await client.send(
    new GetItemCommand({
      TableName: process.env.DYNAMODB_USER_CREDITS_TABLE_NAME,
      Key: {
        userID: { S: userId },
      },
    })
  );

  return Item ? unmarshall(Item) : null;
};

export const addLivepeerVideoToUser = async (
  userId: string,
  assetId: string
) => {
  const Item = {
    userID: { S: userId },
    assetID: { S: assetId },
  };

  try {
    await client.send(
      new PutItemCommand({
        TableName: process.env.DYNAMODB_USER_LIVEPEER_ITEMS_TABLE_NAME!,
        ConditionExpression:
          "attribute_not_exists(userID) AND attribute_not_exists(videoID)",
        Item,
      })
    );
    console.log("User video entry created successfully");
  } catch (error) {
    console.error("Error creating user video entry:", error);
  }
};

export const getUserLivepeerVideos = async (userId: string) => {
  try {
    const { Items } = await client.send(
      new QueryCommand({
        TableName: process.env.DYNAMODB_USER_LIVEPEER_ITEMS_TABLE_NAME!,
        KeyConditionExpression: "userID = :userId",
        ExpressionAttributeValues: {
          ":userId": { S: userId },
        },
      })
    );
    return Items ? Items.map((item) => unmarshall(item)) : [];
  } catch (error) {
    console.error("Error retrieving user videos:", error);
  }
};

export const addAssetToDynamodb = async (
  livestreamID: number,
  artistName: string,
  assetUrl: string,
  assetType: string
) => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const Item: livestreamItemType = {
    livestreamID: livestreamID,
    artistName: artistName,
    assetIdOrUrl: assetUrl,
    assetType: assetType,
  };
  try {
    const response = await docClient
      .put(
        { TableName: process.env.DYNAMODB_LIVESTREAM_TABLE_NAME!, Item: Item },
        function (err, data) {
          if (err) {
            console.log(err); // an error occurred
          } else {
            console.log("Success!:", data); // successful response
          }
        }
      )
      .promise();
    return response;
  } catch (error: any) {
    console.error("Unable to add item:", error);
    throw error; // Rethrow the error to handle it further up the call stack if needed
  }
};
