'use strict';

module.exports = async function(sequelize, DataTypes) {
    const Url = sequelize.define(
        'Url',
        {
            longUrl: DataTypes.STRING,
            shortUrl: DataTypes.STRING
        },
        {
            tableName: 'url',
            paranoid: true,
            freezeTableName: true,
            createdAt: 'created',
            updatedAt: 'updated',
            deletedAt: 'deleted',
            indexes:[{
                fields:['longUrl', 'shortUrl']
            }]
        }
    );

    return Url;
};
