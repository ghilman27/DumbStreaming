const express = require('express');
const router = express.Router();
const { Category, Video } = require('../models');

router.get('/', async (req, res) => {
    try {
        const videos = await Video.findAll({include: Category});
        res.status(200).json(videos);

    } catch (error) {
        console.log(error);
    }
});


router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        const video = await Video.findAll({ include: Category, where: { id } });
        res.status(200).json(video);

    } catch (error) {
        console.log(error);
    }
});


router.post('/add', async (req, res) => {
    try {
        let { title, category_id, attache, thumbnail } = req.body;
        let errors = [];

        if (!title) {
            errors.push('Please specify title');
        }
        if (!category_id) {
            errors.push('Please specify category');
        }
        if (!attache) {
            errors.push('Please specify attache');
        }
        if (!thumbnail) {
            errors.push('Please specify thumbnail');
        }

        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            const newVideo = await Video.create({ 
                title,
                category_id,
                attache,
                thumbnail,
             });
            res.status(200).json(newVideo);
        }

    } catch (error) {
        console.log(error)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        let { id } = req.params;
        await Video.destroy({ where: { id } })
        res.status(200).json(`Video with id ${id} has been deleted`);

    } catch (error) {
        console.log(error);
    }
})


router.put('/update/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let { title, category_id, attache, thumbnail } = req.body;
        let attributes = {}

        if (title) {
            attributes.title = title;
        }
        if (category_id) {
            attributes.category_id = category_id;
        }
        if (attache) {
            attributes.attache = attache;
        }
        if (thumbnail) {
            attributes.thumbnail = thumbnail;
        }

        console.log(attributes)

        if (Object.keys(attributes).length == 0) {
            res.sendStatus(400).send('Please specify attributes to update');
        } else {
            Video.update( attributes, { where: { id } } )
            res.sendStatus(200);
        }

    } catch (error) {
        console.log(error);
    }
})


module.exports = router;