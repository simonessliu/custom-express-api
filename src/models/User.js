const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified('password')){
        return next();
    }

    bcrypt.genSalt(10, (err,salt)=>{
        if(err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) =>{
            if(err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword) {
    //it means the password that user are trying to login with 
    // so we use it to compare with the one in mongodb
    const user = this 

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) =>{
            // 在上面presave的func里面 bcrypt 会给存入数据库的password hash 并在末尾加上salt
            // 而在这里compare的时候 bcrypt.compare 会帮我们将 candidatepassword hash过（但是没有跟salt） 然后再同数据库中有salt的password进行比较
            // 比如： 数据库中的userpassword是 ： asdfzxcvqwer123456 这里我们假设123456是salt， candidatepassword（req.body.password) 在通过bcrypt.compare() hash 成asdfzxcvqwer 
            // 怎么比较呢？ 当candidatepassword 和 userpassword 比较时， candidatepassword 会把 userpassword 的 salt 借来 也就是把123456 拿过来 加到candidatepassword 再去看看是不是match userpassword
            // for more details plz check: 
            // https://stackoverflow.com/questions/6832445/how-can-bcrypt-have-built-in-salts
            if(err) {
                return reject(err)
            };

            if(!isMatch) {
                return reject(false);
            }

            resolve(true)
        })
    });
}

mongoose.model('User', userSchema);