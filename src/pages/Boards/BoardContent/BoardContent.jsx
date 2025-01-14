import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  closestCenter
} from '@dnd-kit/core'
import { useEffect, useState, useCallback, useRef } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_CARD'
}

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensors = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensors = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  const mySensors = useSensors(mouseSensors, touchSensors)

  const [orderedColumn, setOrderedColumns] = useState([])

  //cung 1 thoi diem chi co 1 phan tu dang duoc keo cl or card
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDragingCard, setOldColumnWhenDragingCard] = useState(null)

  //diem va cham cuoi cung (xly tt phat hien va cham)
  const lastOverId = useRef(null)

  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(orderedColumns)
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumn.find(column => column?.cards?.map(card => card._id)?.includes(cardId) )
  }

  //Function xly : Cap nhat lai state trong trg hop di chuyen card giua cac column khac nhau
  const moverCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDragingCradId,
    activeDragingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      //column cu
      if (nextActiveColumn) {
        //xoa card ra khoi column
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDragingCradId)

        //them placeholder rong : bi keo het card di, kh con cai nao nua
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        //cap nhat mang
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      //columnn moi
      if (nextOverColumn) {
        //ktra card dang keo co ton tai o overcolumn chua
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDragingCradId)
        //cap nhat lai chuan dlieu columnId trong card sau khi keo giua 2 colum khac nhau
        const rebuild_activeDragingCardData = {
          ...activeDragingCardData,
          columnId: nextOverColumn._id
        }
        //theem vao vtri moi
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDragingCardData)

        //xoa cai placholder card di neu no dang ton tai
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        //cap nhat lai mang cho chuan dl
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      return nextColumns
    })
  }

  //Trigger Khi bat dau keo 1 phan tu drag
  const handleDragStart = (event) => {
    // console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDragingCard(findColumnByCardId(event?.active?.id))
    }
  }

  //Trigger trong qua trinh keo 1 phan tu ( drag)
  const handleDragOver = (event) => {
    // console.log('handleDragOver: ', event)
    //khong lam gi neu dang keo column
    if (setActiveDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    //card
    const { active, over } = event

    if (!active || !over) return

    const { id: activeDragingCradId, data: { current: activeDragingCardData } } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeDragingCradId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      moverCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDragingCradId,
        activeDragingCardData
      )
    }


  }

  //Trigger khi ket thuc tha ptu drop
  const handleDragEnd = (event) => {
    const { active, over } = event

    //ktra neu khong ton tai over ( keo ra ngoai return luon tranh loi)
    if (!over) return
    // console.log('handleDragEnd: ', event)

    //Xly keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log('hanh dong keo tha card ')
      const { id: activeDragingCradId, data: { current: activeDragingCardData } } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDragingCradId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      //Hanh dong keo tha card giua 2 column khac nhau
      if (oldColumnWhenDragingCard._id !== overColumn._id) {
        moverCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDragingCradId,
          activeDragingCardData
        )
      } else {
      //Hanh dong keo tha card cung 1 column
        const oldCardIndex = oldColumnWhenDragingCard?.cards?.findIndex(c => c._id === activeDragItemId) //lay vitri cu tu oldColumnWhenDragingCard
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId) //lay vitri moi tu overColumn

        const dndOderedCards = arrayMove(oldColumnWhenDragingCard?.cards, oldCardIndex, newCardIndex)
        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          //Tim cl dang tha
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)
          //cap nhat lai gtri moi
          targetColumn.cards = dndOderedCards
          targetColumn.cardOrderIds = dndOderedCards.map(card => card._id)
          //tra ve gia trij state moi chuan vtri
          return nextColumns
        })

      }
    }

    //Xly kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      console.log('hanh dong keo tha column')
      //vtri sau khi keo tha khac vtri ban dau
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumn.findIndex(c => c._id === active.id) //lay vitri cu tu active
        const newColumnIndex = orderedColumn.findIndex(c => c._id === over.id) //lay vitri moi tu over

        //dung arrayMove de sap xep lai mang ban dau
        const dndOderedColumns = arrayMove(orderedColumn, oldColumnIndex, newColumnIndex)
        //2 cais clg nay de goi API
        // const dndOderedColumnsIds = dndOderedColumns.map(c => c._id)
        // console.log('dndOderedColumns: ', dndOderedColumns)
        // console.log('dndOderedColumnsIds: ', dndOderedColumnsIds)
        setOrderedColumns(dndOderedColumns) // cap nhat lai state ban dau sau khi keo tha
      }

    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDragingCard(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' } }
    })
  }

  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    //tim cac diem giao nhau , va cham voi con tro
    const pointerIntersections = pointerWithin(args)
    // console.log('pointerIntersections: ', pointerIntersections)
    if (!pointerIntersections?.length) return

    //Thuat toan phat hien va cham tra ve 1 mang va cac va cham o day (kh can nua)
    // const intersections = !!pointerIntersections?.length
    //   ? pointerIntersections
    //   : rectIntersection(args)

    let overId = getFirstCollision(pointerIntersections, 'id')
    if (overId) {
      const checkColumn = orderedColumn.find(column => column._id === overId)
      if (checkColumn) {
        // console.log('overid before; ', overId )
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
        // console.log('overid after; ', overId )

      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumn])

  return (
    <DndContext
      sensors={mySensors}
      // dung cai nay bi loi giat nhe khi keo tha giua 2 dtuong: bug flickering
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy} // Tu custom nang cao thuat toan va cham
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd} >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumn}/>
        <DragOverlay dropAnimation={customDropAnimation}>
          { !activeDragItemData && null}
          { (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          { (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}

        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent