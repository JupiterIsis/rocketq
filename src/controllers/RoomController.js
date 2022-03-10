const Database = require("../db/config")

module.exports = {
    async create(req, res){
        const db = await Database()
        const password = req.body.password
        let roomId = ""
        let isRoom = true

        while (isRoom){
            
            // generate room number
            for (let i = 0; i < 6; i++){
                roomId += Math.floor(Math.random() * 10).toString()
            }
            
            // verify if roomId already exists
            const roomIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomIds.some(roomIdExists => roomIdExists === roomId)

            if(!isRoom){
                // insert room in db
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    "${password}"
                )`)
            }

        } 

        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req,res){
        const db = await Database()

        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE roomId = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE roomId = ${roomId} and read = 1`)
        let isQuestions = true

        if (questions.length === 0 && questionsRead.length === 0) {
            isQuestions = false
        }


        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isQuestion: isQuestions})
    },

    enter(req, res){
        const roomId = req.body.roomId
        res.redirect(`/room/${roomId}`)
    }
}