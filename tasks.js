const prepareTaskDoc = (taskId, text, priority) => {
  return {
    taskId: parseInt(taskId),
    text: text,
    priority: parseInt(priority),
  };
};

module.exports = {
  prepareTaskDoc
}