import { useState } from 'react';
import './Todo.css';
const backgroundColors = ['#d35400', '#2c3e50','#f1c40f', '#8e44ad', '#273c75', '#c23616', '#9c88ff', '#ee5253', '#10ac84', '#ff9ff3', '#1B1464','#ED4C67', '#833471', '#0652DD', '#009432'];
const Todo = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    let background = backgroundColors[props.id];
    if(props.id >= backgroundColors.length) {
        background = backgroundColors[props.id - backgroundColors.length];
    }
    const onUpdateTodos = () => {
        if (!isChecked)
            props.onUpdateCount(true);
        else
            props.onUpdateCount(false);
        setIsChecked(prev => !prev);
    };

    return (
        <div className={`todo ${(isChecked) ? 'darker' : ''}`} style={{backgroundColor:`${background}`}}>
            <div className="todo-item">
                {props.todo}
            </div>
            <div className="todo-options">
                <input type="checkbox" onChange={() => onUpdateTodos()} />
            </div>
        </div>
    );
}
export default Todo;