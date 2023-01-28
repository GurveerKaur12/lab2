 Harpreet Kaur
// Harpreet kaur  id = 21019441
// Gurveer kaur   const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql'); const items = [
    {
        id: 1,
        item: 'Apple',
        aisleId: 1,
        sectionId: 1,
        Qty: 4
    },     {
        id: 2,
        item: 'Orange',
        aisleId: 1,
        sectionId: 1,
        Qty: 3
    },     {
        id: 3,
        item: 'Carrot',
        aisleId: 2,
        sectionId: 2,
        Qty: '3kg' 
    },     {
        id: 4,
        item: 'Green Pepper',
        aisleId: 2,
        sectionId: 2,
        Qty: '4kg'
    },     {
        id: 5,
        item: 'couliflower',
        aisleId: 2,
        sectionId: 2,
        Qty: '2kg'
    },     {
        id: 6,
        item: '2% Milk',
        aisleId: 3,
        sectionId: 3,
        Size: '1l'
    },     {
        id: 7,
        item: 'tea',
        aisleId: 4,
        sectionId: 4,
        Qty: '1kg'
    },     {
        id: 8,
        item: 'cheese',
        aisleId: 3,
        sectionId: 3,
        Qty: '100g'
    },     {
        id: 9,
        item: 'bread',
        aisleId: 5,
        sectionId: 5,
        Qty: 1
    },     {
        id: 10,
        item: 'coffee',
        aisleId: 4,
        sectionId: 4,
        Qty: '2kg'
    },
]; const aisles = [
    {
        id: 1,
        name: 'Produce',
        items: [1,2]
    },
    {
        id: 2,
        name: 'Produce',
        items: [3,4,5]
    },
    {
        id: 3,
        name: 'Dairy',
        items: [6,8]
    },
    {
        id: 4,
        name: 'Beverages',
        items: [7,10]
    },
    {
        id: 5,
        name: 'Bakery',
        items: [9]
    },
]; const sections = [
    {
        id: 1,
        name: 'Fruit',
        items: [1,2]
    },
    {
        id: 2,
        name: 'Vegetables',
        items: [3,4,5]
    },
    {
        id: 3,
        name: 'milk',
        items: [6,8]
    },
    {
        id: 4,
        name: 'Tea & Coffee',
        items: [7,10]
    },
    {
        id: 5,
        name: 'Bread',
        items: [9]
    },
]; const shoppingList = {
    items: [],
    total: 0
  }; // Define the GraphQL schema const Schema = buildSchema(`
    type Item {
        id: ID!
        item: String!
        aisleId: ID!
        sectionId: ID!
        Qty/size: Int!
    }     type Aisle {
        id: ID!
        name: String!
        items: Int!
    }     type Section {
        id: ID!
        name: String!
        items: Int!
    }     type ShoppingList {
        items: [shoppingListItem]
        total: Int
      }
      type ShoppingListItem {
        itemId: ID
        quantity: Int
      }     type Query {
        items: [Item!]!
        aisles: [Aisle!]!
        sections: [Section!]!
        shoppingList: [ShoppingList!]!
    }     type Mutation {
        addItemToShoppingLIst(itemId: ID!, quantity: Int!): ShoppingList!
        removeItemFromShoppingList(itemId: ID!): ShoppingList!
    }
`); const resolvers = {
    Query: {
        shoppingList: () => shoppingList,
        },
        items: () => {
        return items;
        },
    };   
    Mutation: {
        addItemToShoppingList: (_, { itemId, quantity }) => {
            const item = items.find(item => item.id === itemId);
            if (!item) {
              throw new Error(`Item with ID ${itemId} not found.`);
            }
            const shoppingListItem = shoppingList.items.find(item => item.itemId === itemId);
            if (shoppingListItem) {
              shoppingListItem.quantity += quantity;
            } else {
              shoppingList.items.push({ itemId, quantity });
            }
            shoppingList.total = shoppingList.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
            return shoppingList;
          },
          clearShoppingList: () => {
            shoppingList.items = [];
            shoppingList.total = 0;
            return shoppingList;
          },
        addItem: (_, { item, aisleId, sectionId }) => {
            const newItem = {
            id: items.length + 1,
            item,
            aisleId,
            sectionId
            };
            items.push(newItem);
            return newItem;
        },
        updateItem: (_, { id, item, aisleId, sectionId }) => {
        let updatedItem = items.find(item => item.id === id);
        if (!updatedItem) {
            throw new Error(`Item with id ${id} not found`);
        }
        if (item) {
            updatedItem.item = item;
        }
        if (aisleId) {
            updatedItem.aisleId = aisleId;
        }
        if (sectionId) {
            updatedItem.sectionId = sectionId;
        }
        return updatedItem;
        },
const app = express(); app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
})); app.listen(80, () => {
    console.log('Running a GraphQL API server at localhost:80/graphql');
});
    }; 
// wish List
// 1. add more list
// 2. show error when item is not found
// 3. remove item when wrong item is added

