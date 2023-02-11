const { verifySession } = require("supertokens-node/recipe/session/framework/express");
const UserMetadata = require("supertokens-node/recipe/usermetadata");

const prisma = require("../../primsaInit");

module.exports.update = async (req, res) => {
    let userId = req.session.getUserId();
    const { name } = req.body;
    const user = await prisma.users.update({
        where:{
            id: userId
        },
        data:{
            name
        }
    })
    await UserMetadata.updateUserMetadata(userId, {name: name})
    return res.status(200).send(user);
};


module.exports.info = async(req,res) => {
    const userId = req.session.getUserId();
    const user = await prisma.users.findUnique({
        where:{
            id: userId
        }
    });

    const authObject = await UserMetadata.getUserMetadata(userId)

    return res.status(200).send({user,authObject});
}