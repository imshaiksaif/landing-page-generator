import { getItem, updateItem } from "simple-dynamodb";
import { v4 as uuidv4 } from "uuid";

type UserParams = {
  userId: string;
};

type CreatePageParams = {
  userId: string;
  pageName: string;
};

export const updateUser = async (_: any, params: UserParams): Promise<User> => {
  const { userId } = params;

  let result = await getItem({
    TableName: process.env.USER_TABLE!,
    Key: {
      userId,
    },
  });

  let user = result.Item;

  if (user) {
    //update the user
    const result = await updateItem({
      TableName: process.env.USER_TABLE!,
      Key: {
        userId,
      },
      UpdateExpression: "SET lastSignedInAt = :lastSignedInAt",
      ExpressionAttributeValues: {
        ":lastSignedInAt": new Date().toISOString(),
      },
      ReturnValues: "ALL_NEW",
    });

    user = result.Attributes;
  } else {
    //create the user
    const result = await updateItem({
      TableName: process.env.USER_TABLE!,
      Key: {
        userId,
      },
      UpdateExpression:
        "SET createdAt = :createdAt, lastSignedInAt = :lastSignedInAt",
      ExpressionAttributeValues: {
        ":createdAt": new Date().toISOString(),
        ":lastSignedInAt": new Date().toISOString(),
      },
      ReturnValues: "ALL_NEW",
    });

    user = result.Attributes;
  }

  return {
    userId,
    createdAt: user ? user.createdAt : null,
    lastSignedInAt: user ? user.lastSignedInAt : null,
  };
};

export const createPage = async (
  _: any,
  params: CreatePageParams
) => {
  const pageId = uuidv4();
  const { userId, pageName } = params;

  let result = await updateItem({
    TableName: process.env.PAGE_TABLE!,
    Key: {
      userId,
      pageId,
    },
    UpdateExpression: "SET pageName = :pageName, createdAt = :createdAt",
    ExpressionAttributeValues: {
      ":pageName": pageName,
      ":createdAt": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
  });

  const returnedAttr = result.Attributes;

  return {
    userId,
    pageId: returnedAttr ? returnedAttr.pageId : null,
    createdAt: returnedAttr ? returnedAttr.createdAt : null,
  };
};
