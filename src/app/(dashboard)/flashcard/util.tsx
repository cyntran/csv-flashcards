import { StoreCardDataType } from "../decks/types/decks";
import { consolidateDecks } from "../decks/types/util";
import { getData } from "../../fetch";
import { FlashCard, FlashCardMap } from "./types/flashcard";

export async function topicMap(_id: string, topic: string): Promise<FlashCardMap> {
  // TODO: hardcoded for now, authenticate user credentials for later.
  const accountId = "1";
  let data = await getData(accountId);
  let decks: StoreCardDataType = consolidateDecks(data);
  const topicDeckArray = Object.values(decks[topic]);

  const map: FlashCardMap = new Map();
  for (let { CardId, Prompt, Answer } of topicDeckArray) {
    map.set(CardId, { Topic: topic, CardId, Prompt, Answer });
  }

  return map;
}

export const genRandomIndex = (length: number) => Math.floor(Math.random() * length);

export const getRandomCard = (deck: FlashCardMap): FlashCard => {
  if (!deck.size) throw new Error('There is no map data.');

  const keys = Array.from(deck.keys());
  const randomIndex = genRandomIndex(length);
  const randomKey = keys[randomIndex];

  const randomItem = deck.get(randomKey);
  if (!randomItem) throw new Error('Item is not found with that key.')

  return randomItem;
}
