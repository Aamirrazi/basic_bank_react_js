import { useReducer } from "react";
import "./styles.css";

const initialState = {
  isActive: false,
  balance: 0,
  loan: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "open":
      return {
        ...state,
        isActive: true,
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + 150,
      };
    case "withdraw":
      return {
        ...state,
        balance: state.balance - 50,
      };
    case "loan":
      return {
        ...state,
        balance: state.balance + 5000,
        loan: 5000,
      };
    case "pay":
      return {
        ...state,
        balance: state.balance - 5000,
        loan: 0,
      };
    case "close":
      return {
        ...initialState,
      };

    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [{ isActive, balance, loan }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>
        balance: <strong>{balance}</strong>
      </p>
      <p>
        loan: <strong>{loan}</strong>
      </p>

      <p>
        <button disabled={isActive} onClick={() => dispatch({ type: "open" })}>
          Open Account
        </button>
      </p>
      <p>
        <button
          disabled={!isActive}
          onClick={() => dispatch({ type: "deposit" })}
        >
          Deposit:150
        </button>
      </p>
      <p>
        <button
          disabled={!isActive || balance <= 0}
          onClick={() => dispatch({ type: "withdraw" })}
        >
          Withdraw:50
        </button>
      </p>
      <p>
        <button
          disabled={!isActive || loan > 0}
          onClick={() => dispatch({ type: "loan" })}
        >
          Reaquest loan of 5000
        </button>
      </p>
      <p>
        <button
          disabled={!isActive || loan <= 0}
          onClick={() => dispatch({ type: "pay" })}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          disabled={!isActive || balance > 0}
          onClick={() => dispatch({ type: "close" })}
        >
          Close Account
        </button>
      </p>
    </div>
  );
}
