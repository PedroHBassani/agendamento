import { randomNumbers } from '../utils/functions.js'
import multer from 'multer'

const allowedPaths = [
    'medias',
    'avatars'
]

export default (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const path = req.query.path ?? 'medias'
            if (!allowedPaths.includes(path)) {
                return cb(new Error('Path not allowed'))
            }
            cb(null, `public/uploads/${path}`)
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split('/')[1]
            const name = `${Date.now()}-${randomNumbers(1000, 9999)}.${ext}`
            cb(null, name)
        }
    }),
    fileFilter: (req, file, cb) => {
        const extension = ['image/png', 'image/jpg', 'image/jpeg'].find(
            acceptedFormat => acceptedFormat == file.mimetype
        )
        if (extension) {
            return cb(null, true)
        }
        return cb(null, false)
    }
}))