import { Grid } from "@chakra-ui/react";
import ActionCard from "../../Components/ActionCard";

let Actions = ({ fetchUserHandler }) => {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={4}
      py={4}
    >
      <ActionCard
        type={"Send"}
        fetchUserHandler={fetchUserHandler}
      ></ActionCard>
      <ActionCard
        type={"Request"}
        fetchUserHandler={fetchUserHandler}
      ></ActionCard>
      <ActionCard
        type={"Recharge"}
        fetchUserHandler={fetchUserHandler}
      ></ActionCard>
    </Grid>
  );
};

export default Actions;
