import { MongoClient, ObjectId } from "mongodb";
import { client } from "../db.js";

export const resolvers = {
  Query: {
    chatlogs: async () => {
      const db = client.db("test");
      const collection = db.collection("chatlogs");
      const logs = await collection.find().toArray();
      // client.close();
      return logs;
    },
    gethistory: async () => {
      const db = client.db("test");
      const collection = db.collection("chatlogs");

      // Fetch the books from the database and return them
      const logs = await collection
        .find({ person1: "user2", person2: "user3" }) //////////////////////here
        .toArray();
      const a = JSON.stringify(logs).split('"').slice(15, -1);
      let arrWithoutCommas = a.filter((item) => item !== ",");
      //console.log(arrWithoutCommas);
      return arrWithoutCommas;
    },
    gethistoryM: async (parent, args) => {
      const db = client.db("test");
      const collection = db.collection("chatlogs");

      // Fetch the books from the database and return them
      const logs = await collection
        .find({ person1: `${args.user}` }) //////////////////////here
        .toArray();
      const a = JSON.stringify(logs).split('"').slice(15, -1);
      let arrWithoutCommas = a.filter((item) => item !== ",");
      //console.log(arrWithoutCommas);
      return arrWithoutCommas;
    },
    gethistoryMM: async (parent, args) => {
      const db = client.db("test");
      const collection = db.collection("chatlogs");

      // Fetch the books from the database and return them
      const logs = await collection
        .find({
          $or: [
            { person1: `${args.person1}`, person2: `${args.person2}` },
            { person2: `${args.person1}`, person1: `${args.person2}` },
          ],
        }) //////////////////////here
        .toArray();
      const a = JSON.stringify(logs).split('"').slice(15, -1);
      let arrWithoutCommas = a.filter((item) => item !== ",");
      console.log(arrWithoutCommas);
      return arrWithoutCommas;
    },
    gethistoryMMM: async (parent, args) => {
      const db = client.db("test");
      const collection = db.collection("chatlogs");

      // Fetch the books from the database and return them
      const logs = await collection
        .find({
          $or: [
            { person1: `${args.person1}`, person2: `${args.person2}` },
            { person2: `${args.person1}`, person1: `${args.person2}` },
          ],
        }) //////////////////////here
        .toArray();

      const a = logs[0].content1;
      const b = logs[0].content2;
      let aa = [];
      let bb = [];

      let aaa = [];
      let bbb = [];
      aa.length = 0;
      bbb.length = 0;
      aaa.length = 0;
      bbb.length = 0;

      for (let i = 0; i < a.length; i++) {
        aa.push(i);
      }
      for (let i = 0; i < b.length; i++) {
        bb.push(i);
      }

      for (let i = 0; i < a.length; i++) {
        aaa.push([a[i], aa[i]]);
      }
      // console.log(aaa);

      for (let i = 0; i < b.length; i++) {
        bbb.push([b[i], bb[i]]);
      }

      return [aaa, bbb];
      // return [a, b];
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const db = client.db("test");
      const collection = db.collection("users");
      const user = await collection.insertOne({
        user: args.user,
        password: args.password,
      });
      return "success";
    },
    createChat: async (parent, args) => {
      const db = client.db("test");
      const collection = db.collection("chatlogs");
      const chat = await collection.insertOne({
        _id: `${args.user1}1${args.user2}`,
        person1: args.user1,
        person2: args.user2,
        c1: args.user1,
        c2: args.user2,
        content1: [""],
        content2: [""],
      });
      return `${args.user1}1${args.user2}`;
    },
    insertChat: async (parent, args) => {
      const db = client.db("test");
      const collection = db.collection("chatlogs");

      const result = await collection.updateOne(
        {
          _id: `${args.user1}1${args.user2}`, /////////////////////////////////here
          c1: `${args.whoWrote}`,
        },
        {
          $push: {
            content1: {
              $each: [`${args.person1}`],
            },
            content2: {
              $each: [""],
            },
          },
        }
      );
      // const result2 = Boolean(result);
      // console.log(result2);

      const result1 = await collection.updateOne(
        {
          _id: `${args.user2}1${args.user1}`, /////////////////////////////////here
          c2: `${args.whoWrote}`,
        },
        {
          $push: {
            content2: {
              $each: [`${args.person1}`],
            },
            content1: {
              $each: [""],
            },
          },
        }
      );

      const logs = await collection.find().toArray();
      //  client.close();
      // console.log(
      //   `${args.user1}1${args.user2}_____${args.person1}____${args.person2}}`
      // );
      return "abc";
    },
    signIn: async function (parent, args) {
      let validation = false;
      const db = client.db("test");
      const collection = db.collection("users");
      const search = await collection
        .find({
          user: `${args.user}`,
          password: `${args.password}`,
        })
        .toArray();
      console.log(search);
      if (search.length >= 1) {
        validation = true;
      }
      console.log(validation);
      const b = {
        validation: validation,
        user: args.user,
        password: args.password,
      };
      return [validation, args.user, args.password];
    },
  },
};
