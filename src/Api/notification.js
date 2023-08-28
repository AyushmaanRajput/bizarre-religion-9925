export function createNotification(amount, message, date, notifications) {
  let last = notifications[notifications.length - 1];
  let lastId = last.id;
  let obj = {
    id: lastId + 1,
    message: `Receiver ${amount}: ${message}`,
    date: date,
    status: "unread",
  };
  notifications.push(obj);
  console.log(notifications);
  return notifications;  
}

export function createMessage(sender, message, date, notifications) {
  let last = notifications[notifications.length - 1];
  let lastId = last.id;
  let obj = {
    id: lastId + 1,
    message:`${sender}: ${message}` ,
    date: date,
    status: "unread",
  };
  notifications.push(obj);
  return notifications;  
}