import { useState, useEffect } from 'react';
import * as C from './app.styles';
import { Item } from './types/item';
import { Category } from './types/category';
import { itens } from './data/itens';
import { categories } from './data/categories';
import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter'
import { TableArea } from './components/tableArea';
import { InfoArea } from './components/infoArea';
import { InputArea} from './components/inputArea'

const App = () =>{
  const [list, setList] = useState(itens);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    setFilteredList( filterListByMonth(list, currentMonth) );
  }, [list,currentMonth]);

  useEffect(() =>{
    let incomeCount = 0;
    let expenseCount = 0;

    for(let i in filteredList){
      if(categories[filteredList[i].category].expense){
        expenseCount += filteredList[i].value
      }else{
        incomeCount += filteredList[i].value
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth)
  }

  const handleAddItem = (item: Item) =>{
    let newList = [...list]; 
    newList.push(item);
    setList(newList)
  }
  return(
    <C.Container>
      <C.Header>
        <C.HeaderText>
          Sistema Financeiro Pessoal 
        </C.HeaderText>
      </C.Header>
      <C.Body>
        {/* Área de informações */}
        <InfoArea 
        currentMonth={currentMonth}
        onMonthChange={handleMonthChange}
        income={income}
        expense={expense}
        />
        {/* Área de inserção */}
        <InputArea onAdd={handleAddItem}/>
        {/* Tabela de itens */}
        <TableArea list={filteredList}/>
        <C.Footer>Feito por Eduardo Rodrigues&copy; </C.Footer>
      </C.Body>
    </C.Container>
  );
}

export default App;