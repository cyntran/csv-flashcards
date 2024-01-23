import { ProcessedDeckArray, FetchData, StoreCardDataType } from "./decks";

export function consolidateDecks(data: FetchData[]): StoreCardDataType {
  data.forEach((item) => console.log(item.Data["M"]));
  const processed: StoreCardDataType = {};

  for (let { CardId, Data } of data) {
    let { Topic, Prompt, Answer } = Data.M;
    let cardId = CardId.S;
    let topic = Topic.S;
    let answer = Answer.S;
    let prompt = Prompt.S;

    processed[topic] = processed[topic] || {};
    processed[topic][cardId] = {
      CardId: cardId,
      Prompt: prompt,
      Answer: answer,
    };
  }
  return processed;
}

export const processDataIntoArray = (
  data: StoreCardDataType
): ProcessedDeckArray[] => Object.entries(data);
