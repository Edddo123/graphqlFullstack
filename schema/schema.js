const graphql = require("graphql");
const Buyer = require("../models/Buyer");
const Seller = require("../models/Seller");
const BuyerPost = require("../models/BuyerPost");
const Offer = require("../models/Offer");

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

const SellerType = new GraphQLObjectType({
  name: "Seller",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    location: { type: GraphQLString },
  }),
});

const OfferType = new GraphQLObjectType({
  name: "Offer",
  fields: () => ({
    id: { type: GraphQLID },
    seller: {
      type: SellerType,
      async resolve(parent, args) {
        const seller = await Seller.findById(parent.sellerId);
        return seller;
      },
    },
    buyer: {
      type: BuyerType,
      async resolve(parent, args) {
        const post = await BuyerPost.findById(parent.postId);
        const buyer = await Buyer.findById(post.buyerId);
        return buyer;
      },
    },
    post: {
      type: BuyerPostType,
      async resolve(parent, args) {
        const post = await BuyerPost.findById(parent.postId);
        return post;
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
    buyerPost: {
      type: BuyerPostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const buyer = await BuyerPost.findById(args.id);
        return buyer;
      },
    },
    sellers: {
      type: new GraphQLList(SellerType),
      async resolve(parent, args) {
        const sellers = await Seller.find();
        return sellers;
      },
    },
    seller: {
      type: SellerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const seller = await Seller.findById(args.id);
        return seller;
      },
    },
    offer: {
      type: OfferType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const offer = await Offer.findById(args.id);
        return offer;
      },
    },
    offers: {
      type: new GraphQLList(OfferType),
      async resolve(parent, args) {
        const offers = await Offer.find();
        return offers;
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
    addSeller: {
      type: SellerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const seller = new Seller({
          name: args.name,
          email: args.email,
          password: args.password,
          location: args.location,
        });
        const user = await seller.save();
        return user;
      },
    },
    addOffer: {
      type: OfferType,
      args: {
        postId: { type: GraphQLID },
        sellerId: { type: GraphQLID },
        offeredPrice: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const offer = new Offer({
          postId: args.postId,
          sellerId: args.sellerId,
          offeredPrice: args.offeredPrice,
        });
        const myOffer = await offer.save();
        return myOffer;
      },
    },
    // deleteOffer: {
    //     type: OfferType,
    //     args: {
    //         id: {type: GraphQLID}
    //     },
    //     async resolve(parent, args) {
    //         await Offer.deleteOne()
    //     }
    // }
  },
});

module.exports = new GraphQLSchema({
  mutation: Mutation,
  query: RootQuery,
});
