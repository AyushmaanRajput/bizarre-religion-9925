import { useState, useContext } from "react";
import { Grid, Text } from "@chakra-ui/react"; // You might need to import Grid from Chakra UI
import { AuthContext } from "../../Context/Auth/AuthContextProvider";
import ContactCard from "../../Components/ContactCard"; // Adjust the import path

export default function Contacts() {
  let userContacts = useContext(AuthContext).loggedInUser.contacts;
  let [contacts, setContacts] = useState(userContacts);
  console.log(contacts);
  return (
    <>
      <Text fontSize="4xl">Your Contacts</Text>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </Grid>
    </>
  );
}
