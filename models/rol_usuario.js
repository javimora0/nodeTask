'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol_Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'id_usuario' });
      this.belongsTo(models.Rol, { foreignKey: 'id_rol' });
    }
  }
  Rol_Usuario.init({
    id_rol: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Roles_Usuarios',
    tableName: 'roles_usuarios',
  });
  return Rol_Usuario;
};