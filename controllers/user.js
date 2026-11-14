"use strict";

class User {
  constructor(firstName, lastName, email, password, date, sex, image) {
    this.uid = User.generateUid(10);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.date = date;
    this.sex = sex;
    this.image = image || User.generateImgUrl(this.uid, sex);
  }

  static generateUser(data) {
    const user = new User(
      data.firstName ?? data._firstName,
      data.lastName ?? data._lastName,
      data.email ?? data._email,
      data.password ?? data._password,
      data.date ?? data._date,
      data.sex ?? data._sex,
      data.image ?? data._image
    );

    user.uid = data.uid ?? data._uid ?? user.uid;

    return user;
  }

  static generateUid(length) {
    let uid = "";

    for (let i = 0; i < length; i++) {
      uid += Math.floor(Math.random() * 10);
    }

    return uid;
  }

  static generateImgUrl(uid, sex) {
    const folder = sex === "H" ? "men" : "women";

    return "https://randomuser.me/api/portraits/"
      + folder + "/" + (Number(uid) % 100) + ".jpg";
  }
}

module.exports = User;
