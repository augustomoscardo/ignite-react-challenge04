import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE - OK
  const { onOpen, onClose, isOpen } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE - OK
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE - OK
  function handleViewImage(url: string): void {
    onOpen()
    setCurrentImageUrl(url)
  }
  
  return (
    <>
      {/* TODO CARD GRID - OK */}
      <SimpleGrid spacing="40px" columns={[1, 2, 3]}>
        {cards?.map(card => (
          <Card key={card.id} data={card} viewImage={handleViewImage} />
        ))}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={currentImageUrl} />
    </>
  );
}
