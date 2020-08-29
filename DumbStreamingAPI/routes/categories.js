const express = require('express');
const router = express.Router();
const { Category, Video } = require('../models');


router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll({include: Video});
        res.status(200).json(categories);

    } catch (error) {
        console.log(error);
    }
});


router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        const category = await Category.findAll({ include: Video, where: { id } });
        res.status(200).json(category);

    } catch (error) {
        console.log(error);
    }
});


router.post('/add', async (req, res) => {
    try {
        let { name } = req.body;
        let errors = [];

        if (!name) {
            errors.push('Please specify name');
        }

        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            await Category.create({ name });
            res.status(200).send('Category has been added');
        }

    } catch (error) {
        console.log(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        let { id } = req.params;
        await Category.destroy({ where: { id } })
        res.status(200).send(`Category with id ${id} has been deleted`);

    } catch (error) {
        console.log(error);
    }
})


router.put('/update/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let { name } = req.body;
        let errors = [];

        if (!name) {
            errors.push('Please specify the new category name')
        }

        if (errors.length > 0) {
            res.sendStatus(400).send(errors);
        } else {
            Category.update( { name }, { where: { id } } )
            res.sendStatus(200);
        }

    } catch (error) {
        console.log(error);
    }
})


module.exports = router;