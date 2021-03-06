import { scanItems, getItem } from "simple-dynamodb";


export const allPages = async () => {
  // TODO: add pagination
  const result = await scanItems({
    TableName: process.env.PAGE_TABLE!
  });
  return result.Items;
}

type PageParams = {
  userId: string;
  pageId: string;
}

export const page = async (_: any, params: PageParams) => {
  const { userId, pageId } = params;
  const result = await getItem({
    TableName: process.env.PAGE_TABLE!,
    Key: { userId, pageId } 
  })

  return result.Item;
}