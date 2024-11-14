const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const { prepareTaskDoc } = require('./tasks');

const app = express();
app.use(cors());

const port = 3000;

let taskList = {
  tasks: [
    { taskId: 1, text: 'Fix bug #101', priority: 2 },
    { taskId: 2, text: 'Implement feature #202', priority: 1 },
    { taskId: 3, text: 'Write documentation', priority: 3 }
  ],
};

app.get('/tasks/add', (req, res) => {
  let taskId = req.query.taskId;
  let text = req.query.text;
  let priority = req.query.priority;

  const task = prepareTaskDoc(taskId, text, priority);

  taskList['tasks'].push(task);
  res.json(taskList);
});

app.get('/tasks', (req, res) => {
  res.json(taskList);
});

app.get('/tasks/sort-by-priority', (req, res) => {
  let sortedTaskList = taskList['tasks']
    .slice()
    .sort((a, b) => a['priority'] - b['priority']);

  let response = { tasks: sortedTaskList };
  res.json(response);
});

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = req.query.taskId;
  let priority = req.query.priority;

  for (let i = 0; i < taskList['tasks'].length; i++) {
    if (parseInt(taskList['tasks'][i]['taskId']) === parseInt(taskId)) {
      taskList['tasks'][i]['priority'] = parseInt(priority);
      break;
    }
  }

  res.json(taskList);
});

app.get('/tasks/edit-text', (req, res) => {
  let taskId = req.query.taskId;
  let text = req.query.text;

  for (let i = 0; i < taskList['tasks'].length; i++) {
    if (parseInt(taskList['tasks'][i]['taskId']) == parseInt(taskId)) {
      taskList['tasks'][i]['text'] = text;
      break;
    }
  }

  res.json(taskList);
});

app.get('/tasks/delete', (req, res) => {
  let taskId = req.query.taskId;

  for (let i = 0; i < taskList['tasks'].length; i++) {
    if (parseInt(taskList['tasks'][i]['taskId']) == parseInt(taskId)) {
      taskList['tasks'].splice(i, 1);
      break;
    }
  }

  res.json(taskList);
});

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = req.query.priority;
  let filteredTaskList = { tasks: [] };

  for (let i = 0; i < taskList['tasks'].length; i++) {
    if (parseInt(taskList['tasks'][i]['priority']) === parseInt(priority)) {
      filteredTaskList['tasks'].push(taskList['tasks'][i]);
    }
  }

  res.json(filteredTaskList);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
