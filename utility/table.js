const inquirer = require('inquirer');
const { table } = require('table');

const config = {
  border: {
    topBody: `─`,
    topJoin: `┬`,
    topLeft: `┌`,
    topRight: `┐`,

    bottomBody: `─`,
    bottomJoin: `┴`,
    bottomLeft: `└`,
    bottomRight: `┘`,

    bodyLeft: `│`,
    bodyRight: `│`,
    bodyJoin: `│`,

    joinBody: `─`,
    joinLeft: `├`,
    joinRight: `┤`,
    joinJoin: `┼`
  }
};

async function showTable(data) {
  let tableData = [];

  tableData = [

    Object.keys(data[0]),

    ...data.map(val => Object.values(val))];

  return await inquirer.prompt([
    {
      message: "\n" + table(tableData, config),
      type: 'input',
      name: 'name'
    }
  ])

}


module.exports = showTable;