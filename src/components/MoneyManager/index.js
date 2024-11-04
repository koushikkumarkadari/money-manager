import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]
const transactionHistoryList = []
class MoneyManager extends Component {
  state = {
    transactionTitle: '',
    transactionAmount: '',
    transactionType: transactionTypeOptions[0].optionId,
    transactionHistory: [],
    myBalance: 0,
    myIncome: 0,
  }

  onDeletion = id => {
    const {transactionHistory} = this.state
    transactionHistory.map(each => {
      if (each.id === id) {
        if (each.type === 'EXPENSES') {
          this.setState(prevState => ({
            myBalance: parseInt(prevState.myBalance) + parseInt(each.amount),
          }))
        } else {
          this.setState(prevState => ({
            myIncome: parseInt(prevState.myIncome) - parseInt(each.amount),
          }))
          this.setState(prevState => ({
            myBalance: parseInt(prevState.myBalance) - parseInt(each.amount),
          }))
        }
      }
      return true
    })
    this.setState(prevState => ({
      transactionHistory: prevState.transactionHistory.filter(
        each => id !== each.id,
      ),
    }))
  }

  onTransaction = event => {
    event.preventDefault()
    const {transactionTitle, transactionAmount, transactionType} = this.state
    if (Number.isInteger(parseInt(transactionAmount))) {
      if (transactionType === 'INCOME') {
        this.setState(prevState => ({
          myIncome: parseInt(prevState.myIncome) + parseInt(transactionAmount),
        }))
        this.setState(prevState => ({
          myBalance:
            parseInt(prevState.myBalance) + parseInt(transactionAmount),
        }))
      } else {
        this.setState(prevState => ({
          myBalance:
            parseInt(prevState.myBalance) - parseInt(transactionAmount),
        }))
      }
      const newTransaction = {
        id: uuidv4(),
        title: transactionTitle,
        amount: transactionAmount,
        type: transactionType,
      }
      transactionHistoryList.push(newTransaction)
      this.setState(prevState => ({
        transactionHistory: [...prevState.transactionHistory, newTransaction],
        transactionTitle: '',
        transactionAmount: '',
        transactionType: transactionTypeOptions[0].optionId,
      }))
    }
  }

  onChangeTitle = event => {
    this.setState({transactionTitle: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({transactionAmount: event.target.value})
  }

  onChangeType = event => {
    this.setState({transactionType: event.target.value})
  }

  render() {
    console.log(transactionHistoryList)
    const {
      transactionTitle,
      transactionAmount,
      transactionType,
      transactionHistory,
      myBalance,
      myIncome,
    } = this.state
    return (
      <div className="supreme-background-container">
        <div className="welcome-card-container">
          <h1 className="heading">Hi, Richard</h1>
          <p className="heading">
            Welcome back to your{' '}
            <span className="para-span">Money Manager</span>
          </p>
        </div>
        <MoneyDetails myBalance={myBalance} myIncome={myIncome} />
        <div className="form-and-transaction-container">
          <form onSubmit={this.onTransaction} className="input-form-container">
            <h1 className="form-heading">Add Transaction</h1>
            <label className="label-text" htmlFor="title">
              TITLE
            </label>
            <input
              placeholder="Enter Title"
              value={transactionTitle}
              onChange={this.onChangeTitle}
              className="input-container"
              id="title"
              type="text"
            />
            <label className="label-text" htmlFor="amount">
              AMOUNT
            </label>
            <input
              placeholder="Enter Amount"
              value={transactionAmount}
              onChange={this.onChangeAmount}
              className="input-container"
              id="amount"
              type="text"
            />
            <label htmlFor="type" className="label-text">
              TYPE
            </label>
            <select
              value={transactionType}
              onChange={this.onChangeType}
              id="type"
              className="input-container"
            >
              {transactionTypeOptions.map(eachOption => (
                <option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button className="add-button" type="submit">
              Add
            </button>
          </form>
          <div className="history-container">
            <h1 className="form-heading">History</h1>
            <div className="history-row-style">
              <p className="history-title">Title</p>
              <p className="history-title">Amount</p>
              <p className="history-title">Type</p>
              <p> </p>
            </div>
            <ul className="unordered-list-transaction">
              {transactionHistory.map(each => (
                <TransactionItem
                  onDeletion={this.onDeletion}
                  key={each.id}
                  each={each}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
// Write your code here
