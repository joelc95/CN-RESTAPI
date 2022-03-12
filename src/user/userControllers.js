const jwt = require('jsonwebtoken');
const User = require('./userModel');

exports.addUser = async(req, res) => {
    try {
        // Create new user
        const newUser = await User.create(req.body);
        // Generate web token
        const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET);
        res.status(200).send({ user: newUser.username, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({err: err.essage});
    }
};

exports.login = async(req, res) => {
    try {
        res.status(200).send({ user: req.user.username });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message });
    }
}

exports.updatePassword = async(req, res) => {
    try {
        const updatedPassword = await User.updateOne(
            { username:req.user.username },
            { password:req.body.password }
        );
        if (updatedPassword.modifiedCount > 0) {
            res.status(200).send( {msg: "successfully updated user"} );
        } else {
            throw new Error("didn;t update")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message });
    }
}

exports.deleteUser = async(req, res) => {
    try {
        let result;
        console.log(`here: ${req}`)
        if (req.user.username === req.params.username) {
            result = await User.deleteOne({ username: req.user.username });
        }
        // const deletedUser = await User.deleteOne({
        //     [req.params.filterKey]:req.params.filterVal
        // })
        if (result && result.deletedCount > 0) {
            res.status(200).send({msg: `User ${req.params.username} deleted!`})
        } else {
            throw new Error("Nothing happened")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message });
    }
}