import React, { Component } from 'react';

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

  addlist = () => {
    if (this.state.inputval === '' || this.state.disc === '') return;
    else {
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
        <input
          type="text"
          value={this.state.inputval}
          onChange={this.savetext}
          placeholder="Title"
        />
        <input
          type="text"
          value={this.state.disc}
          onChange={this.savedisc}
          placeholder="Description"
        />
        <button onClick={this.addlist}>Add Task</button>
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
