import './index.css'

const TransactionItem = props => {
  const {each, onDeletion} = props
  const {id, title, amount, type} = each
  const onTransactionDeletion = () => {
    onDeletion(id)
  }
  return (
    <li className="transaction-row-style">
      <p className="transaction-title">{title} </p>
      <p className="transaction-title">Rs: {parseInt(amount)}</p>
      <p className="transaction-title">{type}</p>
      <button
        className="delete-button"
        onClick={onTransactionDeletion}
        type="button"
      >
        <img
          className="delete-icon"
          data-testid="delete"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
