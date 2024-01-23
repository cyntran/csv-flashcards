export type FlashCard = {
  Prompt: string;
  Answer: string;
  CardId: string;
  Topic: string;
};

export type FlashCardMap = Map<string, FlashCard>;
