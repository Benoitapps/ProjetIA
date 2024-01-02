const {getConnectedUser} = require("../services/userToken");
const Comment = require("../db").Comment;
const User = require("../db").User;


async function addComment(req, res) {
    try {
        if ( !req.body?.recipeId || !req.body?.message || !req.body?.note) {
            return res.status(400).json({ error: "Missing parameters" });
        }
        const token = req.cookies.token;

        const userId = await getConnectedUser(token);

        const recipeId = req.body.recipeId;
        const message = req.body.message;
        const note = req.body.note;

        const comment = await Comment.create({
            note: note,
            user_id: userId,
            recipe_id: recipeId,
            message: message,
        });

        res.status(201).json({
            message: "Comment ajouté !",
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
    }
}

async function deleteComment(req, res) {
    if (!req.body?.userId || !req.body?.commentId) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    const userId = req.body.userId;
    const commentId = req.body.commentId;

    const comment = await Comment.destroy({
        where: {
            user_id: userId,
            id: commentId
        },
    })
        .then(() => {
            res.status(200).json({
                message: "Commentaire supprimé avec succès",
            });
        })
        .catch((err) => {
            res.status(500).json({
                err,
            });
        });
}


async function getComment(req, res) {
    try {
        if (!req.params?.recipeId) {
            return res.status(400).json({ error: "Missing parameters" });
        }

        const recipeId = req.params?.recipeId;

        const comment = await Comment.findAll({
          where: {
            recipe_id: recipeId,
          }
        });



        const recupName = async () => {
            let tab = [];


            for (const item of comment) {

                const user = await User.findOne({ id: item.user_id });

                const com = {};

                com.name = user.name;
                com.commentaire = item.message;
                com.note = item.note;

                tab.push(com);
            }

            return tab;
        };

        const commentaire = await recupName();

        res.status(201).json({
            comment: commentaire,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
    }
}


module.exports = { addComment, getComment, deleteComment };
