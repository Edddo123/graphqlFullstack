const graphql = require("graphql");
const Buyer = require("../models/Buyer");
const BuyerPost = require("../models/BuyerPost");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLEnumType,
} = graphql;

// const propertyType = new GraphQLEnumType({
//   name: "propertyTypes",
//   values: {
//     flat: { value: "flat" },
//     house: { value: "house" },
//   },
// });

const BuyerType = new GraphQLObjectType({
  name: "Buyer",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    location: { type: GraphQLString },
    posts: {
      type: new GraphQLList(BuyerPostType),
      async resolve(parent, args) {
        const buyerPosts = await BuyerPost.find({ buyerId: parent.id });
        return buyerPosts;
      },
    },
  }),
});

const BuyerPostType = new GraphQLObjectType({
  name: "BuyerPost",
  fields: () => ({
    id: { type: GraphQLID },
    propertyType: { type: GraphQLString },
    price: { type: GraphQLInt },
    buyer: {
      type: BuyerType,
      async resolve(parent, args) {
        const buyer = await Buyer.findById(parent.buyerId);
        return buyer;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    buyers: {
      type: new GraphQLList(BuyerType),
      async resolve(parent, args) {
        const buyers = await Buyer.find();
        return buyers;
      },
    },
    buyer: {
      type: BuyerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const buyer = await Buyer.findById(args.id);
        return buyer;
      },
    },
    buyerPosts: {
      type: new GraphQLList(BuyerPostType),
      async resolve(parent, args) {
        const buyerPosts = await BuyerPost.find();
        return buyerPosts;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBuyer: {
      type: BuyerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const buyer = new Buyer({
          name: args.name,
          email: args.email,
          password: args.password,
          location: args.location,
        });
        const user = await buyer.save();
        return user;
      },
    },
    addBuyerPost: {
      type: BuyerPostType,
      args: {
        propertyType: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        buyerId: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const buyerPost = new BuyerPost({
          propertyType: args.propertyType,
          price: args.price,
          buyerId: args.buyerId,
        });

        const post = await buyerPost.save();

        return post;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  mutation: Mutation,
  query: RootQuery,
});
