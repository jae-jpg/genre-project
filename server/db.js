const { Sequelize, DataTypes, INTEGER } = require('sequelize');

const sequelize = new Sequelize('postgresql://localhost:5432/genre-project')

const Genre = sequelize.define('Genre', {
    displayName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    spotifyName: {
        type: DataTypes.STRING,
        // TODO: Make this false
        allowNull: true
    },
    wikiName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    wikiUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isRadioFormat: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isRegional: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isTopLevel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    // Other model options go here
});

const Artist = sequelize.define('Artist', {
    displayName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // We save these in full to the arist object because not all Spotify genres are yet included in the database.
    // We would like a way to document the genres we have encountered even if the Genre table isn't caught up.
    spotifyGenres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    spotifyId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    spotifyImages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    spotifyName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    spotifyPopularity: {
        type: INTEGER,
        allowNull: true,
    },
    spotifyUpdatedDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    wikiUri: {
        type: DataTypes.STRING,
        allowNull: true,
    },
})

const GenreRelationship = sequelize.define('GenreRelationship', {
    childId: {
        type: DataTypes.INTEGER,
        references: {
            model: Genre,
            key: 'id',
        }
    },
    parentId: {
        type: DataTypes.INTEGER,
        references: {
            model: Genre,
            key: 'id',
        }
    }
})

Artist.belongsToMany(Genre, {through: 'AristGenre'})
// A parent Genre belongs to many child Genres. The result rows are Children. The foreignKey back to self is parentId.
Genre.belongsToMany(Genre, { through: GenreRelationship, as: 'Children', foreignKey: 'parentId' });
// A child Genre belongs to many parent Genres. The result rows are Parents. The foreignKey back to self is childId.
Genre.belongsToMany(Genre, { through: GenreRelationship, as: 'Parents', foreignKey: 'childId' });
// GenreRelationship.hasMany(Genre, {as: 'Child'})
// GenreRelationship.hasMany(Genre, {as: 'Parent'})

module.exports = {
    'db': sequelize,
    Genre,
    Artist,
    GenreRelationship
}