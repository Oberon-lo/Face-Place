module.exports = {
    getChat: (req, res) => {
        const db = req.app.get('db')
        const {user_id1, user_id2} = req.params;
        // console.log('****&&**&&&*****', user_id1, user_id2);
        
        db.chat.getChat(user_id1, user_id2)
        .then(result => {
            // console.log('********', result);
            res.status(200).send(result)
        }).catch(err => {
            console.log(err);
        })
    },
    getMessages: (req, res) => {
        const db = req.app.get('db')
        const {current_chat_id} = req.params;
        console.log('******** getMessages chat_id', current_chat_id);

        db.chat.getMessages(current_chat_id)
        .then(result => {
            console.log('******** getMessages res', result);
            res.status(200).send(result)
        }).catch(err => {
            console.log(err);
        })
    },
    getMessagesSocket: async (db, current_chat_id) => {
        const result = await db.chat.getMessages(current_chat_id)
        return result;
    },
    createChat (req, res) {
        const db = req.app.get('db')
        console.log();
        
        const {title} = req.params
        db.chat.createChat({title})
        .then(dbresult => {
            res.status(200).send(dbresult)
        }).catch(err => {
            console.log(err);
        })
    },
    createUserChat (req, res) {
        const db = req.app.get('db')
        const {user_id, chat_id} = req.body;
        db.chat.createUserChat({user_id, chat_id})
        .then(result => {
            res.status(200).send(result)
        }).catch(err => {
            console.log(err);
        })
    },
    addMessage(req, res) {
        console.log('new message', req.body);
        const db = req.app.get('db')
        const {chat_cont, user_id, current_chat_id
        } = req.body
        db.chat.addMessage({
           chat_cont, user_id, current_chat_id
        })
        .then(result => {
            res.status(200).send(result)
        }).catch(err => {
            console.log(err);
        })
    },
    addMessageSocket: async (db, parcel) => {
        const {chat_cont, user_id, current_chat_id
        } = parcel.data;
        const result = await db.chat.addMessage({
           chat_cont, user_id, current_chat_id
        })
        return result;
    }
}