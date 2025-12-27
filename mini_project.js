const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()
const port = 3000

app.get("/files/:filename", (req, res) => {

    const file = req.params.filename
    const ext = path.extname(file).toLowerCase()   

    let folder = ""

    if (ext === ".jpg") folder = "jpg"
    else if (ext === ".png") folder = "png"
    else if (ext === ".txt") folder = "txt"
    else return res.send("Unsupported file")

    const oldPath = path.join(__dirname, file)
    const newPath = path.join(__dirname, folder, file)

    
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath)
    }

    res.sendFile(newPath)
})

app.listen(port, () => {
    console.log("Server running on http://localhost:3000")
})
