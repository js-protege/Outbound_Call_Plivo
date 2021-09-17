
module.exports = function(sequelize, DataTypes) {
  const CallLog = sequelize.define('CallLog', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name : {
      type: DataTypes.STRING,
      allowNull: false
    },
    fromNumber : {
      type: DataTypes.STRING,
      allowNull: false
    },
    toNumber : {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    tableName : 'logger',
    timestamps : false
  });

  CallLog.associate = models => {

  };


  return CallLog;
};
