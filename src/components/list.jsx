import React, { Component } from 'react';
console.log(Component);
export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listoftodo: [],
      inputval: '',
      disc: '',
    };
  }

  savetext = (e) => {
    this.setState({ inputval: e.target.value });
  };
  savedisc = (e) => {
    this.setState({ disc: e.target.value });
  };

  addTask = () => {
    if (this.state.inputval === '' || this.state.disc === '') return;
    else {
      document.querySelectorAll('input').forEach((item) => (item.value='') );
      let newli = [...this.state.listoftodo];
      console.log(newli)
      newli.push({ title: this.state.inputval, description: this.state.disc });
      this.setState({
        listoftodo: newli,
        inputval: '',
        disc: '',
      });
    }
  };

  removeTask = (index) => {
    let newList = [...this.state.listoftodo];
    console.log(newList)
    newList.splice(index, 1);
    this.setState({ listoftodo: newList });
  };

  render() {
    return (
      <div className='TODO'>
         <div className='TODOin'>
        <input className='input'
          type="text"
          onChange={this.savetext}
          placeholder="Title"
        />
        <input className='input'
          type="text"
          onChange={this.savedisc}
          placeholder="Description"
        />
        <button onClick={this.addTask}>Add Task</button>
        </div>
        <h1>your todo list:</h1>
        <ul>
          {this.state.listoftodo.map((task, index) => (
            <li key={index}>
              <div>
                <strong>{task.title}</strong>: {task.description}
              </div>
              <button
                className="Remove-btn"
                onClick={() => {
                  this.removeTask(index);
                }}
              >
                Done
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
