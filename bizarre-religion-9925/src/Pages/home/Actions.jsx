import { Grid } from "@chakra-ui/react";
import ActionCard from "../../Components/ActionCard";

let Actions = () => {
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
      <ActionCard type={"Send"}></ActionCard>
      <ActionCard type={"Request"}></ActionCard>
      <ActionCard type={"Recharge"}></ActionCard>
    </Grid>
  );
};

export default Actions;
