

const getHomepage = async (req, res) => {
    return res.status(200).json('ThachDev Home');
}

module.exports = {
    getHomepage,

}