const Comment = require("../db").Comment;

async function addComment(req, res) {
    try {
        if (!req.body?.userId || !req.body?.recipeId || !req.body?.message || !req.body?.note) {
            return res.status(400).json({ error: "Missing parameters" });
        }

        const userId = req.body.userId;
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
        if (!req.body?.recipeId) {
            return res.status(400).json({ error: "Missing parameters" });
        }

        const recipeId = req.body.recipeId;

        const comment = await Comment.findAll({
          where: {
            recipe_id: recipeId,
          }
        });

        res.status(201).json({
            comment: comment,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
    }
}


module.exports = { addComment, getComment, deleteComment };
