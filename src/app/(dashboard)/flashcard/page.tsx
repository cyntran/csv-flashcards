'use client'

import { useEffect, useState } from "react";
import styles from "./style.module.scss"
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useRouter, useSearchParams } from 'next/navigation'
import Link from "next/link";
import { topicMap, getRandomCard } from "./util"
import { FlashCardMap, FlashCard } from "./types/flashcard";

export default function Page() {
  const searchParams = useSearchParams();
  const searchTopic = searchParams.get('Topic');
  const [data, setData] = useState<FlashCardMap>();
  const [randomCard, setRandomCard] = useState<FlashCard>();
  // const router = useRouter();

  useEffect(() => {
    if (searchTopic?.length) {
      try {
        topicMap("1", searchTopic).then(map => {
          setData(map);
          const item = getRandomCard(map);
          if (!item) throw new Error('No random card selected!')
          setRandomCard(item);
        })
      } catch (err: any) {
        console.log(err.message)
      }
    }
  }, [])

  if (!data || !randomCard) {
    return <></>;
  }

  return <Flashcard deckData={data} firstItem={randomCard} />
}

interface IFlashcard  {
  deckData: FlashCardMap;
  firstItem: FlashCard;
}

function Flashcard({ deckData, firstItem }: IFlashcard) {
  const [hardCopyDeck, _setHardCopyDeck] = useState<FlashCardMap>(deckData);
  const [deck, setDeck] = useState<FlashCardMap>(new Map(hardCopyDeck));
  const [totalNumCards, _setTotalNumCards] = useState(deckData?.size || 0);
  const [flipped, setFlipped] = useState(false);
  const [card, setCard] = useState<FlashCard>(firstItem);
  const [correct, setCorrect] = useState(0);
  const [stackNum, setStackNum] = useState(1);
  const [finished, setFinished] = useState(false);
  const [loadNext, setLoadNext] = useState(false);
  const { width } = useWindowDimensions();
  const ICON_SIZE = 24;
  const desktopView = width > 1024;

  // TODO: hardcoded for now, authenticate user credentials for later.
  const accountId = "1";

  const startOver = () => {
    const randomCard = getRandomCard(hardCopyDeck);

    setCard(randomCard);
    setDeck(new Map(hardCopyDeck))
    setStackNum(1);
    setFinished(false);
    setFlipped(false);
    setCorrect(0);
  }

  useEffect(() => {
    if (loadNext) {
      deck?.delete(card.CardId);

      if (!deck.size) {
        setFlipped(false);
        setFinished(true);
      } else {
        setCard(getRandomCard(deck))
        setStackNum(stackNum + 1)
        setFlipped(false);
      }
      setLoadNext(false);
    }
  }, [loadNext])

  return (
    <div className={styles["parent-container"]}>
      <div className={styles["page-container"]}>
        <div className={styles["back-to-deck-btn-container"]}>
          <Link href={`/decks?AccountId=${accountId}`} style={{ textDecoration: 'none' }}>
            <div className={styles['back-to-deck-btn']}>
              <img src="/back.svg" width={ICON_SIZE} height={ICON_SIZE} />
              <p>Decks</p>
            </div>
          </Link>
          <div className={styles['purple-underline']} />
        </div>
        <div className={styles["topic-and-options-container"]}>
          <p className={styles["topic"]}>{card.Topic}</p>
          <div className={styles["add-card-btn"]}>
            <img src="/add-card.svg" height={ICON_SIZE} width={ICON_SIZE} />
            {desktopView ? <p>Add Card</p> : <></>}
          </div>
          <div className={styles["shuffle-deck-btn"]}>
            <img src="/shuffle.svg" height={ICON_SIZE} width={ICON_SIZE}/>
            {desktopView ? <p>Shuffle</p> : <></>}
          </div>
          <div className={styles["score"]}>
            {desktopView ? <p>{correct}/{totalNumCards}</p> : <p>{correct}</p>}
          </div>
      </div>
        <div className={`${styles['flashcard-container']} ${flipped ? styles.flip : ''}`}>
          {finished ?
            <div className={styles['finished-reviewing']}>
              <p>Finished</p>
              <div className={styles['start-over-btn']} onClick={() => startOver()}>
                  <img src="/restart.svg" width={24} height={24} />
                  <p>Start over</p>
              </div>
            </div>
          : <></>}
          <div className={styles["flashcard-prompt"]}>
            <p className={styles["flashcard-text"]}>{card.Prompt}</p>
            <p className={styles["flashcard-count"]}>{stackNum}/{totalNumCards}</p>
          </div>
          <div className={`${styles["flashcard-answer"]} ${!flipped ? styles.hide : ''}`}>
            <p className={styles["flashcard-text"]}>{card.Answer}</p>
            <p className={styles["flashcard-count"]}>{stackNum}/{totalNumCards}</p>
          </div>
        </div>
        <div className={styles["flashcard-bottom-btns"]}>
          {flipped ? <div className={styles["flashcard-fail-btn"]} onClick={() => {
            setLoadNext(true);
          }
          }>
            <img src="/fail.svg" width={ICON_SIZE} height={ICON_SIZE} />
            <p>Fail</p>
          </div>
          : <></>}
          { !finished ? <div className={styles["reveal-answer-btn"]}
            onClick={() => setFlipped(!flipped)}>
            <p>{desktopView ? 'Reveal' : ''} {!flipped ? 'Answer' : 'Prompt'}</p>
          </div> : <></>}
          {flipped ? <div className={styles["flashcard-pass-btn"]} onClick={() => {
            if (correct < totalNumCards) setCorrect(correct + 1);
            setLoadNext(true);
          }}>
            <img src="/pass.svg" width={ICON_SIZE} height={ICON_SIZE} />
            <p>Pass</p>
          </div>
            : <></>}
        </div>
      </div>
    </div>
  )
}