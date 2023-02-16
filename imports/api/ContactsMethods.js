import {ContactsCollection} from "./ContactsCollection";

Meteor.methods({

    'contacts.insert'({ name, email, imgenUrl }) {    
        
        if(!name){
            throw new Meteor.Error("Name is requerit");
        }
        if(!email){
            throw new Meteor.Error("email is requerit");
        }
        if(!imgenUrl){
            throw new Meteor.Error("imgenUrl is requerit");
        }
        
        return   ContactsCollection.insert({ name, email, imgenUrl });       
       }
       
})

