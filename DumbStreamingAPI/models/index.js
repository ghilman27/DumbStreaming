const Category = require('./category');
const Video = require('./video');

Category.hasMany(Video, {
    foreignKey: 'category_id',
})

Video.belongsTo(Category, {
    foreignKey: 'category_id',
})

module.exports = { Category, Video }