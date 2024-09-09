const { DataTypes, sequelize } = require('../lib/');

let company = sequelize.define('company', {
  name: DataTypes.TEXT,
  industry: DataTypes.TEXT,
  foundedYear: DataTypes.NUMBER,
  headquarters: DataTypes.TEXT,
  revenue: DataTypes.NUMBER,
});

module.exports = {
  company,
};
