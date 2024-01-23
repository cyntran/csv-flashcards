'use client'

import Link from "next/link";
import styles from "./style.module.scss";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getData } from "../../fetch";
import { ProcessedDeckArray } from "./types/decks";
import { consolidateDecks, processDataIntoArray } from "./types/util";

const DeckItem = ({ topic, quantity }: { topic: string, quantity: number }) => {
  return (
    <div className={styles['deck-item-container']}>
      <p className={styles['topic']}>{topic}</p>
      <p className={styles['card-quantity']}>{`${quantity} cards`}</p>
    </div>
  )
}

export default function Page() {
  const searchParams = useSearchParams();
  const accountId = searchParams.get('AccountId');
  const [data, setData] = useState<ProcessedDeckArray[] | undefined>();

  useEffect(() => {
    if (!accountId) return;
    getData(accountId).then(data => {
      let processData: ProcessedDeckArray[] = processDataIntoArray(consolidateDecks(data))
      setData(processData);
    })
  }, [])

  if (!data) return <></>
  return <Decks decks={data} />
}

function Decks({ decks }: { decks: ProcessedDeckArray[] }) {
  return (
    <div className={styles['parent-container']}>
      <div className={styles['page-container']}>
        <div className={styles['decks-info-options']}>
          <p className={styles['deck-label']}>Decks</p>
          <div className={styles['add-deck-button']}>
            <p>Add</p>
          </div>
          <img className={styles['list-view-icon']} src="/list.svg" height={32} width={32} />
        </div>
        <div className={styles['decks-underline']} />
        <div className={styles['decks-container']}>
          {decks.map(([Topic, item] ) => (
            <Link href={`/flashcard?Topic=${Topic}`} key={Topic}>
              <DeckItem topic={Topic} quantity={Object.keys(item).length} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
