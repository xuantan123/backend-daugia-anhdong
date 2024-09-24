import { Model, DataTypes } from 'sequelize';
import db from '../index'; 

class AuthorProducts extends Model {
  static associate(models) {
    AuthorProducts.belongsTo(models.ProfileAuthor, {
      foreignKey: 'authorId', // Khóa ngoại liên kết với ProfileAuthor
      as: 'author', // Tên alias cho quan hệ
    });
  }
}

AuthorProducts.init({
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ProfileAuthor',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db.sequelize,
  modelName: 'AuthorProducts',
  tableName: 'AuthorProducts', // Tên bảng trong cơ sở dữ liệu
});

export default AuthorProducts;
