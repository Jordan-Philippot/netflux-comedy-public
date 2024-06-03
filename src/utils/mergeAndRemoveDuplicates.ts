import { VideoDataType } from "api/video.type";

export const mergeAndRemoveDuplicates = (
  array1: VideoDataType[],
  array2: VideoDataType[]
) => {
  // Fusionne les deux tableaux sans doublons
  const mergedArray = Array.from(new Set([...array1, ...array2]));

  return mergedArray;
};
