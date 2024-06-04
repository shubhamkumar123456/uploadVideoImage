const express = require('express');
const { createImage, updateImage, deleteImage, getSingleImage, getAllImage } = require('../controllers/imageController');
const router = express.Router();


router.post('/create',createImage)
router.put('/update/:_id',updateImage)
router.delete('/delete/:_id',deleteImage)
router.get('/single/:_id',getSingleImage)
router.get('/allimages',getAllImage)




module.exports = router