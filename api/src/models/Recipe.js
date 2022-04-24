const {DataTypes} = require('sequelize');


module.exports =(sequelize) =>
{
    sequelize.define('recipe',{
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            allowNull: false,
            primaryKey:true,
        },
    
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        summary:{
          type:DataTypes.STRING,
          allowNull:false,
        },
        score: {
          type:DataTypes.FLOAT,
    
        },
        healthScore:{
          type: DataTypes.FLOAT,
    
        },
        ingredients:{
          type:DataTypes.STRING,
        },
        // image:{
        //   type:DataTypes.TEXT,
        // },
    
        
      });
    
};
    
