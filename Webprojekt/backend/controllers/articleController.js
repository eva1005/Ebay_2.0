import {artikelValidierer} from '../utils/Validators.js'

export const getArticles = (req, res) => {

    console.log('in get articles')
    return res.status(400).json('Fehler :)')


}

export const createArticle = (req, res) => {
    console.log(req.body)

    const article = req.body

    const validierterArtikel = artikelValidierer(article, req, res)

    return res.status(200).json('Artikel angelegt')
}