import axios from "axios";

export const postNewUser = (userObj) => {
  return axios.post(`https://mock-api-finpay.onrender.com/users`, userObj);
};

// Assuming you have imported 'axios' for HTTP requests

const createTransactions = async (details) => {
  try {
    let senderTransaction = {
      id: details.sender.transactions.length + 1,
      amount: -details.amount,
      date: details.date,
      type: "outgoing",
      status: "completed",
      contact: {
        id: details.receiver.id,
        name: details.receiver.name,
        email: details.receiver.email,
      },
    };

    let receiverTransaction = {
      id: details.receiver.transactions.length + 1,
      amount: details.amount,
      date: details.date,
      type: "incoming",
      status: "completed",
      contact: {
        id: details.sender.id,
        name: details.sender.name,
        email: details.sender.email,
      },
    };

    let updatedSender = {
      ...details.sender,
      finCoin: details.sender.finCoin + 20,
      balance: details.sender.balance - details.amount,
      transactions: [...details.sender.transactions, senderTransaction],
    };

    let updatedReceiver = {
      ...details.receiver,
      finCoin: details.receiver.finCoin + 20,
      balance: details.receiver.balance + details.amount,
      transactions: [...details.receiver.transactions, receiverTransaction],
    };

    await Promise.all([
      postUserUpdate(updatedSender),
      postUserUpdate(updatedReceiver),
      postGlobalTransaction({
        from: details.sender.name,
        to: details.receiver.name,
        amount: details.amount,
        message: details.message,
        date: details.date,
      }),
    ])
  } catch (err) {
    console.log(err);
  }
};

async function postUserUpdate(user) {
  try {
    let id = user.id;
    let res = await axios.put(`https://mock-api-finpay.onrender.com/users/${id}`, user);
    console.log(res.data); // Assuming the server responds with the updated user object

  } catch (err) {
    console.log(err);
  }
}

async function postGlobalTransaction(obj) {
  try {
    let res = await axios.post(`https://mock-api-finpay.onrender.com/transactions`, obj);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
