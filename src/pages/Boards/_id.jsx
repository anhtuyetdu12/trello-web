import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mapOrder } from '~/utils/sorts'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
// import {mockData} from '~/apis/mock-data'
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { Typography } from '@mui/material'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '6791a32c021065a56bd809cd' //dang fix cung
    //Call API
    fetchBoardDetailsAPI(boardId).then(board => {
      //sxep thu tu column trc khi dua dlieu xuong duoi component
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach(column => {
      //Khi f5 trang web: can xly vde keo tha 1 column rong
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }

      })
      setBoard(board)
    })
  }, [])

  //Func nay cos nvu: goi API tao moi Column va lam lai dlieu State Board
  const createNewColumn = async(newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    //khi tao column moi thi chua co card, can xly keo tha 1 column rong
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    //cap nhat lai state board
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  //Func nay cos nvu: goi API tao moi Card va lam lai dlieu State Board
  const createNewCard = async(newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    //cap nhat lai state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      //Neu column rong: ban chat la dnag chua 1 placeholderCard
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        //Ngc lai column co data thi push vao cuoi mang
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }

    }
    setBoard(newBoard)
  }

  //Func nay cos nvu: goi API va xly khi keo tha column xong xuoi
  const moveColumns = (dndOderedColumns) => {
    //update cho chuan dlieu state board
    const dndOderedColumnsIds = dndOderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOderedColumns
    newBoard.columnOrderIds = dndOderedColumnsIds
    setBoard(newBoard)

    //Goi API update Board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOderedColumnsIds })

  }

  /* Khi di chuyen card trong cung column
  Chi can goi API de cap nhat mang cardOrderIds cua column chua no ( thay doi vtri trong mang) */
  const moveCardInTheSameColumn = (dndOderedCards, dndOrderedCardIds, columnId) => {
    //update cho chuan dlieu state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds

    }
    setBoard(newBoard)

    //Goi API update Column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  /* Khi di chuyen card sang column khac */
  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOderedColumns) => {
    //update cho chuan dlieu state board
    const dndOderedColumnsIds = dndOderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOderedColumns
    newBoard.columnOrderIds = dndOderedColumnsIds
    setBoard(newBoard)

    //Goi API xly phia BE
    let prevCardOrderIds = dndOderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    /*Xly vde khi kéo phần tử card cuối cùng ra khỏi column,
    Column rỗng sẽ có placeholder card, cần xóa nó đi trước khi gửi dlieu cho phía BE
    */
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    )
  }

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar/>
        <BoardBar board={board} />
        <BoardContent
          board={board}
          createNewColumn ={createNewColumn}
          createNewCard={createNewCard}
          moveColumns={moveColumns}
          moveCardInTheSameColumn = {moveCardInTheSameColumn}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
        />

      </Container>
    </>
  )
}

export default Board