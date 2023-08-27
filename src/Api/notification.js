export function createNotification(amount, message, date, notifications) {
  let last = notifications[notifications.length - 1];
  let lastId = last.id;
  let obj = {
    id: lastId + 1,
    message: message,
    date: date,
    status: "unread",
  };
  notifications.push(obj);
  console.log(notifications);
  return notifications;  
}

