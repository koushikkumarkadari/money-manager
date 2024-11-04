import './index.css'

const MoneyDetails = props => {
  const {myBalance, myIncome} = props
  return (
    <div className="money-details-container">
      <div className="balance-details-container">
        <div>
          <img
            className="money-image"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            alt="balance"
          />
        </div>
        <div>
          <p>Your Balance</p>
          <p data-testid="balanceAmount">Rs {myBalance}</p>
        </div>
      </div>
      <div className="income-details-container">
        <div>
          <img
            className="money-image"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="income"
          />
        </div>
        <div>
          <p>Your Income</p>
          <p data-testid="incomeAmount">Rs {myIncome}</p>
        </div>
      </div>
      <div className="expenses-details-container">
        <div>
          <img
            className="money-image"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            alt="expenses"
          />
        </div>
        <div>
          <p>Your Expenses</p>
          <p data-testid="expensesAmount">Rs {myIncome - myBalance}</p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
