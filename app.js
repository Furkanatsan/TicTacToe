const xClass='cross'
const oClass='circle'
const combinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const board=document.getElementById('board');
const cells=document.querySelectorAll('.cell');
const result=document.getElementById('result');
const resultText=document.querySelector('.result-text');
const restartBtn=document.getElementById('reset');

let turn;
const swapTurn = () =>{turn=!turn};
const placeMark=(cell,currentClass)=>{cell.classList.add(currentClass)}
const placeHover = () => {
    board.classList.remove(xClass)
    board.classList.remove(oClass)
    if(turn) board.classList.add(oClass)
    else board.classList.add(xClass)
}

const endGame=(draw)=>{
    if(draw) 
    {
        resultText.innerText ='Beraberlik!'
    }
    else 
    {
        resultText.innerText= `${turn ? 'O' : 'X'} Kazandi!`
    }
    result.classList.add('show')
}

const isDraw=()=>{
    return [...cells].every(cell=>{
        return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
}
const checkWin=(currentClass)=>{
    return combinations.some(combination=>{
        return combination.every(index=>{
            return cells[index].classList.contains(currentClass)
        })
    })
}

const handleClick=(e)=> {
    const cell=e.target
    const currentClass=turn ? oClass : xClass
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        swapTurn()
        placeHover()
    }
}

const resetGame=()=>{
    cells.forEach(cell=>{
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click',handleClick, {once:true})
    })
}

const startGame=() => {
    turn=false
    resetGame()
    placeHover()
    result.classList.remove('show')
}

startGame()
restartBtn.addEventListener('click',startGame)
















