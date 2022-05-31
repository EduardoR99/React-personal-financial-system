import { type } from 'os';
import { Item } from '../../types/item';
import { FormatDate } from '../../helpers/dateFilter';
import { categories } from '../../data/categories'
import * as C from './styles';


type Props = {
    item: Item
}

export const TableItem = ({ item }: Props) => {
    return (
        <C.TableLine>
            <C.TableColumn>{FormatDate(item.date)}</C.TableColumn>
            <C.TableColumn>
                <C.Category color={categories[item.category].color}>
                    {categories[item.category].title}
                </C.Category>
            </C.TableColumn>
            <C.TableColumn>{item.title}</C.TableColumn>
            <C.TableColumn>
                <C.Value color={categories[item.category].expense ? '#f00': '#0f0'}>
                    R$ {item.value}
                </C.Value>
                </C.TableColumn>
        </C.TableLine>
    );
}

