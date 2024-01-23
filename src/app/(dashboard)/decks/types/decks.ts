export type FetchData = {
  AccountId: { [key: string]: string };
  CardId: { [key: string]: string };
  Data: {
    [key: string]: {
      Topic: {
        S: string;
      };
      Prompt: {
        S: string;
      };
      Answer: {
        S: string;
      };
    };
  };
  SK: { [key: string]: string };
};

export type StoreCardDataType = {
  [key: string]: {
    [key: string]: {
      CardId: string;
      Prompt: string;
      Answer: string;
    };
  };
};

export type ProcessedDeckArray = [
  Topic: string,
  {
    [key: string]: {
      Prompt: string;
      Answer: string;
    };
  }
];
