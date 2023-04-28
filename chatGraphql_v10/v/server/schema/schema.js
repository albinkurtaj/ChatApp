export const typeDef = `#graphql
 
  type Chat{
    _id: ID,
    person1: String,
    person2: String,
    online: Boolean,
    content: [String]
  }
 
  type Query {
    chatlogs: [Chat]
  }

  type Query{
    gethistory: [String]
  }
  type Query{
    gethistoryM(user:String!,password:String!): [String]
  }
  type Query{
    gethistoryMM(person1:String!,person2:String!): [String]
  }
  type Query{
    gethistoryMMM(person1:String!,person2:String!): [[[String]]]
  }

  type Mutation {
    insertChat(person1: String,person2:String,user1:String,user2:String,whoWrote:String):String
  }

type User{
  _id:ID,
  user: String,
  password:String
  content:[String]
} 

type Validation{
  validation: Boolean,
  user:String,
  password:String
}

  type Mutation{
    createUser(user:String, password:String):User
  }
  type Mutation{
    createChat(user1:String, user2:String):String
  }
  type Mutation{
    signIn(user:String!, password:String!):[String]
  }
`;
