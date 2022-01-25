export const artikelValidierer = (artikel, req, res) => {

    console.log(artikel.titel)

    if (!artikel.titel) {
        return res.status(400).json({message: "Artikelname ist ein Pflichtfeld."})
    }

    if (!artikel.startpreis) {
        return res.status(400).json({message: "Startpreis ist ein Pflichtfeld."})
    } else {
        if (artikel.startpreis <= 0) {
            return res.status(400).json({message: "Startpreis muss größer als 0 sein."})
        }
    }
}