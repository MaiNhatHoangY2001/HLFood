const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


const hasingPass = (schema) => {
    //HASHING PASSWORD
    schema.pre('save', function (next) {
        let model = this;

        // only hash the password if it has been modified (or is new)
        if (!model.isModified('password')) return next();

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(model.password, salt, function (err, hash) {
                if (err) return next(err);
                // override the cleartext password with the hashed one
                model.password = hash;
                next();
            });
        });
    });

    schema.methods.comparePassword = function (candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };
}


module.exports = hasingPass