const { mongoose } = require("../config/dbConnection");
const pwEncrypt = require("../helpers/pwEncryption");

// User Schema:
const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,

    },
    last_name: {
      type: String,
      trim: true,
    
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      // Make password field not selectable by default
      select: false,
    },
    provider: {
      type: String,
      trim: true,
      enum: ['email', 'firebase'],
      default: "email",
    },
    reset_password_token: {
      type: String,
      default: null,
    },
    reset_password_expires: {
      type: Date,
      default: null,
    },
    userPackLists: [
      /* This part is necessary so that Mongodb can create an id for each packlist */
        {
        name: {
          type: String,
          trim: true,
          
        },
      
        items: [],
        
      },  
      
    ]
  },
  { timestamps: true, collection: "users" }
);



UserSchema.pre(["save", "updateOne"], function (next) {
  // If the password is modified, encrypt it!
  // Skip validation if provider is firebase
  // Skip hashing for Firebase users
  if (this.provider === 'firebase') {
    return next();
}
  // It is necessary to start by getting the data that is being modified or saved.
  // Doing this way is to reference the document as THIS
  const data = this?._update || this;
  // If an update operation is performing, this._update is the data it is being tried to store. 
  // If it is being saved, it's just this.

  // email@domain.com
  const isEmailValidated = data.email
    ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    : true;
  // If it is actually wanted to validate email, it would put false as the OR value!

  if (isEmailValidated) {
    if (data?.password) {
      const isPasswordValidated =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
          data.password
        );
      // This regex expression is requiring:
      // At least one lowercase letter
      // At least one uppercase letter
      // At least one digit
      // At least one special character
      // At least 8 characters

      if (isPasswordValidated) {
        data.password = pwEncrypt(data.password);
        if (this?._update) {
          this._update = data;
        } else {
          this.password = data.password;
        }

        //? ShortHand:
        // save:
        // this.password = data.password = passwordEncrypt(data.password)
        // update:
        // this._update = data
      } else {
        next(
          new Error(
            "Password is not validated. It is necessary to have at least one lowercase letter, one uppercase letter, one digit, one special character, and 8 characters"
          )
        );
      }
    }
    next();
  } else {
    next(new Error("Email is not validated."));
  }
});

module.exports = mongoose.model("User", UserSchema);


