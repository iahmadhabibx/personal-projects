import { useState } from 'react';
import './CreateTodo.css';

const CreateTodo = (props) => {
    const [remainingCharacters, setRemainingCharacters] = useState(135);
    const [usedCharacters, setUsedCharacters] = useState(0);

    const onAddTodo = (e) => {
        e.preventDefault();
        let value = e.target[0].value.trim();
        if (!value) {
            alert("Write a task first");
            return;
        }

        props.handleTodoItem(value);
        e.target[0].value = '';
    };

    const onCheckCharacters = (e) => {
        let value = e.target.value.trim().length;
        setUsedCharacters(value);
        setRemainingCharacters(135 - value);
    };

    return (
        <div>
            <form onSubmit={onAddTodo} className="todo-form">
                <div className="character-count">{usedCharacters}/{remainingCharacters}</div>
                <input type="text" placeholder="What do you want to do?" className="todo-input" onKeyUp={onCheckCharacters} maxLength="135" />
                <button type="submit" className="todo-btn">Add</button>
            </form>
        </div>
    );
}
export default CreateTodo;